import type { Metadata } from "next";
import { Check, Bike, Package, Clock, Shield } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery Services in Accra, Ghana | Mckot",
  description:
    "Same-day delivery, cash-on-delivery, and real-time tracking for online vendors in Accra. Transparent pricing from GHS 35. No subscriptions.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

const services = [
  {
    icon: Bike,
    title: "Same-day motorcycle delivery",
    body: "Book a pickup before 2pm and your customer gets the order the same day. Motorcycle runs across all Greater Accra zones.",
    bullets: ["Pickup within 2 to 3 hours of booking", "Doorstep delivery same day", "Works Mon to Sun, 7am to 10pm"],
  },
  {
    icon: Package,
    title: "Cash-on-delivery (COD)",
    body: "We collect cash from your customer at the door and reconcile it with you. Vendors stop losing sales to prepayment distrust.",
    bullets: ["Cash collected at delivery", "Reconciled totals same day", "Mobile Money transfer to you"],
  },
  {
    icon: Clock,
    title: "Scheduled batch pickups",
    body: "For vendors with regular drop days. Set a recurring pickup window and we align a rider to your packing schedule.",
    bullets: ["Fixed pickup windows", "Batch multiple orders in one run", "Consistent rider assignment over time"],
  },
  {
    icon: Shield,
    title: "Proof of delivery",
    body: "Every delivery is confirmed with a timestamp and delivery proof shared back to you. No more disputes with no evidence.",
    bullets: ["Delivery confirmation per order", "Shareable tracking link per run", "Order history in the app"],
  },
];

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Last-Mile Delivery in Accra, Ghana",
    description:
      "Same-day motorcycle delivery, cash-on-delivery handling, and real-time tracking for online vendors in Accra. From GHS 35 per delivery.",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phones.primary,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressCountry: "GH",
      },
    },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Last-Mile Delivery",
    offers: [
      { "@type": "Offer", name: "Local Delivery", price: "35", priceCurrency: "GHS" },
      { "@type": "Offer", name: "Cross-Zone Delivery", price: "50", priceCurrency: "GHS" },
      { "@type": "Offer", name: "Tema Corridor", price: "60", priceCurrency: "GHS" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Last-mile delivery built for social commerce
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Same-day pickup and delivery across Greater Accra. Cash-on-delivery handled.
            Real-time tracking for every run. No subscription required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#pricing" variant="primary">See pricing</Button>
            <Button href="/contact#signup" variant="secondary">Start delivering</Button>
          </div>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.06}>
                <Card className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15">
                    <Icon className="h-6 w-6 text-brand-accent" aria-hidden />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-brand-foreground">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">{s.body}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-brand-foreground/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section id="pricing" className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-3xl font-bold text-brand-foreground">Pricing</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/70">
            Pay per delivery. No subscription, no monthly minimum. See our full pricing page
            for bulk rates and zone details.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface/80">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="px-6 py-4 text-left font-semibold text-brand-foreground">Service type</th>
                  <th className="px-6 py-4 text-left font-semibold text-brand-foreground">Coverage</th>
                  <th className="px-6 py-4 text-left font-semibold text-brand-foreground">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-border/50">
                  <td className="px-6 py-4 font-medium text-brand-foreground">Local</td>
                  <td className="px-6 py-4 text-brand-foreground/65">Same-zone runs (East Legon, Osu, Spintex...)</td>
                  <td className="px-6 py-4 font-bold text-brand-accent">GHS 35</td>
                </tr>
                <tr className="border-b border-brand-border/50">
                  <td className="px-6 py-4 font-medium text-brand-foreground">Cross-Zone</td>
                  <td className="px-6 py-4 text-brand-foreground/65">Between adjacent Greater Accra zones</td>
                  <td className="px-6 py-4 font-bold text-brand-accent">GHS 50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-brand-foreground">Tema Corridor</td>
                  <td className="px-6 py-4 text-brand-foreground/65">Tema Communities to central Accra</td>
                  <td className="px-6 py-4 font-bold text-brand-accent">GHS 60</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/pricing" variant="primary">Full pricing and bulk rates</Button>
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <Card glow className="border-dashed border-brand-accent/40">
            <h2 className="text-2xl font-bold text-brand-foreground">Coming next</h2>
            <p className="mt-3 text-brand-foreground/70">
              Warehousing and kitting for high-volume vendors, cross-border handoffs to
              Nigeria and Ivory Coast, and dedicated van runs for larger parcel volumes.
              Early access goes to active delivery vendors first.
            </p>
            <Button href="/contact" variant="secondary" className="mt-6">
              Get on the early access list
            </Button>
          </Card>
        </FadeIn>
      </Section>
    </>
  );
}
