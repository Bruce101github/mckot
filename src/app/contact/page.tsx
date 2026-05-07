import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { VendorSignupForm } from "@/components/VendorSignupForm";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Mckot on WhatsApp or via the vendor signup form. Accra-based logistics team.",
};

const faqs = [
  {
    q: "How fast can I start?",
    a: "Most vendors receive a rider pairing within two business days once we verify pickup zones.",
  },
  {
    q: "Do you handle fragile goods?",
    a: "Yes. Flag handling notes during booking so dispatch assigns riders trained on delicate SKUs.",
  },
  {
    q: "Can I change pickup addresses?",
    a: "Absolutely. Message your pod lead with 24-hour notice when possible so routing stays smooth.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Contact</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Talk with a human who ships daily
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            WhatsApp is fastest for Accra vendors who already live there. Prefer forms? Send details below.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={siteConfig.social.whatsapp} external variant="primary">
              WhatsApp Business
            </Button>
            <Button href="mailto:hello@mckot.com" external variant="secondary">
              Email hello@mckot.com
            </Button>
          </div>
          <p className="mt-6 text-xs text-brand-foreground/45">
            Replace hello@mckot.com with your live inbox via DNS when ready.
          </p>
        </FadeIn>
      </Section>

      <Section id="signup">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Vendor signup</h2>
          <p className="mt-3 max-w-xl text-sm text-brand-foreground/65">
            We route leads straight to ops. Expect a ping within one business day.
          </p>
          <div className="mt-8">
            <VendorSignupForm id="signup-form" />
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">FAQ</h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-brand-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm text-brand-foreground/65">{f.a}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Section>
    </>
  );
}
