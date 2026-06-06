import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, Clock, Stamp } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Document Delivery in Accra and Ghana | Mckot",
  description:
    "Same-day document and contract delivery across Greater Accra. Legal papers, IDs, cheques, and office mail handled with care and tracked live. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/services/document-delivery` },
};

const features = [
  { icon: Clock, title: "Same-day, often same-hour", body: "Contracts that need a signature today move today. Urgent single-document runs go out fast." },
  { icon: ShieldCheck, title: "Handled with care", body: "Documents stay flat, dry, and protected. Sensitive papers are carried discreetly from desk to desk." },
  { icon: Stamp, title: "Proof of delivery", body: "Every drop is confirmed so you know exactly when your document arrived and who received it." },
  { icon: FileText, title: "Office to office", body: "Pickup from your office and delivery straight to the recipient's desk, no PO boxes or depots." },
];

const items = [
  "Signed contracts and agreements",
  "Legal documents and court filings",
  "Cheques and bank paperwork",
  "ID cards, passports, and certificates",
  "Tender and bid submissions",
  "Internal mail between branches",
];

const faqs = [
  {
    q: "How do I send documents across Accra the same day?",
    a: "Book a pickup on the Mckot site or app, or send the pickup and drop-off addresses on WhatsApp. A rider collects from your office and delivers straight to the recipient, usually within a few hours.",
  },
  {
    q: "Is it safe to send legal or sensitive documents?",
    a: "Yes. Documents are carried in protective packaging and handled discreetly. You get delivery confirmation showing when and where the document arrived, so there is a clear record.",
  },
  {
    q: "How much does document delivery cost in Accra?",
    a: "Document delivery starts at GHS 35 within a zone, around GHS 50 across zones, and GHS 60 on the Tema corridor. Documents are light, so they fall into the standard rate.",
  },
];

export default function DocumentDeliveryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Document Delivery in Accra and Ghana",
    description:
      "Same-day document and contract delivery across Greater Accra, Ghana. Legal papers, IDs, cheques, and office mail delivered with proof of delivery.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Document Delivery",
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Document delivery</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Get documents across Accra, today
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Contracts that need a signature. An ID a client forgot. A cheque
            that has to reach the bank before close. Mckot moves your documents
            office to office across Greater Accra, same day, with proof of
            delivery on every run.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href="/services/business-delivery" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Business delivery
            </Link>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Why offices use Mckot for documents</h2>
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
              <h2 className="text-2xl font-bold text-brand-foreground">What we move</h2>
              <ul className="mt-6 space-y-3">
                {items.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <FileText className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
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
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Send a document now"
            subheading="Book a rider and your document is on its way. Choose whichever channel suits you."
            waMessage="Hi Mckot, I need to send documents across Accra today."
          />
        </FadeIn>
      </Section>
    </>
  );
}
