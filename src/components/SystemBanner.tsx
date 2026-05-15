"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { siteConfig } from "@/lib/site";

type Banner = {
  id: number;
  message: string;
  severity: "info" | "success" | "warning" | "critical";
  audience: "all" | "mobile" | "website";
  dismissible: boolean;
  link_url: string;
  link_label: string;
};

type Response = { success: boolean; info: Banner | null };

const DISMISSED_KEY = (id: number) => `mckot_banner_dismissed_${id}`;

const PALETTE: Record<Banner["severity"], { bg: string; fg: string; ring: string }> = {
  critical: { bg: "bg-rose-600", fg: "text-white", ring: "ring-rose-700" },
  warning: { bg: "bg-amber-500", fg: "text-black", ring: "ring-amber-600" },
  success: { bg: "bg-emerald-600", fg: "text-white", ring: "ring-emerald-700" },
  info: { bg: "bg-brand-dark", fg: "text-white", ring: "ring-brand-foreground" },
};

/**
 * Slim full-width strip rendered above the header when the backend has an
 * active SystemBanner for the website audience. Fetched client-side, fail-open
 * (broken endpoint → nothing rendered). Dismiss state per-banner-id is kept
 * in localStorage so refreshing doesn't re-show the same banner.
 */
export function SystemBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = `${siteConfig.url.replace(/\/$/, "")}/api/internal-banner`;
        // Use a relative API route in production to avoid CORS — see /api/internal-banner.
        const res = await fetch("/api/internal-banner", {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          // Fall back to direct request only if same-origin route is missing.
          // The next.config rewrites can also surface /edge-banner if needed.
          // No-op for now.
          void url;
          return;
        }
        const data = (await res.json()) as Response;
        if (cancelled || !data?.success || !data.info) return;
        setBanner(data.info);
        try {
          if (localStorage.getItem(DISMISSED_KEY(data.info.id)) === "1") {
            setDismissed(true);
          }
        } catch {
          // localStorage unavailable (private mode etc.) — show banner anyway.
        }
      } catch {
        // Network errors are non-fatal; banner just won't appear.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!banner || dismissed) return null;

  const palette = PALETTE[banner.severity];

  return (
    <div className={`${palette.bg} ${palette.fg}`} role="status" aria-live="polite">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <p className="min-w-0 flex-1 text-sm leading-snug">
          {banner.message}
          {banner.link_url ? (
            <>
              {" "}
              <a
                href={banner.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:no-underline"
              >
                {banner.link_label || "Learn more"} ↗
              </a>
            </>
          ) : null}
        </p>
        {banner.dismissible ? (
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              try {
                localStorage.setItem(DISMISSED_KEY(banner.id), "1");
              } catch {
                // ignore
              }
            }}
            className={`shrink-0 rounded-md p-1 hover:bg-black/10 focus:outline-none focus-visible:ring-2 ${palette.ring}`}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
