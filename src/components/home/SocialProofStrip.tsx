import { siteConfig } from "@/lib/site";
import { FadeIn } from "@/components/FadeIn";

export function SocialProofStrip() {
  return (
    <div className="border-y border-brand-border bg-brand-muted/15 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-accent">Social proof</p>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-2xl font-semibold text-brand-foreground md:text-3xl">
            Trusted by {siteConfig.vendorStatsPlaceholder} vendors across Greater Accra
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-foreground/60">
            Numbers update as we onboard new sellers each week.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
