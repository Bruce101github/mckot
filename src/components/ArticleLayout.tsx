import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { BlogScrollTracker } from "@/components/BlogScrollTracker";

interface ArticleLayoutProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  children: React.ReactNode;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const WA_ARTICLE_URL = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I just read your blog and I'd like to claim my 3 free deliveries")}`;

export function ArticleLayout({ slug, title, excerpt, category, readTime, date, children }: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-6 md:py-20">
      <BlogScrollTracker slug={slug} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-foreground/50 transition hover:text-brand-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All articles
      </Link>

      <header className="mt-10">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
          {category}
        </span>
        <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.15] tracking-tight text-brand-foreground sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-[1.7] text-brand-foreground/65 md:text-xl">
          {excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-foreground/45">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(date)}
          </span>
          <span className="h-1 w-1 rounded-full bg-brand-foreground/20" aria-hidden />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {readTime}
          </span>
        </div>
      </header>

      <hr className="my-12 border-brand-border" />

      <article
        className="
          prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-brand-foreground
          prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[1.6rem] prose-h2:leading-snug
          prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[1.25rem] prose-h3:leading-snug
          prose-p:my-6 prose-p:leading-[1.8] prose-p:text-brand-foreground/80
          prose-strong:font-semibold prose-strong:text-brand-foreground
          prose-a:font-medium prose-a:text-brand-accent prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline
          prose-ul:my-6 prose-ol:my-6 prose-ul:pl-6 prose-ol:pl-6
          prose-li:my-2.5 prose-li:leading-[1.75] prose-li:text-brand-foreground/80
          prose-li:marker:text-brand-accent
          prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-brand-accent prose-blockquote:bg-brand-surface/60 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-brand-foreground/80
          prose-img:rounded-2xl prose-img:my-10
          prose-hr:my-12 prose-hr:border-brand-border
        "
      >
        {children}
      </article>

      <hr className="my-14 border-brand-border" />

      <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-8 text-center md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Ready to start?
        </p>
        <p className="mt-4 text-xl font-bold text-brand-foreground md:text-2xl">
          {siteConfig.offer.headline}
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-brand-foreground/65">
          Join as a founding Mckot vendor. We set you up over WhatsApp in one business day.
        </p>
        <a
          href={WA_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
        >
          Claim 3 free deliveries on WhatsApp
        </a>
      </div>
    </div>
  );
}
