import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "restaurants-accra-supply-catering-delivery",
  title: "How Restaurants in Accra Handle Supply and Catering Deliveries",
  excerpt:
    "Beyond the customer meal, restaurants run a constant flow of supply runs and catering drops. Here is how Accra kitchens keep that moving without their own fleet.",
  category: "For business",
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
        name: "How do restaurants in Accra handle supply runs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many Accra restaurants use an on-demand courier for supply runs instead of sending kitchen staff out. They book a rider to collect ingredients or packaging from a supplier and bring it to the kitchen, often on a recurring daily schedule.",
        },
      },
      {
        "@type": "Question",
        name: "Can a courier handle catering deliveries for a restaurant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A courier can deliver catering orders and customer drops that a restaurant's own riders cannot cover, especially during peak hours or for one-off large orders to a single address.",
        },
      },
      {
        "@type": "Question",
        name: "Is Mckot a food delivery app like Mckot Eats?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mckot is the logistics layer a restaurant uses to move things: supply runs, catering drops, and customer deliveries its own team cannot cover. It is general delivery, not a consumer food-ordering marketplace.",
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
            heading="Keep your kitchen moving"
            subheading="Supply runs, catering drops, and overflow deliveries. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I run a restaurant in Accra and need help with supply and catering runs."
          />
        }
      >
        <p>
          When people think about restaurant delivery, they picture the meal going
          out to a customer. But spend a day in an Accra kitchen and you see the
          other half: the supplier run for the ingredient that just ran out, the
          packaging pickup, the catering order that has to reach an event across
          town on time. That flow never stops, and it is where most kitchens quietly
          lose hours. Here is how the well-run ones handle it.
        </p>

        <h2>The supply run is the hidden cost</h2>
        <p>
          The classic mistake is sending a kitchen staff member out to grab
          supplies. You lose them for an hour or more, in traffic, during service.
          The restaurants that have figured this out book a rider instead: collect
          from the supplier, bring it to the kitchen, staff stays on the line. For
          the items you reorder constantly, a{" "}
          <a href="/services/scheduled-pickup">scheduled pickup</a> means the run
          happens on a fixed window without anyone having to think about it.
        </p>

        <h2>Catering and large one-off drops</h2>
        <p>
          Catering is where timing is everything. A single large order to an office
          or event needs to arrive together, intact, and on schedule. Booking a
          dedicated rider for that drop, separate from your normal service, means
          the catering order is not competing with walk-in demand for attention.
          You can track it the whole way and confirm it landed.
        </p>

        <h2>When your own riders are maxed out</h2>
        <p>
          Plenty of restaurants have a rider or two of their own. The problem is
          peak hours, when orders pile up faster than your riders can clear them.
          That is exactly when an on-demand courier earns its place: overflow
          capacity you only pay for when you use it. No extra salaries, no idle
          bikes on a slow afternoon.
        </p>

        <h2>To be clear about what this is</h2>
        <p>
          Mckot is not a food-ordering marketplace. It is the logistics layer your
          restaurant uses when your own delivery does not cover something: the
          supply run, the catering drop, the customer who is just outside your
          usual range. Think of it as extra hands on a motorbike whenever the
          kitchen needs them.
        </p>

        <h2>Setting it up</h2>
        <p>
          Start with one run. Book a supply pickup or a catering drop on the site,
          in the app, or over WhatsApp, and see how it fits your service. Once you
          spot the pattern, move the repeat runs onto a schedule. The full picture
          is on the <a href="/for/restaurants">restaurants page</a>, and if your
          volume grows, a <a href="/for/companies">company account</a> pulls every
          run into one monthly statement.
        </p>
      </ArticleLayout>
    </>
  );
}
