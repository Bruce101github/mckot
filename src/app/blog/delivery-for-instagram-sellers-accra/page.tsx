import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_INSTAGRAM = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I sell on Instagram and I'd like to claim my 3 free deliveries")}`;

const article = {
  slug: "delivery-for-instagram-sellers-accra",
  title: "Delivery for Instagram Sellers in Accra: A Complete Guide",
  excerpt:
    "How Accra's Instagram vendors handle last-mile delivery, cash-on-delivery, and customer tracking. Everything you need to know before your first shipment.",
  category: "For sellers",
  readTime: "7 min read",
  date: "2026-05-01",
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
    author: {
      "@type": "Person",
      name: "Bruce Thiombiano",
      jobTitle: "Founder, Mckot",
    },
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
        name: "What is cash-on-delivery in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cash-on-delivery (COD) means the customer pays the delivery rider in cash when the package arrives at their door. The rider then reconciles the collected amount with the seller, typically via Mobile Money on the same day.",
        },
      },
      {
        "@type": "Question",
        name: "How fast is same-day delivery in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With a service like Mckot, a rider is typically at your door within 2 to 3 hours of booking. Most deliveries within Greater Accra are completed the same day, often within 3 to 5 hours of pickup.",
        },
      },
      {
        "@type": "Question",
        name: "Can I schedule batch pickups as an Instagram seller in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Batch pickup means one rider collects multiple orders from your location at a time you choose. This is more efficient than booking individual deliveries for each sale.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout {...article}>
        <p>
          If you sell on Instagram in Accra, you already know the problem. A customer
          messages you, falls in love with the product, then asks one question: &ldquo;Do you
          deliver?&rdquo; What happens next determines whether you close the sale or lose it to a
          competitor who does.
        </p>
        <p>
          The delivery problem for Instagram sellers in Accra is not about distance. Accra
          is compact enough that same-day delivery across the city is completely realistic.
          The problem is trust, reliability, and the cash-on-delivery question that comes up
          on almost every order.
        </p>
        <p>
          This guide covers everything you need to know before your first shipment: how to
          pick a delivery partner, how to handle cash-on-delivery without losing sleep, and
          how to stop the &ldquo;where is my order?&rdquo; messages from eating your selling time.
        </p>

        <h2>Why Instagram sellers in Accra need a dedicated delivery partner</h2>
        <p>
          Most Instagram sellers in Accra start the same way. They find a rider through
          WhatsApp, a friend&apos;s recommendation, or a random dispatch group. It works until it
          does not. The rider goes quiet. A package arrives late and the customer leaves a
          bad comment. You spend thirty minutes on a call tracking down what should have
          taken two minutes to confirm.
        </p>
        <p>
          A dedicated delivery partner changes the equation. You book through an app or
          WhatsApp, a rider is confirmed, your customer gets a tracking link, and you get
          proof of delivery. The logistics become predictable. Predictable logistics means
          you can scale your content, your drops, and your customer promises without the
          backend chaos.
        </p>
        <p>
          <em>I have watched vendors lose sales over this exact issue. Someone builds an audience of
          ten thousand followers, starts selling, closes orders, and then loses two customers on
          the first drop because their rider cancelled. The reputation damage is out of proportion
          to the logistics failure. A reliable delivery partner is not a luxury for an Instagram
          seller in Accra. It is table stakes.</em>
        </p>

        <h2>The cash-on-delivery question</h2>
        <p>
          In nearly every onboarding conversation I have with new vendors, COD comes up as the
          make-or-break issue. Ghanaian buyers have been burned by prepayment scams often enough
          that many will not pay before they see the product. Sellers who cannot offer COD lose a
          significant share of buyers who would otherwise convert.
        </p>
        <p>
          Here is how COD works when it is done properly:
        </p>
        <ol>
          <li>Your rider collects the package from you.</li>
          <li>They deliver to your customer and collect cash on arrival.</li>
          <li>The collected cash is reconciled and transferred to your Mobile Money account, same day.</li>
          <li>You get a delivery confirmation with the time, amount collected, and any delivery notes.</li>
        </ol>
        <p>
          The key word is &ldquo;reconciled.&rdquo; The difference between a good COD process and
          a messy one is whether someone is tracking what was collected and making sure it
          matches what you expected. Ask any delivery service whether they have a formal COD
          reconciliation process before you commit.
        </p>

        <h2>What &ldquo;where is my order?&rdquo; costs you</h2>
        <p>
          Every time a customer messages you asking for an update, that is time you are not
          spending on content, customer acquisition, or actual selling. On a good drop day,
          this can mean ten to twenty messages from different customers asking the same thing.
        </p>
        <p>
          The fix is a tracking link. A real-time tracking link sent directly to your customer
          after pickup means they can see exactly where their order is without messaging you.
          The best delivery services generate this automatically per delivery and either send
          it to the customer or give it to you to forward.
        </p>
        <p>
          If a delivery service cannot give your customer a tracking link, you will feel that
          gap every single drop day.
        </p>

        <h2>What to look for in a delivery partner as an Instagram seller</h2>
        <p>
          Not every courier in Accra is built for social commerce. Here are the specific
          things that matter for Instagram sellers, in order of importance:
        </p>
        <ul>
          <li>
            <strong>Cash-on-delivery with proper reconciliation.</strong> Not just &ldquo;we
            collect cash&rdquo; but a structured process where totals are tracked and transferred
            to you.
          </li>
          <li>
            <strong>Real-time tracking links.</strong> The kind you can forward to your
            customer, not internal tracking you have to relay manually.
          </li>
          <li>
            <strong>Same-day pickup confirmation.</strong> You should know a rider is
            confirmed before you start packing, not after.
          </li>
          <li>
            <strong>Batch pickup support.</strong> If you are running a drop, you need a
            rider who shows up at a time you set, not a time that works for them.
          </li>
          <li>
            <strong>Proof of delivery.</strong> Timestamp, rider notes, and delivery
            confirmation. Essential for disputes.
          </li>
          <li>
            <strong>WhatsApp-native communication.</strong> Accra runs on WhatsApp. A
            delivery partner who communicates by email or app-only creates friction.
          </li>
        </ul>

        <h2>What a good delivery workflow looks like</h2>
        <p>
          This is what a well-run delivery process looks like for an Instagram seller doing
          ten to twenty orders per week in Accra:
        </p>
        <ol>
          <li>Order comes in through DMs. You confirm stock and get the customer&apos;s address.</li>
          <li>You book a pickup via WhatsApp or app, entering your address, the customer&apos;s address, and parcel notes (fragile, COD amount, etc.).</li>
          <li>Rider is confirmed within minutes. You see their ETA.</li>
          <li>You pack while the rider is en route. Rider collects, takes the parcel.</li>
          <li>Customer gets a tracking link automatically. They watch the delivery in real time.</li>
          <li>Delivery confirmed. You get proof. COD amount reconciled to your MoMo.</li>
          <li>You go back to selling instead of managing logistics.</li>
        </ol>
        <p>
          That seven-step flow should feel close to invisible once it is running. If your
          current delivery process feels heavier than that, a good partner can fix it.
        </p>

        <h2>Common questions from Instagram sellers</h2>

        <p>
          <strong>What is cash-on-delivery in Ghana?</strong><br />
          COD means your customer pays the delivery rider in cash at the door. A good service
          reconciles the collected cash and transfers it to your Mobile Money account the same day.
        </p>

        <p>
          <strong>How fast is same-day delivery in Accra?</strong><br />
          With a dispatch-optimised service, a rider is at your door within 2 to 3 hours of
          booking. Most Greater Accra deliveries complete within 3 to 5 hours of pickup.
        </p>

        <p>
          <strong>Can I schedule batch pickups as an Instagram seller?</strong><br />
          Yes. Batch pickup means one rider collects all your orders at a single time you
          choose. More efficient than booking individual deliveries per sale, and usually
          available from any dedicated delivery service in Accra.
        </p>

        <h2>Getting started</h2>
        <p>
          Mckot is built for this use case. Same-day delivery across Greater Accra,
          cash-on-delivery with Mobile Money reconciliation, tracking links for every
          delivery, and a WhatsApp-native booking process. Founding vendors get their first
          3 deliveries free in the first 30 days. No subscription, no commitment.
        </p>
        <p>
          <a href={WA_INSTAGRAM} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          with your first order and a rider will be dispatched to you today. Or{" "}
          <Link href="/vendors">read how the vendor onboarding works</Link> before you
          commit.
        </p>
      </ArticleLayout>
    </>
  );
}
