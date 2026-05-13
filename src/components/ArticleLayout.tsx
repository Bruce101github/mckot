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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <BlogScrollTracker slug={slug} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-foreground/50 transition hover:text-brand-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All articles
      </Link>

      <div className="mt-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          {category}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-foreground/65">{excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-brand-foreground/40">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {readTime}
          </span>
        </div>
      </div>

      <hr className="my-10 border-brand-border" />

      <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-brand-foreground prose-p:text-brand-foreground/75 prose-p:leading-relaxed prose-li:text-brand-foreground/75 prose-strong:text-brand-foreground prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-ul:space-y-2 prose-ol:space-y-2">
        {children}
      </div>

      <hr className="my-12 border-brand-border" />

      <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          Ready to start?
        </p>
        <p className="mt-3 text-xl font-bold text-brand-foreground">
          {siteConfig.offer.headline}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-brand-foreground/65">
          Join as a founding Mckot vendor. We set you up over WhatsApp in one business day.
        </p>
        <a
          href={WA_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
        >
          Claim 3 free deliveries on WhatsApp
        </a>
      </div>
    </div>
  );
}
