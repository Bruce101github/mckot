import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "courier-services-small-business-ghana",
  title: "Courier Services for Small Businesses in Ghana: What to Look For",
  excerpt:
    "The seven things that actually matter when choosing a courier for your business in Ghana, from cash-on-delivery to coverage, and the questions to ask before you commit.",
  category: "For business",
  readTime: "7 min read",
  date: "2026-06-03",
};

export const metadata: Metadata = {
  title: `${article.title} | Mckot Blog`,
  description: article.excerpt,
  alternates: { canonical: `${siteConfig.url}/blog/${article.slug}` },
  openGraph: {
    title: article.title,
    description: article.excerpt,
    type: "article",
    publishedTime: article.date,
    authors: ["Mckot"],
  },
};

export default function Article() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: "Bruce Thiombiano", jobTitle: "Founder, Mckot" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo-light.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${article.slug}` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What should a small business look for in a courier in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Look for same-day delivery, cash-on-delivery with same-day settlement, wide coverage across your city, live tracking, proof of delivery, transparent per-delivery pricing, and no long contract. These seven things separate a courier you can build on from one that will cost you sales.",
        },
      },
      {
        "@type": "Question",
        name: "Is cash-on-delivery important for a Ghanaian business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many Ghanaian buyers still prefer to pay on delivery, so a courier that collects cash, reconciles it, and settles to your Mobile Money the same day removes a major barrier to closing sales.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a contract to use a courier in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not with every service. Mckot, for example, charges per delivery with no contract and no monthly minimum, with bulk pricing available once you reach steady volume.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        {...article}
        footerCta={
          <ThreeChannelCta
            heading="Try Mckot for your business"
            subheading="Move your first order today with no contract. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I run a business in Ghana and I'm comparing couriers. Can you tell me more?"
          />
        }
      >
        <p>
          I talk to business owners across Accra every week, and the question
          comes up again and again: how do I pick a courier I can actually rely
          on? A late delivery is not just a late delivery. It is a refund, a bad
          review, and a customer who buys from someone else next time. So here is
          the honest checklist I would use if I were choosing a courier for my own
          business in Ghana.
        </p>

        <h2>1. Same-day delivery as standard</h2>
        <p>
          In Accra, same-day is the baseline now, not a premium. If a courier
          cannot reliably move your order the same day it is booked, your
          customers will feel it. Ask what their typical within-city turnaround
          is, not their best case.
        </p>

        <h2>2. Cash-on-delivery that settles fast</h2>
        <p>
          Plenty of Ghanaian buyers still want to pay when the item is in their
          hands. A courier that collects cash, reconciles it cleanly, and pays you
          by Mobile Money the same day turns that preference into closed sales
          instead of a headache. I wrote a fuller piece on{" "}
          <a href="/blog/cod-delivery-ghana-online-sellers">handling cash-on-delivery in Ghana</a>{" "}
          if you want the detail.
        </p>

        <h2>3. Coverage that matches where your customers are</h2>
        <p>
          A courier that only serves two neighbourhoods limits your own reach.
          Check that they actually cover the areas you sell to. Mckot covers seven
          zones across Greater Accra, from East Legon and Osu to Spintex, Madina,
          Dansoman, and the Tema corridor.
        </p>

        <h2>4. Live tracking and proof of delivery</h2>
        <p>
          You should be able to see where an order is without phoning anyone, and
          you should get confirmation when it lands. Tracking protects you in
          disputes and it is the single thing customers ask about most.
        </p>

        <h2>5. Transparent, per-delivery pricing</h2>
        <p>
          Avoid services that quote a different price every time. You want a clear
          zone-based rate so you can build delivery into your own pricing without
          surprises. If you are not sure what is fair, my breakdown of{" "}
          <a href="/blog/same-day-delivery-accra-prices">same-day delivery prices in Accra</a>{" "}
          lays out the market.
        </p>

        <h2>6. No contract, no trap</h2>
        <p>
          A good courier earns your volume by performing, not by locking you in.
          Per-delivery pricing with no monthly minimum lets you start small and
          scale only when it works. Bulk pricing should reward steady volume, not
          punish you for leaving.
        </p>

        <h2>7. One way to reach them that always works</h2>
        <p>
          When something is urgent, you need to book without friction. Mckot lets
          you book on the website, in the app, or straight over WhatsApp, so there
          is always a fast path even on a busy day.
        </p>

        <h2>The short version</h2>
        <p>
          The best courier for a small business in Ghana is the one that delivers
          same day, handles cash-on-delivery, covers your customers, shows you
          where everything is, prices it clearly, and does not tie you down. For a
          side-by-side view of the options, see my guide to the{" "}
          <a href="/blog/best-delivery-service-ghana">best delivery services in Ghana</a>, or
          jump straight to <a href="/services/business-delivery">how business delivery works on Mckot</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
