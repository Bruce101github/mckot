import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const vendorTypes = [
  { emoji: "💄", label: "Skincare" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "🥧", label: "Food vendors" },
  { emoji: "📱", label: "Tech accessories" },
  { emoji: "👟", label: "Streetwear" },
  { emoji: "🌸", label: "Home decor" },
];

export function ProofAndStories() {
  return (
    <Section id="testimonials" className="bg-brand-muted/10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
            Vendor stories
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">
            Vendors who deliver more, stress less
          </h2>
          <p className="mt-4 text-brand-foreground/70">
            Social sellers across Accra are using Mckot to handle the logistics so they can
            focus on content, customers, and closing orders.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {vendorTypes.map((v) => (
              <span
                key={v.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-xs font-medium text-brand-foreground/70"
              >
                <span>{v.emoji}</span>
                {v.label}
              </span>
            ))}
          </div>

          <p className="mt-8 text-sm text-brand-foreground/50">
            Want your brand featured?{" "}
            <a
              href="#signup"
              className="font-semibold text-brand-accent underline-offset-2 hover:underline"
            >
              Join Mckot
            </a>{" "}
            and we will share your story.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <TestimonialCarousel />
        </FadeIn>
      </div>
    </Section>
  );
}
