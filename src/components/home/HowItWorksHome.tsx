import { Package, Route, Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";

const steps = [
  {
    icon: Smartphone,
    title: "Book in minutes",
    body: "Tell us pickup, drop-off, and parcel notes from your phone. No messy spreadsheets.",
  },
  {
    icon: Route,
    title: "We route smart",
    body: "Dispatch pairs your jobs with riders who already run tight corridors near you.",
  },
  {
    icon: Package,
    title: "Buyers stay informed",
    body: "Updates land in WhatsApp so you stay focused on content and closing sales.",
  },
];

export function HowItWorksHome() {
  return (
    <Section id="how-it-works">
      <FadeIn>
        <h2 className="text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
          Three calm steps. Zero drama.
        </h2>
        <p className="mt-4 max-w-2xl text-brand-foreground/70">
          Built for vendors who move fast on social and need logistics that keeps pace without enterprise
          fluff.
        </p>
      </FadeIn>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.08}>
            <Card className="h-full">
              <s.icon className="h-10 w-10 text-brand-accent" aria-hidden />
              <h3 className="mt-6 text-xl font-semibold text-brand-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">{s.body}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
