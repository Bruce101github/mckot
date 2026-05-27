import { Section } from "@/components/Section";
import { Check } from "lucide-react";

const requirements = [
  "A valid Ghana Card for the account owner",
  "At least one motorcycle, car, or truck (or plans to acquire one)",
  "A MoMo or bank account in the owner's name",
  "A WhatsApp-capable phone",
  "For registered businesses: RGD certificate and TIN",
];

export function RequirementsBlock() {
  return (
    <Section className="bg-brand-dark text-brand-dark-foreground">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
            What you need
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            We keep onboarding light.
          </h2>
          <p className="mt-4 max-w-md text-balance text-brand-dark-foreground/70 md:text-lg">
            No upfront fees, no inventory, no bonds. If you can answer
            yes to the list, you can apply today.
          </p>
        </div>

        <ul className="space-y-3 rounded-2xl border border-brand-dark-border bg-brand-dark-surface/60 p-6 md:p-8">
          {requirements.map((r) => (
            <li key={r} className="flex items-start gap-3 text-base">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-accent">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="text-brand-dark-foreground/85">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
