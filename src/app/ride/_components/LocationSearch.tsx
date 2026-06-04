"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, X } from "lucide-react";
import { searchPlaces, type Coords, type PlaceResult } from "@/lib/api/booking";

type Props = {
  placeholder: string;
  dotColor: string;
  bias: Coords;
  selectedLabel?: string | null;
  onSelect: (place: PlaceResult) => void;
  onClear?: () => void;
  autoFocus?: boolean;
};

export function LocationSearch({
  placeholder,
  dotColor,
  bias,
  selectedLabel,
  onSelect,
  onClear,
  autoFocus,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

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

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-3 rounded-xl border border-transparent bg-[#EEEEEE] px-3.5 py-3 transition-colors focus-within:border-brand-dark focus-within:bg-white">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
        <input
          autoFocus={autoFocus}
          value={display}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") onClear?.();
          }}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-brand-foreground outline-none focus-visible:!outline-none placeholder:text-brand-foreground/40"
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

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-brand-border bg-white py-1 shadow-soft">
          {results.map((p, i) => (
            <li key={`${p.address}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  onSelect(p);
                  setQuery(p.address);
                  setOpen(false);
                }}
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
    </div>
  );
}
