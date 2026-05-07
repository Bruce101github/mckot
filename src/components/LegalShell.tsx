import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  effectiveLabel?: string;
  children: React.ReactNode;
};

export function LegalShell({ title, description, effectiveLabel, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-foreground md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg text-brand-foreground/70">{description}</p>
      ) : null}
      {effectiveLabel ? (
        <p className="mt-6 text-sm text-brand-foreground/50">{effectiveLabel}</p>
      ) : null}
      <div className="mt-12 space-y-10 text-brand-foreground/85">{children}</div>
      <p className="mt-14 border-t border-brand-border pt-8 text-xs text-brand-foreground/45">
        This document is provided as a starting point only and does not constitute legal advice. Have it
        reviewed by qualified counsel in Ghana before publication.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block text-sm font-semibold text-brand-accent hover:underline"
      >
        Contact us with legal questions
      </Link>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-brand-foreground">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-foreground/75">{children}</div>
    </section>
  );
}

export { Section };
