import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "cheapest-reliable-delivery-accra-2026",
  title: "The Cheapest Reliable Delivery Options in Accra (2026)",
  excerpt:
    "Cheap and reliable usually pull in opposite directions. Here is how to get both in Accra in 2026, and the false economies that cost you more in the end.",
  category: "Pricing",
  readTime: "6 min read",
  date: "2026-06-05",
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
        name: "What is the cheapest way to send a package in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A motorbike courier is the cheapest reliable option for most sends in Accra, starting around GHS 35 within a zone. Buying delivery in bulk packs and using scheduled pickups brings the per-delivery cost down further.",
        },
      },
      {
        "@type": "Question",
        name: "How can I lower my delivery costs in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book within-zone where possible, batch several drops into one run, commit to bulk pack pricing once you have steady volume, and set recurring runs on a schedule. Predictable volume is cheaper to serve, so it is priced lower.",
        },
      },
      {
        "@type": "Question",
        name: "Is the cheapest courier always the best value?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A failed or late delivery costs you a refund and a lost customer, which dwarfs a few cedis saved. Reliable same-day delivery at a fair price is almost always better value than the lowest headline rate.",
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
            heading="Cheap, and actually reliable"
            subheading="From GHS 35 within a zone, with bulk and scheduled rates for steady volume. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I want the cheapest reliable delivery for my regular runs in Accra."
          />
        }
      >
        <p>
          Everyone wants delivery that is cheap and reliable, and most of the time
          those two words pull against each other. The cheapest rider is often the
          one who does not show up. After running deliveries across Accra, here is
          how I would get genuinely low cost without sacrificing the reliability
          that actually protects your money.
        </p>

        <h2>Start with the real baseline</h2>
        <p>
          For most sends, a motorbike courier is the cheapest reliable option in
          Accra. The base rate is around GHS 35 for a within-zone delivery. A car
          or a ride-hailing trip for the same package costs more, and informal
          riders who undercut that price usually do it by cutting reliability. My
          full breakdown of{" "}
          <a href="/blog/same-day-delivery-accra-prices">same-day delivery prices in Accra</a>{" "}
          shows where the rates sit across zones.
        </p>

        <h2>Four ways to genuinely lower the cost</h2>
        <ul>
          <li><strong>Stay within zone when you can.</strong> A within-zone run is the cheapest tier. If you can consolidate drops by area, you pay the low rate more often.</li>
          <li><strong>Batch your drops.</strong> Several deliveries in one planned run cost less per drop than booking each separately, because one rider clears the whole list.</li>
          <li><strong>Buy in bulk packs.</strong> Once you have steady volume, bulk pack pricing (typically from 15 orders) drops your per-delivery rate.</li>
          <li><strong>Schedule the repeat runs.</strong> A <a href="/services/scheduled-pickup">scheduled pickup</a> is cheaper than ad hoc booking because predictable volume is easier to plan around.</li>
        </ul>

        <h2>The false economy to avoid</h2>
        <p>
          Here is the part people learn the hard way. The cheapest rider you can
          find is not the cheapest delivery you will pay for. A package that
          arrives late, broken, or not at all costs you a refund, the item, and a
          customer who buys elsewhere next time. One failed delivery wipes out the
          savings from a dozen cut-rate ones. Reliable at a fair price beats cheap
          and unreliable every time.
        </p>

        <h2>What I would actually choose</h2>
        <p>
          If I were optimising for cost today: motorbike courier as the default,
          within-zone routing wherever possible, batched drops, and a bulk or
          scheduled arrangement once my volume was steady. That combination gets
          you the lowest sustainable price while keeping the reliability that keeps
          customers. If you are comparing providers first, my guide to the{" "}
          <a href="/blog/best-delivery-service-ghana">best delivery services in Ghana</a>{" "}
          lays out the field, and{" "}
          <a href="/services/business-delivery">business delivery on Mckot</a> shows
          how the bulk and COD pieces fit together.
        </p>
      </ArticleLayout>
    </>
  );
}
