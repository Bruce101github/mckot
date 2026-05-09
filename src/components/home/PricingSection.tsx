import { CheckCircle2, BadgePercent } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";

const tiers = [
  {
    name: "Local",
    description: "Pickup and delivery within the same zone",
    price: "GHS 35",
    highlight: false,
    features: [
      "Same-day delivery",
      "Proof of delivery",
      "Customer tracking link",
      "App booking",
    ],
    zones: "East Legon, Osu, Spintex, and other single-zone runs",
  },
  {
    name: "Cross-Zone",
    description: "Delivery across adjacent Greater Accra zones",
    price: "GHS 50",
    highlight: true,
    features: [
      "Everything in Local",
      "Intercity Accra routes",
      "Priority dispatch",
      "Rider confirmation before pickup",
    ],
    zones: "Madina to Osu, Spintex to Dansoman, and similar cross-zone runs",
  },
  {
    name: "Tema Corridor",
    description: "Tema Communities and Spintex to central Accra",
    price: "GHS 60",
    highlight: false,
    features: [
      "Everything in Cross-Zone",
      "Tema Communities 1 to 12",
      "Spintex long-haul runs",
      "Scheduled batch pickups available",
    ],
    zones: "Tema to Accra central, Spintex to Lapaz, and Tema community runs",
  },
];

export function PricingSection() {
  return (
    <Section id="pricing" className="bg-brand-muted/10">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
          Pricing
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
          Clear rates. No hidden fees.
        </h2>
        <p className="mt-4 max-w-2xl text-brand-foreground/70">
          Pay per delivery. No subscriptions, no monthly minimums, no surprise charges. Early
          vendors get 20% off all deliveries for the first three months.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <FadeIn key={tier.name} delay={i * 0.07}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors ${
                tier.highlight
                  ? "border-brand-accent/50 bg-brand-accent/5 shadow-glow/30"
                  : "border-brand-border bg-brand-surface/80"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-brand">
                    <BadgePercent className="h-3.5 w-3.5" aria-hidden />
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent/80">
                  {tier.name}
                </p>
                <p className="mt-1 text-sm text-brand-foreground/60">{tier.description}</p>
                <p className="mt-5 text-4xl font-black text-brand-foreground">
                  {tier.price}
                  <span className="ml-1 text-sm font-normal text-brand-foreground/50">
                    per delivery
                  </span>
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-brand-foreground/75">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-xl border border-brand-border/60 bg-brand/40 px-3 py-2 text-xs text-brand-foreground/50">
                {tier.zones}
              </p>

              <Button
                href="#signup"
                variant={tier.highlight ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Get Started
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <p className="mt-10 text-center text-sm text-brand-foreground/50">
          Final rates confirmed at onboarding. Batch pickup discounts available for 5+ daily
          orders.{" "}
          <a href="#faq" className="text-brand-accent underline underline-offset-2">
            See FAQ
          </a>{" "}
          for details.
        </p>
      </FadeIn>
    </Section>
  );
}
