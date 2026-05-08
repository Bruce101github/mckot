import { UrgencyBanner } from "@/components/home/UrgencyBanner";
import { Hero } from "@/components/home/Hero";
import { SocialProofStrip } from "@/components/home/SocialProofStrip";
import { WhyMckot } from "@/components/home/WhyMckot";
import { HowItWorksHome } from "@/components/home/HowItWorksHome";
import { PricingSection } from "@/components/home/PricingSection";
import { CoverageGraphic } from "@/components/home/CoverageGraphic";
import { ProofAndStories } from "@/components/home/ProofAndStories";
import { FAQSection } from "@/components/home/FAQSection";
import { VendorSignupSection } from "@/components/home/VendorSignupSection";
import { FinalCta } from "@/components/home/FinalCta";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

export default function HomePage() {
  return (
    <>
      <UrgencyBanner />
      <Hero />
      <SocialProofStrip />
      <WhyMckot />
      <HowItWorksHome />
      <PricingSection />
      <CoverageGraphic />
      <ProofAndStories />
      <FAQSection />
      <VendorSignupSection />
      <FinalCta />
      <WhatsAppFab />
      <ExitIntentPopup />
    </>
  );
}
