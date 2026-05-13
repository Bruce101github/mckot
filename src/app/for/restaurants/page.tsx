import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CheckCircle2, MessageCircle, Package, Thermometer, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restaurant Delivery in Accra | Mckot",
  description:
    "Mckot handles same-day and scheduled food delivery for restaurants and food vendors in Accra. COD accepted. Riders dispatched within the hour. From GHS 35.",
  alternates: { canonical: `${siteConfig.url}/for/restaurants` },
};

const advantages = [
  {
    icon: Clock,
    title: "Fast dispatch",
    body: "Rider at your door within the hour of booking. No queues, no app approval delays.",
  },
  {
    icon: Package,
    title: "COD accepted",
    body: "We collect cash from your customer at the door and settle to your Mobile Money same day. You never wait.",
  },
  {
    icon: Thermometer,
    title: "Handles food orders",
    body: "Riders are briefed on careful handling. You pack it, we carry it upright and on time.",
  },
  {
    icon: MapPin,
    title: "All major Accra zones",
    body: "East Legon, Spintex, Osu, Dansoman, Madina, Tema, Accra Central and surrounding areas — covered every day.",
  },
];

const useCases = [
  { label: "Restaurants taking WhatsApp orders", desc: "Your customer pays on delivery. We collect and reconcile." },
  { label: "Caterers and meal prep services", desc: "Schedule batch runs. We sequence the drops." },
  { label: "Bakeries and pastry vendors", desc: "Book a morning pickup, reach buyers across Accra by afternoon." },
  { label: "Cloud kitchens without riders", desc: "No fleet? We are your fleet. Book per order or in bulk." },
];

export default function RestaurantsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Restaurant and Food Delivery in Accra",
    description: "Same-day and scheduled food delivery for restaurants, caterers, and food vendors in Accra, Ghana. COD collected. Riders dispatched within the hour. From GHS 35.",
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
            <Thermometer className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For restaurants</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Food delivery for restaurants and vendors in Accra
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Taking WhatsApp orders but no delivery? Mckot dispatches riders to your
            kitchen, handles the drop, and collects cash on your behalf. No platform fees.
            No commission on your sales.
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
          <p className="mt-3 text-xs text-brand-foreground/40">First 3 deliveries free. No platform commission on your sales.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Why food vendors use Mckot</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {advantages.map((item) => {
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
          <h2 className="text-2xl font-bold text-brand-foreground">Who this works for</h2>
          <div className="mt-8 space-y-4">
            {useCases.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-surface/50 px-5 py-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-brand-foreground">{item.label}</p>
                  <p className="mt-0.5 text-sm text-brand-foreground/65">{item.desc}</p>
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
              { icon: Clock, label: "Dispatch time", value: "Within 1 to 2 hours of booking" },
              { icon: Package, label: "COD settlement", value: "Same-day Mobile Money transfer" },
              { icon: MapPin, label: "Coverage", value: "7 major Accra zones, 7 days a week" },
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
            <Thermometer className="h-6 w-6 text-brand-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold text-brand-foreground">Start with 3 free food deliveries</h2>
            <p className="mt-3 max-w-xl text-brand-foreground/70">
              No platform commission. No onboarding fee. Message us on WhatsApp with your
              first order details and we will have a rider dispatched to your kitchen today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Book on WhatsApp
              </Link>
              <Link href="/vendors" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
                How we work
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
