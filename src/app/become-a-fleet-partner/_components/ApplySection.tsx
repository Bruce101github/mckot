import { Section } from "@/components/Section";
import { FleetApplicationForm } from "./FleetApplicationForm";

export function ApplySection() {
  return (
    <Section id="apply" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          Apply
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          Ten minutes. Decision in two days.
        </h2>
        <p className="mt-4 text-balance text-brand-foreground/65 md:text-lg">
          Walk through the four sections below. We save what you submit
          and our partnerships team takes it from there.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl md:mt-14">
        <FleetApplicationForm />
      </div>
    </Section>
  );
}
