import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, CheckCircle2, MessageCircle, Package, Star, TrendingUp } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery for Instagram Sellers in Accra | Mckot",
  description:
    "Mckot handles same-day delivery and cash-on-delivery for Instagram vendors in Accra. Focus on your content. We handle pickup, delivery, and payment collection.",
  alternates: { canonical: `${siteConfig.url}/for/instagram-sellers` },
};

const problems = [
  {
    problem: "Customers DM 'where is my order?' every day",
    solution: "We send proof of delivery so you have something to share back instantly",
  },
  {
    problem: "Following up on COD payments eats your whole afternoon",
    solution: "We collect cash, reconcile same day, and settle to your Mobile Money",
  },
  {
    problem: "Your rider bails last minute and the order is still at your house",
    solution: "Book on WhatsApp, we dispatch within the hour — no rider drama",
  },
  {
    problem: "You can only reach buyers in your area",
    solution: "We cover all 7 Accra zones so your reach matches your follower count",
  },
];

const steps = [
  { step: "1", title: "Customer places an order on Instagram", body: "DM, link in bio, story swipe-up — however you sell. Confirm the order and get their delivery address." },
  { step: "2", title: "Send us the details on WhatsApp", body: "Name, address, item, and price. We log it and assign a rider. No app form, no spreadsheet — just a WhatsApp message." },
  { step: "3", title: "We pick up from you and deliver same day", body: "Rider collects from your location. If it is COD, they collect the cash at the door and hand over the package." },
  { step: "4", title: "Proof delivered. Cash settled.", body: "You get a delivery confirmation you can screenshot and post. COD payments reconcile to your Mobile Money same day." },
];

export default function InstagramSellersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Delivery for Instagram Sellers in Accra",
    description: "Same-day delivery and cash-on-delivery service for Instagram vendors in Accra, Ghana. Pickup, delivery, and payment collection handled. From GHS 35.",
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
            <Star className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For Instagram sellers</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery built for Instagram vendors in Accra
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            You built the audience. We handle the last mile. Same-day pickup, cash-on-delivery
            collection, and proof of delivery — so you can keep posting instead of chasing orders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get 3 free deliveries
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              See pricing
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">First 3 deliveries free. No commitment.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Problems we solve for Instagram sellers</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {problems.map((item) => (
              <div key={item.problem} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-5">
                <p className="text-sm font-medium text-brand-foreground/50 line-through">{item.problem}</p>
                <div className="mt-3 flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <p className="text-sm font-semibold text-brand-foreground">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">How it works for Instagram vendors</h2>
          <div className="mt-8 space-y-6">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-dark">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-brand-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-brand-foreground/65">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Clock, label: "Pickup SLA", value: "Within 2 to 3 hours of booking" },
              { icon: Package, label: "COD collection", value: "Cash collected. Settled to MoMo same day." },
              { icon: TrendingUp, label: "Coverage", value: "All 7 major Accra zones" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-5">
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-foreground/50">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-foreground">{item.value}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-8 md:p-10">
            <MapPin className="h-6 w-6 text-brand-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold text-brand-foreground">Ready to start shipping?</h2>
            <p className="mt-3 max-w-xl text-brand-foreground/70">
              Your first 3 deliveries are on us. Message us on WhatsApp with your first order
              and we will have a rider at your door today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Start on WhatsApp
              </Link>
              <Link href="/blog/delivery-for-instagram-sellers-accra" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
                Read our delivery guide
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
