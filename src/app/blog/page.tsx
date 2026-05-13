import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Delivery Blog | Tips for Online Vendors in Ghana | Mckot",
  description:
    "Practical guides for Instagram, TikTok, and WhatsApp sellers in Ghana. Delivery tips, logistics advice, and how to grow your Accra business.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogPage() {
  const published = articles.filter((a) => !a.comingSoon);
  const upcoming = articles.filter((a) => a.comingSoon);

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Blog</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery guides for Accra vendors
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Practical advice for Instagram, TikTok, and WhatsApp sellers in Ghana who want
            better delivery without the logistics headache.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {published.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface/80 p-6 transition-all hover:border-brand-accent/40 hover:shadow-soft"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  {article.category}
                </span>
                <h2 className="mt-3 text-lg font-bold leading-snug text-brand-foreground group-hover:text-brand-accent transition-colors">
                  {article.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-foreground/65">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-brand-foreground/40">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {article.readTime}
                  </span>
                  <ArrowRight className="h-4 w-4 text-brand-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {upcoming.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-foreground/40">
                Coming soon
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {upcoming.map((article) => (
                  <div
                    key={article.slug}
                    className="rounded-2xl border border-dashed border-brand-border p-5 opacity-60"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent/70">
                      {article.category}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-brand-foreground">
                      {article.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-foreground/40">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {article.readTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Ready to deliver?
            </p>
            <p className="mt-3 text-2xl font-bold text-brand-foreground">
              3 free deliveries in your first 30 days
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-brand-foreground/65">
              Join as a founding Mckot vendor. We set you up over WhatsApp in one business day.
            </p>
            <Link
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
            >
              Start on WhatsApp
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
