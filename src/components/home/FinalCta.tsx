import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <Section id="cta" className="pb-28 md:pb-24">
      <FadeIn>
        <div className="rounded-3xl bg-brand-dark p-10 text-center md:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Limited spots
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-brand-dark-foreground md:text-4xl">
            Your next sale deserves reliable delivery
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-dark-foreground/70">
            Spots for early vendors are limited. Join now to lock in pre-launch rates and get
            a dedicated onboarding call.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="#signup" variant="primary">
              Start Delivering in 24 Hours
            </Button>
            <Button
              href={siteConfig.social.whatsapp}
              external
              variant="secondary"
              className="border-white/20 bg-white/10 text-brand-dark-foreground hover:bg-white/15 hover:border-white/30"
            >
              Chat on WhatsApp first
            </Button>
          </div>
          <p className="mt-8 text-xs text-brand-dark-foreground/40">
            No subscription. Cancel anytime. Our team confirms setup over WhatsApp.
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}
