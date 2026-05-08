"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";

export function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative border-b border-brand-accent/25 bg-brand-accent/10 px-10 py-2.5 text-center">
      <p className="text-sm font-medium text-brand-foreground/90">
        <Zap className="mr-1.5 inline h-3.5 w-3.5 text-brand-accent" aria-hidden />
        Pre-launch: First 40 vendors lock in early pricing before public launch.{" "}
        <a
          href="#signup"
          className="font-semibold text-brand-accent underline underline-offset-2 hover:no-underline"
        >
          Claim your spot
        </a>
      </p>
      <button
        type="button"
        aria-label="Dismiss banner"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-brand-foreground/40 hover:text-brand-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
