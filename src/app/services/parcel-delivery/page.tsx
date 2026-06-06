import type { Metadata } from "next";
import Link from "next/link";
import { Package, Smartphone, Wallet, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parcel Delivery in Greater Accra | Mckot",
  description:
    "Send parcels anywhere in Greater Accra the same day. Pickup from your door, live tracking, and cash or Mobile Money payment. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/services/parcel-delivery` },
};

const features = [
  { icon: MapPin, title: "Door-to-door", body: "We collect from wherever you are and deliver straight to the recipient. No drop-off points, no queues." },
  { icon: Smartphone, title: "Live tracking", body: "Both sender and recipient can follow the rider on the map until the parcel is handed over." },
  { icon: Wallet, title: "Cash or Mobile Money", body: "Pay on booking, or let the recipient pay the rider on delivery. Cash-on-delivery is built in." },
  { icon: Package, title: "Small to mid-size parcels", body: "Envelopes, boxes, bags, and everyday items. Tell us what it is and we will match the right rider." },
];

const faqs = [
  {
    q: "How do I send a parcel in Accra?",
    a: "Open the Mckot site or app, enter your pickup and drop-off addresses and a few parcel details, and confirm. A rider collects from your door and delivers the same day. You can also book over WhatsApp.",
  },
  {
    q: "How much does it cost to send a parcel in Accra?",
    a: "Parcel delivery starts at GHS 35 within one zone, around GHS 50 across adjacent zones, and GHS 60 on the Tema corridor. You see the exact price before you confirm.",
  },
  {
    q: "Can the person receiving the parcel pay for it?",
    a: "Yes. Cash-on-delivery is built in. The recipient can pay the rider in cash, or you can pay by Mobile Money when you book.",
  },
  {
    q: "How big a parcel can I send?",
    a: "Mckot handles small to mid-size parcels that fit safely on a motorbike: envelopes, boxes, bags, and everyday items. For larger or bulk loads, message us and we will advise on the best option.",
  },
];

export default function ParcelDeliveryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Parcel Delivery in Greater Accra",
    description:
      "Same-day parcel delivery across Greater Accra, Ghana. Door-to-door pickup, live tracking, and cash-on-delivery from GHS 35.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Parcel Delivery",
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Parcel delivery</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Send a parcel anywhere in Greater Accra
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Door-to-door parcel delivery, same day, from GHS 35. We pick up from
            wherever you are, track the rider the whole way, and let the
            recipient pay on delivery if that is easier. No depots, no queues.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              View pricing
            </Link>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Everything you need in one run</h2>
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
          <h2 className="text-2xl font-bold text-brand-foreground">Common questions</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-brand-foreground">{f.q}</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-foreground/70">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-brand-foreground/60">
            Sending for yourself? See{" "}
            <Link href="/for/individuals" className="text-brand-accent hover:underline">personal parcel delivery</Link>. Running a shop?{" "}
            <Link href="/for/small-business" className="text-brand-accent hover:underline">Business delivery is here</Link>.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Send your parcel today"
            subheading="Book in under a minute and a rider is on the way. Pick whichever channel is easiest."
            waMessage="Hi Mckot, I want to send a parcel across Accra today."
          />
        </FadeIn>
      </Section>
    </>
  );
}
