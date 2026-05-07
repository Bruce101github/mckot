import type { Metadata } from "next";
import { Check, Truck } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Last-mile delivery for Accra vendors. Transparent tiers and clear SLAs. Warehousing and fulfillment coming soon.",
};

const tiers = [
  {
    name: "Starter",
    price: "From GHS 25",
    detail: "Ideal for new sellers testing demand.",
    perks: ["Doorstep pickup", "WhatsApp status updates", "Basic COD handling"],
  },
  {
    name: "Growth",
    price: "Volume pricing",
    detail: "When weekly drops need predictable rider coverage.",
    perks: ["Preferred pickup windows", "Batch scheduling", "Dedicated pod lead"],
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    detail: "Multi-SKU brands coordinating several routes daily.",
    perks: ["Priority dispatch", "Reporting exports", "Hybrid SLA options"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Services</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Last-mile that fits social commerce
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Same-day and scheduled runs across Greater Accra with riders who understand fragile parcels,
            snacks, skincare, and streetwear alike.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/15">
              <Truck className="h-8 w-8 text-brand-accent" aria-hidden />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">Active today</h2>
              <p className="text-brand-foreground/65">Motorcycle and compact vehicle lanes depending on parcel profile.</p>
            </div>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Pickup windows that respect vendor content shoots",
              "Proof of delivery snapshots shared back to you",
              "Structured rider substitutions when traffic spikes",
              "Cash-on-delivery workflows with reconciled totals",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-xl border border-brand-border bg-brand-surface/70 px-4 py-3 text-sm text-brand-foreground/85">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section id="how-pricing">
        <FadeIn>
          <h2 className="text-3xl font-bold text-brand-foreground">Pricing</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/70">
            Simple tiers. Upgrades unlock tighter coordination as your monthly parcel volume grows.
          </p>
        </FadeIn>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.06}>
              <Card
                className={`h-full flex flex-col ${tier.highlight ? "border-brand-accent/50 shadow-glow" : ""}`}
              >
                {tier.highlight ? (
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                    Most picked
                  </p>
                ) : null}
                <h3 className="mt-2 text-xl font-semibold text-brand-foreground">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-brand-accent">{tier.price}</p>
                <p className="mt-2 text-sm text-brand-foreground/65">{tier.detail}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-brand-foreground/80">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button href="/contact#signup" variant={tier.highlight ? "primary" : "secondary"} className="mt-8 w-full">
                  Talk to sales
                </Button>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <Card glow className="border-dashed border-brand-accent/40">
            <h2 className="text-2xl font-bold text-brand-foreground">Coming soon</h2>
            <p className="mt-3 text-brand-foreground/70">
              Warehousing slots, kitting for bundles, and cross-border handoffs are on the roadmap.
              Pilots open first to active delivery customers.
            </p>
            <Button href="/contact" variant="secondary" className="mt-6">
              Join early access list
            </Button>
          </Card>
        </FadeIn>
      </Section>
    </>
  );
}
