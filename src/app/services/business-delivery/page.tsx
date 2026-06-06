import type { Metadata } from "next";
import Link from "next/link";
import { Store, Wallet, Repeat, BarChart2, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business Delivery Service in Accra, Ghana | Mckot",
  description:
    "Reliable business delivery in Accra: same-day customer drops, supply runs, cash-on-delivery, and batch scheduling. No contract. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/services/business-delivery` },
};

const features = [
  { icon: Repeat, title: "Daily customer drops", body: "Clear your orders every day without hiring riders. Book as you go or set a recurring pickup window." },
  { icon: Wallet, title: "Cash-on-delivery built in", body: "We collect from your customer, reconcile, and settle to your Mobile Money the same day. No chasing payments." },
  { icon: BarChart2, title: "Batch scheduling", body: "Hand us the day's list and we sequence the runs. Bulk pricing kicks in from 15 orders." },
  { icon: Store, title: "Supply and stock runs", body: "Pick up stock from a supplier, move goods between branches, or restock a stall. One rider, one trip." },
];

const segments = [
  "Retail shops and boutiques",
  "Restaurants and food businesses",
  "Pharmacies and health stores",
  "Salons and beauty brands",
  "Repair shops and service centres",
  "Distributors and wholesalers",
];

const faqs = [
  {
    q: "What is the best delivery service for a small business in Accra?",
    a: "The best fit is a service that offers same-day delivery, cash-on-delivery with same-day settlement, and no long contract. Mckot covers all seven Greater Accra zones, handles COD, and lets you start with no commitment.",
  },
  {
    q: "Do I need a contract to use Mckot for my business?",
    a: "No. There is no contract and no monthly minimum. You pay per delivery, and bulk pack pricing is available once you are running 15 or more orders a week.",
  },
  {
    q: "How does cash-on-delivery work for businesses?",
    a: "The rider collects cash from your customer at the door, reconciles the amount with Mckot, and we settle it to your Mobile Money the same day. There is no separate COD fee.",
  },
];

export default function BusinessDeliveryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Delivery Service in Accra, Ghana",
    description:
      "Same-day business delivery across Greater Accra, Ghana. Customer drops, supply runs, cash-on-delivery, and batch scheduling from GHS 35. No contract.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Business Delivery",
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Business delivery</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery your business can rely on
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Same-day customer drops, supply runs, and cash-on-delivery across
            Greater Accra, with no contract and no minimum volume. Built for
            businesses that need to move product without building a logistics
            department.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href="/for/companies" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Need a company account?
            </Link>
          </div>
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
              <h2 className="text-2xl font-bold text-brand-foreground">Businesses we deliver for</h2>
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
              <h2 className="text-2xl font-bold text-brand-foreground">Common questions</h2>
              <div className="mt-6 space-y-5">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <p className="text-sm font-semibold text-brand-foreground">{f.q}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-foreground/70">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-brand-foreground/60">
            New to this? Read{" "}
            <Link href="/blog/best-delivery-service-ghana" className="text-brand-accent hover:underline">
              the best delivery services in Ghana for businesses
            </Link>.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Move your first order today"
            subheading="No paperwork, no setup fee. Book on the site, in the app, or on WhatsApp and a rider is dispatched."
            waMessage="Hi Mckot, I run a business in Accra and need reliable delivery. Can you help?"
          />
        </FadeIn>
      </Section>
    </>
  );
}
