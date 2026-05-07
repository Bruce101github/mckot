import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { CoverageChecker } from "@/components/CoverageChecker";
import { VendorSignupForm } from "@/components/VendorSignupForm";
import { coverageZones } from "@/lib/site";
import { MapPinned } from "lucide-react";

export const metadata: Metadata = {
  title: "Coverage Areas",
  description:
    "Greater Accra delivery zones for Mckot. Check your address, join expansion waitlists for Kumasi and Takoradi.",
};

export default function CoveragePage() {
  const live = coverageZones.filter((z) => z.inCoverage);
  const wait = coverageZones.filter((z) => !z.inCoverage);
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Coverage</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Know before you book
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Drop a landmark or Ghana Post digital address. We confirm serviceability before you move inventory.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <CoverageChecker />
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Live Accra corridors</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((z) => (
              <div
                key={z.id}
                className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-surface/70 px-4 py-4"
              >
                <MapPinned className="mt-1 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                <span className="text-sm text-brand-foreground/85">{z.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Roadmap regions</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/70">
            Kumasi and Takoradi pilots kick off once Accra ops hit internal reliability targets. Request your
            city below and we prioritize onboarding order.
          </p>
          <ul className="mt-8 space-y-4">
            {wait.map((z) => (
              <li
                key={z.id}
                className="rounded-2xl border border-dashed border-brand-accent/35 bg-brand-muted/10 px-5 py-4 text-brand-foreground/85"
              >
                {z.label}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section id="request-coverage" className="pb-24 md:pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Request new coverage</h2>
          <p className="mt-3 max-w-xl text-sm text-brand-foreground/65">
            Share where you sell from. Operations reviews clusters weekly.
          </p>
          <div className="mt-8">
            <VendorSignupForm />
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
