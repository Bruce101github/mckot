"use client";

import { useMemo, useState } from "react";
import { Search, LocateFixed, Download, Loader2, MapPin, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGoogleMaps } from "@/lib/maps/useGoogleMaps";
import { computeDrivingDistances, type DistanceResult } from "@/lib/maps/distanceMatrix";
import { searchVendorPlaces, nearestVendorPlace, vendorPlaces, type VendorPlace } from "@/lib/vendorPlaces";
import { calcVendorRate } from "@/lib/vendorRates";
import { siteConfig } from "@/lib/site";

type Origin = { lat: number; lng: number; label: string };

function PlacePicker({
  placeholder,
  onSelect,
}: {
  placeholder: string;
  onSelect: (place: VendorPlace) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchVendorPlaces(query), [query]);
  const q = query.trim().toLowerCase();

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-foreground/40" aria-hidden />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-border bg-brand-surface py-3 pl-9 pr-3 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:border-brand-accent/60 focus:outline-none"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-brand-border bg-brand-surface shadow-lg">
          {results.map((p) => {
            const matchedAlias = !p.name.toLowerCase().includes(q)
              ? p.aliases.find((a) => a.toLowerCase().includes(q))
              : undefined;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSelect(p);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-brand-foreground hover:bg-brand-muted/30"
                >
                  <span>
                    {p.name}
                    {matchedAlias && <span className="text-brand-foreground/40"> (aka {matchedAlias})</span>}
                  </span>
                  <span className="text-xs text-brand-foreground/40">{p.district}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const LANES = 3;

function chunkIntoLanes<T>(arr: T[], lanes: number): T[][] {
  const size = Math.ceil(arr.length / lanes);
  return Array.from({ length: lanes }, (_, i) => arr.slice(i * size, i * size + size));
}

// Builds the PDF directly in-memory and saves it — no print dialog, no HTML
// rendering pipeline, so nothing about the site's own layout/CSS can affect
// the output.
function downloadRateSheetPdf(origin: Origin, rows: DistanceResult[], generatedAt: string) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`${siteConfig.name} Vendor Delivery Rate Sheet`, 14, 18);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Pickup: ${origin.label}  ·  Generated ${generatedAt}`, 14, 25);

  const sorted = [...rows].sort((a, b) => a.place.name.localeCompare(b.place.name));

  // Place + Rate is narrow, so lay lanes of it out side by side instead of
  // one pair per row — cuts page count roughly by the number of lanes.
  const lanes = chunkIntoLanes(sorted, LANES);
  const laneLength = Math.max(...lanes.map((l) => l.length));
  const body: string[][] = [];
  for (let i = 0; i < laneLength; i++) {
    const row: string[] = [];
    for (const lane of lanes) {
      const item = lane[i];
      row.push(item ? item.place.name : "");
      row.push(item ? (item.km != null ? `GHS ${calcVendorRate(item.km)}` : "n/a") : "");
    }
    body.push(row);
  }

  const rateColumns: Record<number, { halign: "right" } | { cellWidth: number }> = {};
  for (let lane = 0; lane < LANES; lane++) rateColumns[lane * 2 + 1] = { halign: "right" };

  autoTable(doc, {
    startY: 32,
    head: [Array(LANES).fill(["Place", "Rate"]).flat()],
    body,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [11, 59, 45] },
    columnStyles: rateColumns,
    margin: { bottom: 16 },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
      `Rates are estimates based on driving distance and may vary with traffic, road access, or delivery notes. Contact ${siteConfig.phones.primaryFormatted} to confirm.`,
      14,
      doc.internal.pageSize.height - 8,
      { maxWidth: 180 },
    );
  }

  const slug = origin.label.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`mckot-vendor-rate-sheet-${slug}.pdf`);
}

export function VendorRateCalculator() {
  const mapsState = useGoogleMaps();
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">("idle");

  const [destination, setDestination] = useState<VendorPlace | null>(null);
  const [singleResult, setSingleResult] = useState<{ km: number; rate: number } | null>(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  const [sheetReady, setSheetReady] = useState(false);
  const [sheetProgress, setSheetProgress] = useState<{ done: number; total: number } | null>(null);
  const [sheetError, setSheetError] = useState<string | null>(null);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = nearestVendorPlace(latitude, longitude);
        setOrigin({ lat: latitude, lng: longitude, label: `Near ${nearest.name}` });
        setGeoStatus("idle");
      },
      () => setGeoStatus("error"),
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }

  async function checkRate(place: VendorPlace) {
    if (!origin || mapsState.status !== "ready") return;
    setDestination(place);
    setSingleLoading(true);
    setSingleError(null);
    setSingleResult(null);
    try {
      const [result] = await computeDrivingDistances(mapsState.maps, origin, [place]);
      if (result.km == null) throw new Error("No route found");
      setSingleResult({ km: result.km, rate: calcVendorRate(result.km) });
    } catch {
      setSingleError("Could not calculate a route to that place. Try another.");
    } finally {
      setSingleLoading(false);
    }
  }

  async function downloadSheet() {
    if (!origin || mapsState.status !== "ready") return;
    setSheetError(null);
    setSheetReady(false);
    setSheetProgress({ done: 0, total: vendorPlaces.length });
    try {
      const rows = await computeDrivingDistances(mapsState.maps, origin, vendorPlaces, (done, total) =>
        setSheetProgress({ done, total }),
      );
      setSheetProgress(null);
      const generatedAt = new Date().toLocaleDateString("en-GH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      downloadRateSheetPdf(origin, rows, generatedAt);
      setSheetReady(true);
    } catch {
      setSheetError("Could not build the rate sheet. Please try again.");
      setSheetProgress(null);
    }
  }

  if (mapsState.status === "error") {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6 text-sm text-brand-foreground/70">
        The rate calculator needs the map service, which isn&apos;t available right now. Message us on{" "}
        <a href={siteConfig.social.whatsapp} className="font-semibold text-brand-accent hover:underline">
          WhatsApp
        </a>{" "}
        for a quote instead.
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6">
        <p className="text-sm font-semibold text-brand-foreground">1. Where are we picking up from?</p>
        {origin ? (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-brand-foreground">
              <MapPin className="h-4 w-4 text-brand-accent" aria-hidden />
              {origin.label}
            </span>
            <button
              type="button"
              onClick={() => {
                setOrigin(null);
                setDestination(null);
                setSingleResult(null);
                setSheetReady(false);
              }}
              className="text-brand-foreground/50 hover:text-brand-foreground"
              aria-label="Change pickup location"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <button
              type="button"
              onClick={useMyLocation}
              disabled={geoStatus === "loading"}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover disabled:opacity-60"
            >
              {geoStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <LocateFixed className="h-4 w-4" aria-hidden />
              )}
              Use my current location
            </button>
            {geoStatus === "error" && (
              <p className="text-xs text-red-500/80">
                Couldn&apos;t get your location. Search for your area instead.
              </p>
            )}
            <p className="text-xs text-brand-foreground/40">or search for your area</p>
            <PlacePicker
              placeholder="Search your pickup area, e.g. Osu, Madina..."
              onSelect={(p) => setOrigin({ lat: p.lat, lng: p.lng, label: p.name })}
            />
          </div>
        )}
      </div>

      {origin && (
        <div className="mt-6 rounded-2xl border border-brand-border bg-brand-surface/80 p-6">
          <p className="text-sm font-semibold text-brand-foreground">2. Check a delivery rate</p>
          <div className="mt-3">
            <PlacePicker placeholder="Search a customer's area..." onSelect={checkRate} />
          </div>

          {singleLoading && (
            <p className="mt-4 flex items-center gap-2 text-sm text-brand-foreground/60">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Calculating route...
            </p>
          )}
          {singleError && <p className="mt-4 text-sm text-red-500/80">{singleError}</p>}
          {singleResult && destination && !singleLoading && (
            <div className="mt-4 rounded-xl bg-brand-muted/20 p-4">
              <p className="text-sm text-brand-foreground/70">
                {origin.label} &rarr; {destination.name}
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-foreground">
                ₵{singleResult.rate}{" "}
                <span className="text-sm font-normal text-brand-foreground/50">
                  ({singleResult.km.toFixed(1)} km)
                </span>
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-brand-border pt-6">
            <p className="text-sm font-semibold text-brand-foreground">3. Get your full rate sheet</p>
            <p className="mt-1 text-sm text-brand-foreground/60">
              Download a printable price list for every area in Greater Accra, calculated from{" "}
              {origin.label}.
            </p>
            <button
              type="button"
              onClick={downloadSheet}
              disabled={!!sheetProgress}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:border-brand-accent/60 hover:bg-brand-muted/30 disabled:opacity-60"
            >
              {sheetProgress ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              {sheetProgress
                ? `Calculating ${sheetProgress.done}/${sheetProgress.total}...`
                : "Download rate sheet"}
            </button>
            {sheetError && <p className="mt-3 text-sm text-red-500/80">{sheetError}</p>}
            {sheetReady && (
              <p className="mt-3 text-xs text-brand-foreground/40">
                Rate sheet downloaded — check your Downloads folder.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
