import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

/** Apple logo (monochrome, rendered in currentColor). */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.708 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
    </svg>
  );
}

/** Google Play logo (monochrome, rendered in currentColor). */
function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.378 12l2.32-2.491zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
    </svg>
  );
}

type Variant = "onLight" | "onDark";

const SUBLABEL = "text-[10px] font-medium uppercase tracking-wide text-white/70";
const MAINLABEL = "-mt-0.5 text-lg font-semibold leading-tight tracking-tight";

// Frosted-glass pill: translucent gradient surface, blurred backdrop, an
// accent-tinted hairline border, and a soft glow that intensifies on hover.
const SKIN: Record<Variant, string> = {
  onLight:
    "bg-gradient-to-br from-brand-dark/95 to-brand-dark-muted/85 ring-1 ring-inset ring-white/15 shadow-[0_10px_30px_-12px_rgba(11,59,45,0.55)] hover:ring-brand-accent/50 hover:shadow-glow",
  onDark:
    "bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-inset ring-white/25 hover:from-white/25 hover:to-white/10 hover:ring-brand-accent/50 hover:shadow-glow",
};

function StoreButton({
  href,
  label,
  glyph,
  sub,
  main,
  skin,
}: {
  href: string;
  label: string;
  glyph: ReactNode;
  sub: string;
  main: string;
  skin: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-5 py-3 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${skin}`}
    >
      {/* Glassy top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent"
      />
      <span className="relative shrink-0">{glyph}</span>
      <span className="relative flex flex-col text-left leading-none">
        <span className={SUBLABEL}>{sub}</span>
        <span className={MAINLABEL}>{main}</span>
      </span>
    </a>
  );
}

export function StoreButtons({
  variant = "onLight",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const skin = SKIN[variant];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <StoreButton
        href={siteConfig.app.appStore}
        label="Download Mckot on the App Store"
        glyph={<AppleGlyph className="h-7 w-7" />}
        sub="Download on the"
        main="App Store"
        skin={skin}
      />
      <StoreButton
        href={siteConfig.app.playStore}
        label="Get Mckot on Google Play"
        glyph={<PlayGlyph className="h-6 w-6" />}
        sub="Get it on"
        main="Google Play"
        skin={skin}
      />
    </div>
  );
}
