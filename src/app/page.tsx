import { Hero } from "@/components/home/Hero";
import { SocialProofStrip } from "@/components/home/SocialProofStrip";
import { HowItWorksHome } from "@/components/home/HowItWorksHome";
import { CoverageGraphic } from "@/components/home/CoverageGraphic";
import { WhyMckot } from "@/components/home/WhyMckot";
import { ProofAndStories } from "@/components/home/ProofAndStories";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <HowItWorksHome />
      <CoverageGraphic />
      <WhyMckot />
      <ProofAndStories />
      <FinalCta />
    </>
  );
}
