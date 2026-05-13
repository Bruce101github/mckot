import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Same-Day Delivery in Spintex, Accra | Mckot",
  description:
    "Same-day delivery along the Spintex Road corridor. Mckot covers Spintex, Baatsona, Comm 18, and Nungua. Cash-on-delivery available. From GHS 35.",
  alternates: { canonical: `${siteConfig.url}/deliver-to/spintex` },
};

const neighborhoods = ["Spintex Road", "Baatsona", "Community 18", "Nungua", "Lashibi", "Sakumono"];
const crossZones = ["Tema", "East Legon", "Osu", "Accra Central", "Madina"];

export default function SpintexPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Same-Day Delivery in Spintex",
    description: "Same-day motorcycle delivery along the Spintex Road corridor in Accra. Covers Spintex, Baatsona, Comm 18, and Nungua. From GHS 35.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "Place", name: "Spintex, Accra, Ghana" },
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-foreground/50">
            <MapPin className="h-4 w-4 text-brand-accent" aria-hidden />
            <Link href="/coverage" className="hover:text-brand-accent">Coverage</Link>
            <span>/</span>
            <span>Spintex</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Same-day delivery in Spintex
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Mckot covers the full Spintex Road corridor. Book a pickup and we collect from
            your location and deliver across Accra the same day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book on WhatsApp
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">From GHS 35 per delivery. First 3 deliveries free for new vendors.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-brand-foreground">Spintex areas covered</h2>
              <ul className="mt-5 space-y-2">
                {neighborhoods.map((n) => (
                  <li key={n} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-foreground">Routes from Spintex</h2>
              <p className="mt-2 text-sm text-brand-foreground/65">Cross-zone deliveries from Spintex to other Accra zones at GHS 50 to 60.</p>
              <ul className="mt-4 space-y-2">
                {crossZones.map((z) => (
                  <li key={z} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <MapPin className="h-4 w-4 shrink-0 text-brand-accent/60" aria-hidden />
                    Spintex to {z}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Clock, label: "Pickup time", value: "Within 2 to 3 hours" },
              { icon: CheckCircle2, label: "COD available", value: "Yes, with Mobile Money reconciliation" },
              { icon: MapPin, label: "Base rate", value: "GHS 35 per delivery" },
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
          <div className="mt-10">
            <Link href="/coverage" className="text-sm text-brand-accent hover:underline">See all Accra coverage zones</Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
