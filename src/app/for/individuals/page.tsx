import type { Metadata } from "next";
import Link from "next/link";
import { User, Gift, FileText, Clock, MapPin, Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Send a Package Anywhere in Accra | Mckot",
  description:
    "Need to send something across Accra today? Mckot picks it up and delivers it for you, same day. Gifts, documents, forgotten items, parcels. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/for/individuals` },
};

const WA = waLink("Hi Mckot, I want to send something across Accra today.");

const features = [
  {
    icon: Clock,
    title: "Same-day, often same-hour",
    body: "Book now and a rider is on the way. Most runs across one zone are done within the hour.",
  },
  {
    icon: MapPin,
    title: "Pickup from anywhere",
    body: "We come to your door, your office, or the shop. Tell us where to collect and where it is going.",
  },
  {
    icon: Smartphone,
    title: "Track it the whole way",
    body: "Watch your rider on the map from pickup to drop-off. No calling around to ask where your parcel is.",
  },
  {
    icon: FileText,
    title: "Pay how you like",
    body: "Mobile Money or cash. The person receiving can pay on delivery if that is easier for you both.",
  },
];

const useCases = [
  { icon: Gift, label: "Send a gift to family or a friend" },
  { icon: FileText, label: "Drop documents or an ID at an office" },
  { icon: MapPin, label: "Get a forgotten item to work or school" },
  { icon: User, label: "Return a borrowed item across town" },
  { icon: Clock, label: "Send something to a customer fast" },
  { icon: Smartphone, label: "Move a phone, charger, or small parcel" },
];

export default function IndividualsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Personal Package and Parcel Delivery in Accra",
    description:
      "Same-day personal delivery in Accra, Ghana. Send packages, documents, gifts, and forgotten items anywhere in Greater Accra.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "Place", name: "Accra, Greater Accra, Ghana" },
    serviceType: "Personal Courier and Parcel Delivery",
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-foreground/50">
            <User className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For you</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Need to send something across Accra?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Forgot your laptop at home. Need to get a gift to a friend in Tema.
            Have to drop a document at an office before it closes. Mckot picks it
            up and delivers it for you, same day, anywhere in Greater Accra. No
            account needed to start.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Send on WhatsApp
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">From GHS 35 within a zone. Book on the site, in the app, or on WhatsApp.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">How it works for you</h2>
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
          <h2 className="text-2xl font-bold text-brand-foreground">Things people send every day</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.label} className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3">
                  <Icon className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <span className="text-sm text-brand-foreground/75">{u.label}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-8 max-w-2xl text-brand-foreground/70">
            Sending from Osu to Tema this afternoon? Getting something to East
            Legon before the traffic builds? That is exactly what Mckot is for.
            One rider, one trip, tracked the whole way.
          </p>
          <div className="mt-4">
            <Link href="/pricing" className="text-sm text-brand-accent hover:underline">See what it costs by zone</Link>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Send it now"
            subheading="Book in under a minute and a rider is on the way. Choose whatever is easiest for you."
            waMessage="Hi Mckot, I want to send something across Accra today."
            bookLabel="Book a delivery"
          />
        </FadeIn>
      </Section>
    </>
  );
}
