"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LocateFixed } from "lucide-react";
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
    const next: Place = { coords: place.coordinates, label: place.address };
    setPickup(next);
    if (dropoff) runEstimate(next.coords, dropoff.coords);
  };

  const onDropoffSelect = (place: PlaceResult) => {
    const next: Place = { coords: place.coordinates, label: place.address };
    setDropoff(next);
    if (pickup) runEstimate(pickup.coords, next.coords);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next: Place = {
          coords: [pos.coords.latitude, pos.coords.longitude],
          label: "Current location",
        };
        setPickup(next);
        if (dropoff) runEstimate(next.coords, dropoff.coords);
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 },
    );
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

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-brand-surface">
      <RideNav />

      <div className="relative flex-1">
        <MapCanvas
          pickup={mapPickup}
          dropoff={mapDropoff}
          polyline={mapPolyline}
          driver={step === "active" ? driver?.coords ?? null : null}
          driverBearing={driver?.bearing}
        />

        {/* Booking panel — bottom sheet on mobile, left dock on desktop */}
        <div className="absolute inset-x-0 bottom-0 z-10 md:inset-x-auto md:bottom-auto md:left-4 md:top-4 md:w-[384px]">
        <div className="rounded-t-2xl border border-brand-border bg-white p-5 shadow-soft md:rounded-2xl">
          {step !== "active" && (
            <>
              <h1 className="mb-3 text-lg font-semibold text-brand-foreground">
                {step === "choosing" ? "Choose your ride" : "Where to?"}
              </h1>

              {step === "locations" && (
                <div className="space-y-2">
                  <LocationSearch
                    placeholder="Pickup location"
                    dotColor="#0B3B2D"
                    bias={searchBias}
                    selectedLabel={pickup?.label}
                    onSelect={onPickupSelect}
                    onClear={() => setPickup(null)}
                  />
                  <LocationSearch
                    placeholder="Where to?"
                    dotColor="#A4D233"
                    bias={searchBias}
                    selectedLabel={dropoff?.label}
                    onSelect={onDropoffSelect}
                    onClear={() => setDropoff(null)}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="flex items-center gap-2 px-1 pt-1 text-sm font-medium text-brand-dark hover:underline"
                  >
                    <LocateFixed className="h-4 w-4" />
                    Use my current location for pickup
                  </button>
                  {estimateError && <p className="text-sm text-red-600">{estimateError}</p>}
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
      </div>
    </div>
  );
}
