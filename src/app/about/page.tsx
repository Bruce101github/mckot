import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mckot empowers African online commerce with logistics rooted in Accra social sellers.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">About</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Built beside vendors, not above them
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Mckot began by solving last-mile gaps for social commerce sellers juggling Instagram orders,
            WhatsApp receipts, and unpredictable courier calls. That hands-on chaos shaped our ops rhythm.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Mission</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/75">
            Empower African online commerce with infrastructure that respects how buyers actually discover
            products: creators, chats, and peer referrals. Logistics is our wedge into a fuller commerce
            stack over time.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Founder note</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/75">
            Replace this paragraph with your authentic story: first riders you trusted, early vendors who
            stayed loyal, and why Accra density matters before chasing continent-wide hype.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-brand-foreground/55">
            Team grid intentionally omitted until you are ready to publish portraits.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
