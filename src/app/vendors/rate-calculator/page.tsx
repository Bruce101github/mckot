import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { VendorRateCalculator } from "@/components/vendors/VendorRateCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vendor Delivery Rate Calculator | Mckot",
  description:
    "Check Mckot delivery rates anywhere in Greater Accra from your pickup point, and download a full rate sheet for every area.",
  alternates: { canonical: `${siteConfig.url}/vendors/rate-calculator` },
};

export default function VendorRateCalculatorPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">For vendors</p>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold text-brand-foreground md:text-4xl">
          What will delivery cost your customer?
        </h1>
        <p className="mt-4 max-w-xl text-brand-foreground/70">
          Set your pickup point, then check any drop-off in Greater Accra — or download a full
          rate sheet covering every area at once.
        </p>
      </FadeIn>
      <FadeIn delay={0.08} className="mt-10 max-w-xl">
        <VendorRateCalculator />
      </FadeIn>
    </Section>
  );
}
