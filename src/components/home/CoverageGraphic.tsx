import Link from "next/link";
import { MapPinned, Clock } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { coverageZones } from "@/lib/site";

export function CoverageGraphic() {
  const active = coverageZones.filter((z) => z.inCoverage);
  const coming = coverageZones.filter((z) => !z.inCoverage);

  return (
    <Section id="coverage">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Coverage
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">
            We know Accra
          </h2>
          <p className="mt-4 text-brand-foreground/70">
            Our riders run tight loops across Greater Accra every day. If your customers are
            in these zones, we can deliver today.
          </p>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {active.map((z) => (
              <li
                key={z.id}
                className="flex items-start gap-2.5 rounded-xl border border-brand-border bg-brand-surface/60 px-4 py-3 text-sm text-brand-foreground/85"
              >
                <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                {z.label}
              </li>
            ))}
          </ul>

          {coming.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Clock className="h-4 w-4 text-brand-foreground/40" aria-hidden />
              <span className="text-sm text-brand-foreground/50">
                Coming soon:{" "}
                {coming
                  .map((z) => z.label.replace(" (waitlist)", ""))
                  .join(", ")}
              </span>
            </div>
          )}

          <Link
            href="/coverage"
            className="mt-5 inline-flex text-sm font-semibold text-brand-foreground underline-offset-4 hover:text-brand-accent hover:underline"
          >
            Check if your area is covered
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-brand-accent/20 bg-gradient-to-br from-brand-muted to-brand shadow-glow">
            <div className="absolute inset-8 rounded-2xl border border-dashed border-brand-accent/40 bg-brand/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <MapPinned className="h-12 w-12 text-brand-accent" aria-hidden />
              <div>
                <p className="text-xl font-bold text-brand-foreground">Greater Accra</p>
                <p className="mt-1 text-sm text-brand-foreground/55">
                  {active.length} active zones
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {active.slice(0, 4).map((z) => (
                  <span
                    key={z.id}
                    className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent"
                  >
                    {z.label.split(",")[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
