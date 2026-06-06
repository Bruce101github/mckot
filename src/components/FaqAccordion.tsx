import { Section } from "@/components/Section";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  eyebrow?: string;
  heading?: string;
  className?: string;
};

// Renders an accessible FAQ accordion AND emits FAQPage JSON-LD so the same
// answers are eligible to be cited by AI answer engines (GEO).
export function FaqAccordion({
  items,
  eyebrow = "Common questions",
  heading = "Everything we get asked.",
  className = "bg-brand-muted/30",
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-14">
        {items.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-brand-border bg-white p-5 transition open:shadow-soft md:p-6"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-brand-foreground md:text-lg">
              <span>{f.q}</span>
              <span
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-muted text-brand-foreground/70 transition group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-brand-foreground/70 md:text-base">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
