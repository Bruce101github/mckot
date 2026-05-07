import Link from "next/link";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

export function ProofAndStories() {
  return (
    <Section className="bg-brand-muted/10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <h2 className="text-3xl font-bold text-brand-foreground md:text-4xl">Voices from sellers</h2>
          <p className="mt-4 text-brand-foreground/70">
            Placeholder quotes styled like production. Swap with real interviews anytime.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <TestimonialCarousel />
        </FadeIn>
      </div>
      <FadeIn delay={0.12}>
        <p className="mt-10 text-center text-sm text-brand-foreground/55">
          Want your brand featured?{" "}
          <Link href="/contact" className="font-semibold text-brand-accent hover:underline">
            Tell us your story
          </Link>
          .
        </p>
      </FadeIn>
    </Section>
  );
}
