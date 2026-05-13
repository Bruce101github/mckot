import type { Metadata } from "next";
import { CheckCircle2, BadgePercent, Zap, MessageCircle } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { PricingViewTracker } from "@/components/PricingViewTracker";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery Pricing in Accra | Mckot",
  description:
    "Clear delivery rates for Accra vendors. From GHS 35 per delivery. No subscription, no hidden fees. Bulk discounts for high-volume sellers. Cash-on-delivery included.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
};

const tiers = [
  {
    name: "Local",
    description: "Pickup and delivery within the same Accra zone",
    price: "GHS 35",
    bulkLabel: "GHS 450 for 15 orders",
    bulkSub: "GHS 30 per order — save GHS 75",
    highlight: false,
    features: [
      "Same-day delivery",
      "Proof of delivery",
      "Customer tracking link",
      "App booking",
      "Cash-on-delivery handling",
    ],
    zones: "East Legon, Osu, Spintex, Madina, Dansoman, and other single-zone runs",
  },
  {
    name: "Cross-Zone",
    description: "Delivery across adjacent Greater Accra zones",
    price: "GHS 50",
    bulkLabel: "GHS 675 for 15 orders",
    bulkSub: "GHS 45 per order — save GHS 75",
    highlight: true,
    features: [
      "Everything in Local",
      "Intercity Accra routes",
      "Priority dispatch",
      "Rider confirmation before pickup",
      "Batch scheduling available",
    ],
    zones: "Madina to Osu, Spintex to Dansoman, and similar cross-zone runs",
  },
  {
    name: "Tema Corridor",
    description: "Tema Communities and Spintex to central Accra",
    price: "GHS 60",
    bulkLabel: "GHS 825 for 15 orders",
    bulkSub: "GHS 55 per order — save GHS 75",
    highlight: false,
    features: [
      "Everything in Cross-Zone",
      "Tema Communities 1 to 12",
      "Spintex long-haul runs",
      "Scheduled batch pickups",
      "Dedicated pod lead for recurring vendors",
    ],
    zones: "Tema to central Accra, Spintex to Lapaz, and Tema community runs",
  },
];

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "No. The price listed is what you pay per delivery. COD collection and customer tracking links are included in every run.",
  },
  {
    q: "How do bulk packs work?",
    a: "Buy a 15-order pack at the lower rate. Orders can mix across zones on a single pack, billed at the highest applicable zone rate.",
  },
  {
    q: "When do I pay?",
    a: "Per delivery or weekly invoice for high-volume vendors. Mobile Money (MTN MoMo, Vodafone Cash) or bank transfer.",
  },
  {
    q: "Is there a subscription or monthly fee?",
    a: "No subscription, no monthly fee. You pay per delivery. Stop anytime.",
  },
];

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    name: "Mckot Delivery Pricing in Accra",
    description: "Transparent delivery pricing for online vendors in Accra, Ghana",
    priceCurrency: "GHS",
  };

  return (
    <>
      <PricingViewTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Pricing</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Clear rates. No hidden fees. No subscriptions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Pay per delivery. Bulk discounts kick in at 15 orders. Cash-on-delivery and
            customer tracking included in every run at no extra charge.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.07}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${
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

                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-brand-accent/25 bg-brand-accent/8 px-3.5 py-3">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-brand-foreground">{tier.bulkLabel}</p>
                    <p className="text-xs text-brand-foreground/55">{tier.bulkSub}</p>
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brand-foreground/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-xl border border-brand-border/60 bg-brand/40 px-3 py-2 text-xs text-brand-foreground/50">
                  {tier.zones}
                </p>

                <Button
                  href="#get-started"
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  Get started
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <p className="mt-10 text-center text-sm text-brand-foreground/50">
            Bulk packs are 15 orders billed together. Mix zones on one pack at the highest
            applicable rate.{" "}
            <a href="#faq" className="text-brand-dark underline underline-offset-2 hover:no-underline">
              See FAQ
            </a>{" "}
            for details.
          </p>
        </FadeIn>
      </Section>

      <Section id="get-started" className="bg-brand-muted/10">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
              Start for free
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-foreground">
              3 free deliveries in your first 30 days
            </h2>
            <p className="mt-4 text-brand-foreground/70">
              Founding vendors get their first 3 deliveries on us. Message us on WhatsApp
              to claim. No credit card. No commitment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Claim on WhatsApp
              </a>
              <Button href="/contact#signup" variant="secondary">
                Fill the signup form
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section id="faq" className="pb-24 md:pb-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-brand-foreground">Pricing questions</h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-brand-foreground">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-foreground/65">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
