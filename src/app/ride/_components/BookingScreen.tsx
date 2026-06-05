"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Clock, ChevronDown, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  cancelRequest,
  checkRequest,
  estimateRoute,
  requestService,
  type ActiveRequest,
  type Coords,
  type PaymentMethod,
  type PlaceResult,
  type RouteEstimate,
} from "@/lib/api/booking";
import { useTripChannel } from "@/lib/realtime/useTripChannel";
import { MapCanvas } from "./MapCanvas";
import { LocationSearch } from "./LocationSearch";
import { RideOptions } from "./RideOptions";
import { ActiveTripCard } from "./ActiveTripCard";
import { RideNav } from "./RideNav";

const ACCRA: Coords = [5.6037, -0.187];

type Place = { coords: Coords; label: string };
type Step = "locations" | "choosing" | "active";

export function BookingScreen() {
  const { user } = useAuth();
  const currencySymbol = user?.currency_symbol ?? "₵";
  const balance = Number(user?.balance ?? 0);

  const [step, setStep] = useState<Step>("locations");
  const [pickup, setPickup] = useState<Place | null>(null);
  const [dropoff, setDropoff] = useState<Place | null>(null);
  // "Set location on map" target — which field the centre-pin picker fills.
  const [picking, setPicking] = useState<"pickup" | "dropoff" | null>(null);
  // Live map-centre point reported while picking (reverse-geocoded address).
  const [pickPoint, setPickPoint] = useState<{ coords: Coords; address: string | null } | null>(null);

  const [estimate, setEstimate] = useState<RouteEstimate | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [estimateError, setEstimateError] = useState<string | null>(null);

  const [selectedRideId, setSelectedRideId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const [active, setActive] = useState<ActiveRequest | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Uber-style schedule selector. null = "Leave now"; otherwise a future
  // pickup time the rider picked. The request payload doesn't carry this yet,
  // so it's a front-end control until the backend adds a scheduled-time field.
  const [scheduleAt, setScheduleAt] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  // On mount: resume any in-flight trip, else seed pickup from geolocation.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const existing = await checkRequest();
      if (cancelled) return;
      if (existing) {
        setActive(existing);
        setStep("active");
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (!cancelled) {
              setPickup({ coords: [pos.coords.latitude, pos.coords.longitude], label: "Current location" });
            }
          },
          () => {},
          { enableHighAccuracy: true, timeout: 8000 },
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Poll the active trip while one is live.
  useEffect(() => {
    if (step !== "active") return;
    const stop = () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
    pollRef.current = setInterval(async () => {
      const r = await checkRequest();
      if (r) {
        setActive(r);
      } else {
        // Left the active set (completed or cancelled elsewhere). Keep the
        // last card around in a terminal state until the user dismisses it.
        setActive((prev) =>
          prev && prev.status !== "completed" && prev.status !== "cancelled"
            ? { ...prev, status: "completed" }
            : prev,
        );
        stop();
      }
    }, 5000);
    return stop;
  }, [step]);

  // Live trip channel (Centrifugo) — only while a trip is active and has a
  // channel. Gives a moving driver marker and instant status transitions,
  // with the 5s poll above as a fallback / source of driver-profile details.
  const liveChannel = step === "active" ? active?.channel ?? null : null;
  const { driver, liveStatus } = useTripChannel(liveChannel, user?.websocket_token);

  useEffect(() => {
    if (!liveStatus) return;
    setActive((prev) =>
      prev && prev.status !== "completed" && prev.status !== "cancelled"
        ? { ...prev, status: liveStatus }
        : prev,
    );
    // Non-terminal transitions (accepted / in progress) carry no driver
    // profile in the event — refresh once to fill name/phone/photo now
    // instead of waiting for the next poll tick.
    if (liveStatus !== "completed" && liveStatus !== "cancelled") {
      (async () => {
        const r = await checkRequest();
        if (r) setActive(r);
      })();
    }
  }, [liveStatus]);

  const runEstimate = useCallback(
    async (p: Coords, d: Coords) => {
      setEstimating(true);
      setEstimateError(null);
      setStep("choosing");
      const res = await estimateRoute([p, d], "delivery");
      setEstimating(false);
      if (res.success && typeof res.info !== "string") {
        const est = res.info;
        setEstimate(est);
        const firstAvailable = est.ride_types.find((r) => r.available) ?? est.ride_types[0];
        setSelectedRideId(firstAvailable ? firstAvailable.id : null);
      } else {
        setEstimate(null);
        setEstimateError(typeof res.info === "string" ? res.info : "Could not price this route.");
        setStep("locations");
      }
    },
    [],
  );

  const onPickupSelect = (place: PlaceResult) => {
    setPickup({ coords: place.coordinates, label: place.address });
  };

  const onDropoffSelect = (place: PlaceResult) => {
    setDropoff({ coords: place.coordinates, label: place.address });
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickup({
          coords: [pos.coords.latitude, pos.coords.longitude],
          label: "Current location",
        });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const onPickConfirm = () => {
    if (!pickPoint) return;
    const place = { coords: pickPoint.coords, label: pickPoint.address ?? "Pinned location" };
    if (picking === "pickup") setPickup(place);
    else if (picking === "dropoff") setDropoff(place);
    setPicking(null);
    setPickPoint(null);
  };

  const onPickCancel = () => {
    setPicking(null);
    setPickPoint(null);
  };

  const onSearch = () => {
    if (pickup && dropoff) runEstimate(pickup.coords, dropoff.coords);
  };

  const onRequest = async () => {
    if (selectedRideId === null) return;
    setRequesting(true);
    setRequestError(null);
    const res = await requestService(selectedRideId, paymentMethod);
    setRequesting(false);
    if (res.success && typeof res.info !== "string") {
      setActive(res.info.request);
      setStep("active");
    } else {
      setRequestError(typeof res.info === "string" ? res.info : "Could not request this ride.");
    }
  };

  const onCancel = async () => {
    if (!active) return;
    setCancelling(true);
    await cancelRequest(active.id);
    setCancelling(false);
    resetToBooking();
  };

  const resetToBooking = () => {
    setActive(null);
    setEstimate(null);
    setSelectedRideId(null);
    setEstimateError(null);
    setRequestError(null);
    setDropoff(null);
    setStep("locations");
  };

  const backToLocations = () => {
    setEstimate(null);
    setEstimateError(null);
    setStep("locations");
  };

  // Map inputs depend on the step.
  const mapPickup = step === "active" && active ? active.route[0]?.coordinates ?? null : pickup?.coords ?? null;
  const mapDropoff =
    step === "active" && active
      ? active.route[active.route.length - 1]?.coordinates ?? null
      : dropoff?.coords ?? null;
  const mapPolyline =
    step === "active" && active
      ? active.route_polyline ?? null
      : step === "choosing"
        ? estimate?.encoded_polyline ?? null
        : null;

  const searchBias: Coords = pickup?.coords ?? ACCRA;

  const scheduleLabel = scheduleAt
    ? new Date(scheduleAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Leave now";
  // Local "now" in the datetime-local format, used as the picker's minimum.
  const minSchedule = (() => {
    const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 16);
  })();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <RideNav />

      <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 md:flex-row md:gap-6 md:overflow-hidden md:px-6 md:py-6">
        {/* Booking panel — stacked above the map on mobile, left column on desktop */}
        <div className="order-1 w-full shrink-0 md:w-[380px] md:overflow-y-auto">
        <div className="md:rounded-2xl md:border md:border-brand-border md:bg-white md:p-5 md:shadow-soft">
          {step !== "active" && (
            <>
              <h1 className="mb-3 text-lg font-semibold text-brand-foreground">
                {step === "choosing"
                  ? "Choose your ride"
                  : picking === "pickup"
                    ? "Choose your pickup spot"
                    : picking === "dropoff"
                      ? "Choose your destination"
                      : "Where to?"}
              </h1>

              {step === "locations" && picking !== null && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-brand-border bg-[#F7F7F7] px-3.5 py-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 fill-brand-dark text-white"
                      strokeWidth={1.5}
                    />
                    <div className="min-w-0">
                      {pickPoint?.address ? (
                        <>
                          <span className="block truncate text-sm font-semibold text-brand-foreground">
                            {pickPoint.address.split(",")[0]}
                          </span>
                          {pickPoint.address.includes(",") && (
                            <span className="block truncate text-xs text-brand-foreground/50">
                              {pickPoint.address.split(",").slice(1).join(",").trim()}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="block text-sm text-brand-foreground/50">
                          Move the map to set your spot…
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onPickConfirm}
                    disabled={!pickPoint}
                    className="w-full rounded-xl bg-brand-dark py-3 font-semibold text-white transition-colors hover:bg-brand-foreground disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {picking === "pickup" ? "Confirm pickup" : "Confirm destination"}
                  </button>
                  <button
                    type="button"
                    onClick={onPickCancel}
                    className="w-full text-center text-sm font-medium text-brand-foreground/60 transition-colors hover:text-brand-foreground"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {step === "locations" && picking === null && (
                <div className="space-y-2">
                  <div className="relative mb-1">
                    <button
                      type="button"
                      onClick={() => setScheduleOpen((o) => !o)}
                      className="flex items-center gap-2 rounded-full bg-[#EEEEEE] px-3.5 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-[#E4E4E4]"
                    >
                      <Clock className="h-4 w-4" />
                      {scheduleLabel}
                      <ChevronDown className="h-4 w-4 text-brand-foreground/50" />
                    </button>
                    {scheduleOpen && (
                      <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-2xl border border-brand-border bg-white p-3 shadow-soft">
                        <button
                          type="button"
                          onClick={() => {
                            setScheduleAt(null);
                            setScheduleOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-medium text-brand-foreground hover:bg-brand-muted/60"
                        >
                          <Clock className="h-4 w-4 text-brand-foreground/60" />
                          Leave now
                        </button>
                        <label className="mt-1 block px-2 pt-2 text-xs font-medium text-brand-foreground/60">
                          Schedule for later
                          <input
                            type="datetime-local"
                            min={minSchedule}
                            value={scheduleAt ?? ""}
                            onChange={(e) => setScheduleAt(e.target.value || null)}
                            className="mt-1 w-full rounded-xl border border-transparent bg-[#EEEEEE] px-3 py-2.5 text-base text-brand-foreground outline-none transition-colors focus:border-brand-dark focus:bg-white focus-visible:!outline-none md:text-sm"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setScheduleOpen(false)}
                          className="mt-3 w-full rounded-xl bg-brand-dark py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-foreground"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                  <LocationSearch
                    placeholder="Pickup location"
                    dotColor="#0B3B2D"
                    bias={searchBias}
                    selectedLabel={pickup?.label}
                    onSelect={onPickupSelect}
                    onClear={() => setPickup(null)}
                    onUseCurrentLocation={useCurrentLocation}
                    onSetOnMap={() => setPicking("pickup")}
                  />
                  <LocationSearch
                    placeholder="Where to?"
                    dotColor="#A4D233"
                    bias={searchBias}
                    selectedLabel={dropoff?.label}
                    onSelect={onDropoffSelect}
                    onClear={() => setDropoff(null)}
                    onSetOnMap={() => setPicking("dropoff")}
                    autoFocus
                  />
                  {estimateError && <p className="text-sm text-red-600">{estimateError}</p>}
                  <button
                    type="button"
                    onClick={onSearch}
                    disabled={!pickup || !dropoff}
                    className="mt-2 w-full rounded-xl bg-brand-dark py-3 font-semibold text-white transition-colors hover:bg-brand-foreground disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Search
                  </button>
                </div>
              )}

              {step === "choosing" &&
                (estimating || !estimate ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-brand-border border-t-brand-dark" />
                  </div>
                ) : (
                  <RideOptions
                    estimate={estimate}
                    currencySymbol={currencySymbol}
                    balance={balance}
                    selectedRideId={selectedRideId}
                    onSelectRide={setSelectedRideId}
                    paymentMethod={paymentMethod}
                    onChangePayment={setPaymentMethod}
                    onRequest={onRequest}
                    onBack={backToLocations}
                    requesting={requesting}
                    error={requestError}
                  />
                ))}
            </>
          )}

          {step === "active" && active && (
            <ActiveTripCard
              request={active}
              currencySymbol={currencySymbol}
              onCancel={onCancel}
              onDone={resetToBooking}
              cancelling={cancelling}
            />
          )}
        </div>
        </div>

        {/* Map — contained rounded card, not a full-bleed background */}
        <div className="relative order-2 h-[240px] shrink-0 overflow-hidden rounded-2xl border border-brand-border shadow-soft md:h-auto md:min-h-0 md:flex-1">
          <MapCanvas
            pickup={mapPickup}
            dropoff={mapDropoff}
            polyline={mapPolyline}
            driver={step === "active" ? driver?.coords ?? null : null}
            driverBearing={driver?.bearing}
            picking={step === "locations" && picking !== null}
            onPickPointChange={setPickPoint}
          />
        </div>
      </div>
    </div>
  );
}
