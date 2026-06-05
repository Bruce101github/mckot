"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Clock, Loader2, LocateFixed, Map as MapIcon, MapPin, X } from "lucide-react";
import { searchPlaces, type Coords, type PlaceResult } from "@/lib/api/booking";
import { addRecentPlace, getRecentPlaces } from "@/lib/recentPlaces";

type Props = {
  placeholder: string;
  dotColor: string;
  bias: Coords;
  selectedLabel?: string | null;
  invalid?: boolean;
  // When set, the suggestions render into this element (mobile full-screen
  // takeover) instead of as an inline dropdown.
  portalTarget?: HTMLElement | null;
  onActiveChange?: (active: boolean) => void;
  onSelect: (place: PlaceResult) => void;
  onClear?: () => void;
  onUseCurrentLocation?: () => void;
  onSetOnMap?: () => void;
  autoFocus?: boolean;
};

export function LocationSearch({
  placeholder,
  dotColor,
  bias,
  selectedLabel,
  invalid,
  portalTarget,
  onActiveChange,
  onSelect,
  onClear,
  onUseCurrentLocation,
  onSetOnMap,
  autoFocus,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [recents, setRecents] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Load recent locations once mounted (localStorage isn't available on the server).
  useEffect(() => {
    setRecents(getRecentPlaces());
  }, []);

  const pick = (p: PlaceResult) => {
    setRecents(addRecentPlace(p));
    onSelect(p);
    setQuery(p.address);
    setOpen(false);
  };

  // Notify the parent when this field opens/closes (drives the mobile takeover).
  // The cleanup also fires on unmount (e.g. switching into map-pick mode), so the
  // parent's active flag never gets stuck on.
  useEffect(() => {
    onActiveChange?.(open);
    return () => onActiveChange?.(false);
  }, [open, onActiveChange]);

  // Close the dropdown when clicking outside. In takeover mode the panel lives
  // in a portal outside boxRef, so treat clicks within it as inside too.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside =
        boxRef.current?.contains(t) || (portalTarget != null && portalTarget.contains(t));
      if (!inside) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [portalTarget]);

  // Debounced backend place search.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const places = await searchPlaces(q, bias);
        setResults(places);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, bias]);

  const display = query !== "" ? query : (selectedLabel ?? "");
  const hasQuickActions = onUseCurrentLocation != null || onSetOnMap != null;
  // Recent locations show before any typing (no live results, empty query).
  const showRecents = recents.length > 0 && results.length === 0 && query.trim().length < 2;
  // Show the panel whenever the field is focused — like Uber, an empty click
  // surfaces the quick actions (use current location, set on map) and recent
  // locations before any typing.
  const showPanel = open && (hasQuickActions || showRecents || results.length > 0);

  return (
    <div ref={boxRef} className="relative">
      <div
        className={`flex items-center gap-3 rounded-xl border bg-[#EEEEEE] px-3.5 py-3 transition-colors focus-within:border-brand-dark focus-within:bg-white ${
          invalid ? "border-red-500" : "border-transparent"
        }`}
      >
        <span
          className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: dotColor }}
        >
          <span className="h-1 w-1 rounded-full bg-white" />
        </span>
        <input
          autoFocus={autoFocus}
          value={display}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") onClear?.();
          }}
          onFocus={() => {
            // Re-read so a place chosen in the other field shows up here too.
            setRecents(getRecentPlaces());
            setOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-base text-brand-foreground outline-none focus-visible:!outline-none placeholder:text-brand-foreground/40 md:text-sm"
        />
        {loading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-foreground/40" />
        ) : display ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              setQuery("");
              setResults([]);
              onClear?.();
            }}
            className="shrink-0 text-brand-foreground/40 hover:text-brand-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {showPanel &&
        (() => {
          const body = (
            <>
          {onUseCurrentLocation && (
            <button
              type="button"
              onClick={() => {
                onUseCurrentLocation();
                setQuery("");
                setResults([]);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/50"
            >
              <LocateFixed className="h-4 w-4 shrink-0 text-brand-foreground/40" />
              <span className="text-sm font-medium text-brand-foreground">Use current location</span>
            </button>
          )}

          {onSetOnMap && (
            <button
              type="button"
              onClick={() => {
                onSetOnMap();
                setQuery("");
                setResults([]);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/50"
            >
              <MapIcon className="h-4 w-4 shrink-0 text-brand-foreground/40" />
              <span className="text-sm font-medium text-brand-foreground">Set location on map</span>
            </button>
          )}

          {showRecents && (
            <ul>
              {recents.map((p, i) => (
                <li key={`recent-${p.address}-${i}`}>
                  <button
                    type="button"
                    onClick={() => pick(p)}
                    className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/50"
                  >
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-foreground/40" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-brand-foreground">
                        {p.address}
                      </span>
                      <span className="block truncate text-xs text-brand-foreground/50">
                        {p.location}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((p, i) => (
                <li key={`${p.address}-${i}`}>
                  <button
                    type="button"
                    onClick={() => pick(p)}
                    className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/50"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-foreground/40" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-brand-foreground">
                        {p.address}
                      </span>
                      <span className="block truncate text-xs text-brand-foreground/50">
                        {p.location}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
            </>
          );
          return portalTarget ? (
            createPortal(
              <div className="w-full overflow-auto pt-1">{body}</div>,
              portalTarget,
            )
          ) : (
            <div className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-brand-border bg-white py-1 shadow-soft">
              {body}
            </div>
          );
        })()}
    </div>
  );
}
