import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <Section id="cta" className="pb-28 md:pb-24">
      <FadeIn>
        <div className="rounded-3xl border border-brand-accent/30 bg-gradient-to-br from-brand-muted/80 to-brand p-10 text-center md:p-16">
          <h2 className="text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
            Ready to grow?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-foreground/75">
            Start delivering today. Share your pickup rhythm and we pair you with a rider squad that fits.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact#signup" variant="primary">
              Open signup form
            </Button>
            <Button href={siteConfig.social.whatsapp} external variant="secondary">
              WhatsApp us instead
            </Button>
          </div>
          <p className="mt-8 text-xs text-brand-foreground/45">
            Already onboarded?{" "}
            <Link href="/services" className="underline-offset-2 hover:text-brand-accent hover:underline">
              Browse services
            </Link>
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}
