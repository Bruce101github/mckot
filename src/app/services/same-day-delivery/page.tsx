import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Bike, MapPin, Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Same-Day Delivery in Accra | Mckot",
  description:
    "Same-day delivery across Greater Accra from GHS 35. Book before the afternoon and it moves today. Packages, documents, and parcels, tracked live. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/services/same-day-delivery` },
};

const steps = [
  { icon: MapPin, title: "Tell us pickup and drop-off", body: "Enter both addresses on the site or app, or send them on WhatsApp." },
  { icon: Bike, title: "A rider is dispatched", body: "We assign the nearest available rider and they head to your pickup point." },
  { icon: Smartphone, title: "Track it to the door", body: "Follow the rider on the map until your item is delivered and confirmed." },
];

const faqs = [
  {
    q: "How fast is same-day delivery in Accra?",
    a: "Most within-zone deliveries in Accra are completed within one to three hours of booking. Cross-zone runs take a little longer depending on traffic and distance. Book earlier in the day for the fastest turnaround.",
  },
  {
    q: "How much does same-day delivery cost in Accra?",
    a: "Same-day delivery starts at GHS 35 within a single zone, around GHS 50 across adjacent zones, and GHS 60 on the Tema corridor. You see the price before you confirm.",
  },
  {
    q: "What is the cut-off time for same-day delivery?",
    a: "Book before the afternoon and your delivery moves the same day. Mckot operates seven days a week, so weekend same-day delivery is available too.",
  },
  {
    q: "Can someone pay on delivery?",
    a: "Yes. The person receiving the item can pay the rider in cash on delivery, or you can pay by Mobile Money when you book. Either works.",
  },
];

export default function SameDayDeliveryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Same-Day Delivery in Accra",
    description:
      "Same-day pickup and delivery across Greater Accra, Ghana, from GHS 35. Packages, documents, and parcels delivered the same day with live tracking.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Same-Day Delivery",
    offers: [
      { "@type": "Offer", name: "Within-zone", price: "35", priceCurrency: "GHS" },
      { "@type": "Offer", name: "Cross-zone", price: "50", priceCurrency: "GHS" },
      { "@type": "Offer", name: "Tema corridor", price: "60", priceCurrency: "GHS" },
    ],
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Same-day delivery</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Same-day delivery across Greater Accra
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Book it now and it moves today. Packages, documents, and parcels
            picked up and delivered the same day, anywhere across the seven
            zones we cover. From GHS 35, tracked from pickup to drop-off.
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
          <h2 className="text-2xl font-bold text-brand-foreground">How same-day delivery works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent/15 text-sm font-bold text-brand-accent">{i + 1}</div>
                    <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  </div>
                  <p className="mt-4 font-semibold text-brand-foreground">{s.title}</p>
                  <p className="mt-1 text-sm text-brand-foreground/65">{s.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 max-w-2xl text-brand-foreground/70">
            Same-day delivery works the same whether you are an individual
            sending a parcel, a shop clearing customer orders, or a company
            running documents between branches. See it by{" "}
            <Link href="/for/individuals" className="text-brand-accent hover:underline">personal use</Link>,{" "}
            <Link href="/for/small-business" className="text-brand-accent hover:underline">business</Link>, or{" "}
            <Link href="/for/companies" className="text-brand-accent hover:underline">company account</Link>.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-accent" aria-hidden />
            <h2 className="text-2xl font-bold text-brand-foreground">Common questions</h2>
          </div>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-brand-foreground">{f.q}</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-foreground/70">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-brand-foreground/60">
            Want the full price breakdown? Read{" "}
            <Link href="/blog/same-day-delivery-accra-prices" className="text-brand-accent hover:underline">
              same-day delivery prices in Accra
            </Link>.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Send it today"
            subheading="Book in under a minute. Choose whichever channel is easiest for you."
            waMessage="Hi Mckot, I need a same-day delivery in Accra today."
          />
        </FadeIn>
      </Section>
    </>
  );
}
