import Link from "next/link";
import { MapPinned } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { coverageZones } from "@/lib/site";

export function CoverageGraphic() {
  const active = coverageZones.filter((z) => z.inCoverage);
  return (
    <Section className="bg-brand-muted/10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-brand-foreground md:text-4xl">Coverage today</h2>
          <p className="mt-4 text-brand-foreground/70">
            We operate dense loops across Greater Accra while we harden ops before wider rollout.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {active.map((z) => (
              <li
                key={z.id}
                className="flex items-start gap-2 rounded-xl border border-brand-border bg-brand-surface/60 px-4 py-3 text-sm text-brand-foreground/85"
              >
                <MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                {z.label}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-medium text-brand-accent">
            Expanding soon: Kumasi, Takoradi, and beyond.
          </p>
          <Link
            href="/coverage"
            className="mt-4 inline-flex text-sm font-semibold text-brand-foreground underline-offset-4 hover:text-brand-accent hover:underline"
          >
            View detailed coverage map
          </Link>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-brand-accent/20 bg-gradient-to-br from-brand-muted to-brand shadow-glow">
            <div className="absolute inset-8 rounded-2xl border border-dashed border-brand-accent/40 bg-brand/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <MapPinned className="h-14 w-14 text-brand-accent" aria-hidden />
              <p className="mt-6 text-lg font-semibold text-brand-foreground">Greater Accra footprint</p>
              <p className="mt-2 max-w-xs text-sm text-brand-foreground/60">
                Stylized map graphic. Swap for vector map or Mapbox embed when ready.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
