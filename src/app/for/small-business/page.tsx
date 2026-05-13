import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CheckCircle2, MessageCircle, Package, BarChart2, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery for Small Businesses in Accra | Mckot",
  description:
    "Mckot gives Accra small businesses same-day delivery, COD collection, and batch scheduling. No contract. From GHS 35 per delivery.",
  alternates: { canonical: `${siteConfig.url}/for/small-business` },
};

const features = [
  {
    icon: Clock,
    title: "Same-day pickup",
    body: "Book before noon and your packages move today. We cover all 7 major Accra zones every day of the week.",
  },
  {
    icon: Package,
    title: "Cash-on-delivery handled",
    body: "We collect from your customers, reconcile the amounts, and settle to your Mobile Money the same day. No chasing.",
  },
  {
    icon: BarChart2,
    title: "Batch scheduling",
    body: "Running multiple deliveries? Send us the list and we sequence the runs. Bulk pricing available from 15 orders.",
  },
  {
    icon: ShieldCheck,
    title: "Proof of delivery",
    body: "Every delivery comes with a confirmation you can share with your customer or keep for your records.",
  },
];

const segments = [
  "Fashion and clothing boutiques",
  "Cosmetics and beauty brands",
  "Food and baked goods",
  "Electronics accessories",
  "Household products",
  "Pharmacy and health products",
];

export default function SmallBusinessPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Delivery for Small Businesses in Accra",
    description: "Same-day delivery, COD collection, and batch scheduling for small businesses in Accra, Ghana. From GHS 35. No contract required.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "Place", name: "Accra, Greater Accra, Ghana" },
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-foreground/50">
            <BarChart2 className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For small businesses</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery for Accra small businesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            No contracts. No minimum volume. Same-day delivery across Accra with COD
            collection and Mobile Money settlement. Built for businesses that need to move
            product without building a logistics department.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get 3 free deliveries
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              View pricing
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">First 3 deliveries free. No commitment or contract required.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">What you get</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-5">
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  <p className="mt-3 font-semibold text-brand-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-brand-foreground/65">{item.body}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">Who uses Mckot</h2>
              <ul className="mt-6 space-y-3">
                {segments.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">Pricing at a glance</h2>
              <div className="mt-6 space-y-3">
                {[
                  { zone: "Within zone (e.g. East Legon to East Legon)", price: "GHS 35" },
                  { zone: "Cross-zone (e.g. Osu to Spintex)", price: "GHS 50" },
                  { zone: "Tema corridor", price: "GHS 60" },
                  { zone: "Bulk packs (15+ orders)", price: "Ask us" },
                ].map((row) => (
                  <div key={row.zone} className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3">
                    <span className="text-sm text-brand-foreground/75">{row.zone}</span>
                    <span className="text-sm font-bold text-brand-foreground">{row.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/pricing" className="text-sm text-brand-accent hover:underline">Full pricing breakdown</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-8 md:p-10">
            <BarChart2 className="h-6 w-6 text-brand-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold text-brand-foreground">Try it on your next 3 orders</h2>
            <p className="mt-3 max-w-xl text-brand-foreground/70">
              No paperwork. No setup fee. Message us on WhatsApp with your first delivery
              and we will have a rider dispatched to you today.
            </p>
            <div className="mt-6">
              <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Start on WhatsApp
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
