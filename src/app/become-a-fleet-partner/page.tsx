import type { Metadata } from "next";

import { FleetHero } from "./_components/FleetHero";
import { WhyBecomePartner } from "./_components/WhyBecomePartner";
import { HowItWorks } from "./_components/HowItWorks";
import { EarningsExample } from "./_components/EarningsExample";
import { RequirementsBlock } from "./_components/RequirementsBlock";
import { ApplySection } from "./_components/ApplySection";
import { FleetFAQ } from "./_components/FleetFAQ";

export const metadata: Metadata = {
  title: "Become a Mckot Fleet Partner",
  description:
    "Own motorcycles? Put them to work on Mckot. We dispatch the trips, vet the riders, and pay your share automatically, every week.",
  alternates: { canonical: "/become-a-fleet-partner" },
  openGraph: {
    title: "Mckot Fleet · Own the wheels. We run the business.",
    description:
      "Apply to operate motorcycles on Ghana's ride-hailing and delivery platform. Transparent splits, real-time tracking, weekly payouts.",
    url: "/become-a-fleet-partner",
  },
};

export default function BecomeAFleetPartnerPage() {
  return (
    <>
      <FleetHero />
      <WhyBecomePartner />
      <HowItWorks />
      <EarningsExample />
      <RequirementsBlock />
      <ApplySection />
      <FleetFAQ />
    </>
  );
}
