import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const problems = [
  "Customers stop responding after late deliveries",
  "Courier shows up three hours late, or not at all",
  "You spend your whole day answering 'where is my order?'",
  "Juggling two or three delivery apps with different pricing",
  "No tracking means your brand reputation takes the hit",
];

const solutions = [
  "Same-day pickup and delivery across Greater Accra",
  "Dedicated rider network trained for handoffs",
  "Shareable tracking link for every order",
  "One platform, WhatsApp booking, one clear price",
  "Proof of delivery so disputes are closed fast",
];

export function WhyMckot() {
  return (
    <Section id="why-mckot" className="bg-brand-muted/10">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
          The problem
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
          Delivery problems are killing your sales
        </h2>
        <p className="mt-4 max-w-2xl text-brand-foreground/70">
          Social commerce vendors in Accra are good at selling. Logistics gets in the way. Here
          is what Mckot fixes.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <FadeIn delay={0.05}>
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-red-400">
              Without Mckot
            </p>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-400/70"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-brand-foreground/75">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-6">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-accent">
              With Mckot
            </p>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-brand-foreground/80">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
