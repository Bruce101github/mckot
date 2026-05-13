import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { VendorSignupForm } from "@/components/VendorSignupForm";
import { siteConfig } from "@/lib/site";
import { MessageCircle } from "lucide-react";

const perks = [
  "3 free deliveries in your first 30 days",
  "Dedicated onboarding over WhatsApp",
  "Cash-on-delivery handled for you",
];

export function VendorSignupSection() {
  return (
    <Section id="signup">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
              Get started
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
              Your customers are waiting. Let&apos;s fix the last mile.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-foreground/70">
              Fill in your details and our team reaches out on WhatsApp within one business
              day to get you delivering.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {perks.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5 text-xs font-semibold text-brand-accent"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <VendorSignupForm id="signup-form" />
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-foreground/50">
            <span>Prefer to talk first?</span>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-accent hover:underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Message us on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
