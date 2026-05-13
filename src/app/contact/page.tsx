import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { VendorSignupForm } from "@/components/VendorSignupForm";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Reach Mckot in Accra",
  description:
    "Reach Mckot on WhatsApp, by phone, or via the vendor signup form. Accra-based delivery team available 7 days a week.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const faqs = [
  {
    q: "How fast can I start?",
    a: "Most vendors receive a rider pairing within one business day once we verify your pickup zone over WhatsApp.",
  },
  {
    q: "Do you handle fragile goods?",
    a: "Yes. Flag handling notes when you book so dispatch assigns a rider trained on delicate items.",
  },
  {
    q: "Can I change pickup addresses?",
    a: "Absolutely. Message your ops contact with 24-hour notice when possible so routing stays smooth.",
  },
  {
    q: "What payment methods do you accept?",
    a: "MTN Mobile Money, Vodafone Cash, and bank transfer. You can pay per delivery or settle a weekly invoice for high volumes.",
  },
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Mckot",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phones.primary,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressCountry: siteConfig.address.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Contact</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Talk with a human who ships daily
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            WhatsApp is the fastest way to reach us. For vendor signups, use the form below
            and we will ping you on WhatsApp within one business day.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-surface/70 p-5 transition hover:border-brand-accent/40"
            >
              <MessageCircle className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <p className="font-semibold text-brand-foreground">WhatsApp Business</p>
                <p className="mt-1 text-sm text-brand-foreground/60">Fastest response. Used by most vendors.</p>
                <p className="mt-2 text-sm font-medium text-brand-accent">{siteConfig.phones.primaryFormatted}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phones.primary}`}
              className="flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-surface/70 p-5 transition hover:border-brand-accent/40"
            >
              <Phone className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <p className="font-semibold text-brand-foreground">Primary line</p>
                <p className="mt-1 text-sm text-brand-foreground/60">Mon to Sun, 7am to 10pm.</p>
                <p className="mt-2 text-sm font-medium text-brand-accent">{siteConfig.phones.primaryFormatted}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phones.secondary}`}
              className="flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-surface/70 p-5 transition hover:border-brand-accent/40"
            >
              <Phone className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <p className="font-semibold text-brand-foreground">Backup line</p>
                <p className="mt-1 text-sm text-brand-foreground/60">If the primary line is busy.</p>
                <p className="mt-2 text-sm font-medium text-brand-accent">{siteConfig.phones.secondaryFormatted}</p>
              </div>
            </a>
          </div>
        </FadeIn>
      </Section>

      <Section id="signup">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Vendor signup</h2>
          <p className="mt-3 max-w-xl text-sm text-brand-foreground/65">
            Fill in your details. Our team reviews signups daily and reaches out on WhatsApp
            within one business day to get you set up.
          </p>
          <div className="mt-8">
            <VendorSignupForm id="signup-form" />
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Quick answers</h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-brand-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-foreground/65">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-brand-foreground/50">
            More questions?{" "}
            <Button href={siteConfig.social.whatsapp} external variant="secondary" className="inline-flex text-sm">
              Ask us on WhatsApp
            </Button>
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
