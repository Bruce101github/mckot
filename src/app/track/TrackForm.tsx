"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { normalizeTrackingInput } from "@/lib/tracking";

export function TrackForm({ initial = "", compact = false }: { initial?: string; compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = normalizeTrackingInput(value);
    if (!token) {
      setError("That doesn't look like a tracking number. It starts with MCK, like MCK 109 315 039.");
      return;
    }
    router.push(`/track/${token}`);
  }

  return (
    <form onSubmit={submit} className="w-full" noValidate>
      <label htmlFor="tracking-number" className={compact ? "sr-only" : "text-sm font-medium text-brand-foreground"}>
        Tracking number
      </label>
      <div className={`flex gap-2 ${compact ? "" : "mt-2"}`}>
        <input
          id="tracking-number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="MCK 109 315 039"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "tracking-error" : undefined}
          className="h-12 min-w-0 flex-1 rounded-xl border border-brand-border bg-white px-4 text-base text-brand-foreground placeholder:text-brand-foreground/35 focus:border-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
        />
        <button
          type="submit"
          className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-brand-dark px-5 font-semibold text-white hover:bg-brand-dark/90"
        >
          <Search className="h-4 w-4" aria-hidden />
          Track
        </button>
      </div>
      {error && (
        <p id="tracking-error" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
