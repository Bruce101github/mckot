import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CheckCircle2, MessageCircle, Package, Zap, TrendingUp } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery for TikTok Sellers in Accra | Mckot",
  description:
    "TikTok orders move fast. So do we. Mckot handles same-day delivery for TikTok vendors in Accra. COD collected, proof sent. From GHS 35.",
  alternates: { canonical: `${siteConfig.url}/for/tiktok-sellers` },
};

const painPoints = [
  {
    label: "Viral spike, no logistics",
    body: "A video blows up and 30 orders land at once. We absorb the surge. Just send us the list and we dispatch riders.",
  },
  {
    label: "COD buyers expect cash payment",
    body: "Most TikTok buyers in Ghana want to pay on delivery. We collect, reconcile, and settle to your Mobile Money the same day.",
  },
  {
    label: "Proof of delivery for comments",
    body: "Post the delivery confirmation in your comments section. It builds trust and cuts the 'is this real?' questions in half.",
  },
  {
    label: "Coverage across Accra",
    body: "Your followers are across all 7 zones. We cover East Legon, Spintex, Tema, Madina, Dansoman, Osu, and Accra Central.",
  },
];

export default function TiktokSellersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Delivery for TikTok Sellers in Accra",
    description: "Same-day delivery for TikTok vendors in Accra, Ghana. COD collection, delivery proof, and Mobile Money settlement. From GHS 35.",
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
            <Zap className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For TikTok sellers</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery that keeps up with your TikTok orders
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            TikTok sells fast. Your delivery needs to match. Mckot handles same-day pickup
            and delivery for TikTok vendors across Accra, including cash-on-delivery and proof of delivery.
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
          <h2 className="text-2xl font-bold text-brand-foreground">What TikTok sellers get with Mckot</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {painPoints.map((item) => (
              <div key={item.label} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <p className="font-semibold text-brand-foreground">{item.label}</p>
                </div>
                <p className="mt-2 text-sm text-brand-foreground/65">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">How it works</h2>
          <p className="mt-2 text-brand-foreground/65">Posting is the job. Delivery is ours.</p>
          <div className="mt-8 space-y-6">
            {[
              { step: "1", title: "Order comes in via TikTok", body: "DM, comment, link in bio. However your buyers reach you, confirm the order and get a delivery address." },
              { step: "2", title: "Drop us the order on WhatsApp", body: "Name, address, item description, and whether it is COD. That is all we need. We handle the rest." },
              { step: "3", title: "Rider picks up and delivers same day", body: "We collect from your location and deliver to the customer. COD riders collect cash at the door." },
              { step: "4", title: "Proof sent. Cash to your MoMo.", body: "You get a delivery confirmation to share in your comments. COD reconciles to your Mobile Money same evening." },
            ].map((item) => (
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
              { icon: Clock, label: "Pickup time", value: "Within 2 to 3 hours" },
              { icon: Package, label: "COD handling", value: "Collected and settled to MoMo same day" },
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
            <Zap className="h-6 w-6 text-brand-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold text-brand-foreground">Start with 3 free deliveries</h2>
            <p className="mt-3 max-w-xl text-brand-foreground/70">
              Try Mckot on your next 3 TikTok orders at no cost. Message us on WhatsApp
              with your first order and we will have a rider dispatched today.
            </p>
            <div className="mt-6">
              <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Claim on WhatsApp
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
