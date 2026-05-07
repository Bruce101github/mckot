import { Clock, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";

const reasons = [
  {
    icon: Clock,
    title: "Speed with discipline",
    body: "Same-day where promised. No mystery ETAs. Riders trained on handoffs that protect your brand.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability you can quote",
    body: "Proof of delivery, structured escalation, and accountable pods instead of random freelancers.",
  },
  {
    icon: Sparkles,
    title: "Tech where it helps",
    body: "Dashboards and alerts that respect how vendors actually work on mobile in Ghana.",
  },
  {
    icon: Users,
    title: "Vendor-first mindset",
    body: "Product roadmap listens to sellers moving inventory through social, not corporate procurement.",
  },
];

export function WhyMckot() {
  return (
    <Section id="why-mckot">
      <FadeIn>
        <h2 className="text-3xl font-bold text-brand-foreground md:text-4xl">Why Mckot</h2>
        <p className="mt-4 max-w-2xl text-brand-foreground/70">
          We are building quietly in Accra with loud ambition for commerce infra across the continent.
        </p>
      </FadeIn>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {reasons.map((r, i) => (
          <FadeIn key={r.title} delay={i * 0.06}>
            <Card>
              <r.icon className="h-9 w-9 text-brand-accent" aria-hidden />
              <h3 className="mt-5 text-lg font-semibold text-brand-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-foreground/65">{r.body}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
