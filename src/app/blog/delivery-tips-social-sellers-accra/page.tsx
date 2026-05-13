import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_TIPS = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I want to improve my delivery setup. Claim my 3 free deliveries.")}`;

const article = {
  slug: "delivery-tips-social-sellers-accra",
  title: "8 Delivery Habits That Separate Top Accra Sellers from the Rest",
  excerpt:
    "The logistics habits that reduce complaints, speed up repeat purchases, and build the kind of brand trust that makes customers tag you in their Stories.",
  category: "Tips",
  readTime: "5 min read",
  date: "2026-05-22",
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
        name: "How can I reduce delivery complaints as an online seller in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most effective way to reduce delivery complaints is to send customers a tracking link and a heads-up message when their rider is dispatched. Most complaints come from customers who do not know when to expect the delivery, not from actual late deliveries.",
        },
      },
      {
        "@type": "Question",
        name: "What information should I give my delivery service for each order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For each delivery, provide: customer name, phone number, delivery address with landmarks, item description, whether it is cash-on-delivery, and the COD amount if applicable. Adding a landmark (near a church, next to Shoprite) significantly speeds up rider arrival in Accra where street addressing is inconsistent.",
        },
      },
      {
        "@type": "Question",
        name: "How do I handle COD refusals as an online seller?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To reduce COD refusals: confirm the order verbally with the customer before dispatch, send a message when the rider is on the way, and for high-value items, collect a small deposit upfront. If a refusal happens, update your records and avoid dispatching to that address again without prepayment.",
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
          The difference between an Accra online seller doing 5 orders per week and one
          doing 50 is rarely the content or the product. It is almost always the operations.
          Specifically, the delivery habits that make customers feel taken care of before,
          during, and after their order arrives.
        </p>
        <p>
          These are the eight habits I have seen separate top-performing vendors from
          everyone else.
        </p>

        <h2>1. Confirm the order before you dispatch</h2>
        <p>
          Before you hand anything to a rider, send the customer a message: &ldquo;Your order is
          packed and a rider will be at your door today between 2 PM and 5 PM. Please confirm
          your address: [address].&rdquo; This single step reduces failed deliveries by more than
          half. Customers who receive a confirmation message are there when the rider arrives.
          Customers who do not receive one are at work, asleep, or in Tema when their rider
          rings the doorbell in East Legon.
        </p>

        <h2>2. Send a tracking link the moment the rider picks up</h2>
        <p>
          The volume of &ldquo;where is my order?&rdquo; messages you receive is inversely proportional
          to the quality of your tracking communication. Send a tracking link or a short
          message (&ldquo;Your rider picked up at 1:45 PM and is on the way. ETA 3 PM&rdquo;) the
          moment your rider collects. Your inbox will be significantly quieter.
        </p>

        <h2>3. Use landmarks in every delivery address</h2>
        <p>
          Street addressing in Accra is unreliable. Many residential areas do not have
          numbered streets. Riders navigate by landmarks: near the Total station, opposite
          the church, next to the ATM. When you collect a delivery address, always ask:
          &ldquo;What is the nearest landmark?&rdquo; Add it to the delivery notes when you book. This
          alone cuts rider call time on every delivery.
        </p>

        <h2>4. Pack before the rider arrives, not after</h2>
        <p>
          Riders lose time waiting at pickup while sellers pack. That time compounds across
          every delivery in their run. Pack the order before you message your delivery
          service, not after they confirm. When the rider arrives, the package is ready.
          This keeps riders on schedule and improves your relationship with the service.
        </p>

        <h2>5. Use round numbers for COD amounts</h2>
        <p>
          If your item costs GHS 73, either round to GHS 75 or tell the buyer in advance
          to have GHS 80 ready. Change management is one of the most common causes of
          friction at the door. The rider may not carry change for every delivery. Set
          prices in round numbers or add a note to your delivery service about change
          handling for specific orders.
        </p>

        <h2>6. Batch your orders instead of booking individually</h2>
        <p>
          If you have five orders going out today, send all five to your delivery service
          at once rather than booking one by one. Most services can send a single rider
          to collect all five packages from your location in one pickup. You save on
          delivery fees, the rider time is more efficient, and your orders all move the
          same day instead of staggered across the afternoon.
        </p>

        <h2>7. Keep a delivery log for disputes</h2>
        <p>
          When a customer claims they never received a delivery, you need evidence. A good
          delivery service provides a delivery confirmation with timestamp. Keep these. A
          simple spreadsheet with order date, customer name, delivery date, and
          confirmation reference is enough to resolve most disputes quickly. Without it,
          you are arguing from memory against a customer who has everything to gain from
          the dispute.
        </p>

        <h2>8. Share proof of delivery as content</h2>
        <p>
          The best social sellers in Accra treat their delivery process as part of their
          brand. Screenshot the packed orders going out. Post a story of the rider picking
          up. Share the delivery confirmation when it arrives. This builds the kind of
          social proof that new customers cannot manufacture: evidence that real people
          are buying from you and receiving what they ordered. It is the most honest
          marketing you can do.
        </p>

        <h2>Common questions from social sellers about delivery</h2>

        <p>
          <strong>How can I reduce delivery complaints as an online seller in Accra?</strong><br />
          Send a tracking link and a heads-up message when the rider is dispatched. Most
          complaints come from customers who do not know when to expect the delivery,
          not from actual late arrivals.
        </p>

        <p>
          <strong>What information should I give my delivery service per order?</strong><br />
          Customer name, phone number, delivery address with landmarks, item description,
          COD or prepaid, and the exact amount to collect if COD. Landmarks are especially
          important in Accra where street numbers are inconsistent.
        </p>

        <p>
          <strong>How do I handle COD refusals?</strong><br />
          Confirm the order before dispatch, send a heads-up when the rider is en route,
          and for high-value orders collect a small deposit upfront. If a refusal happens,
          note the address and require prepayment from that customer going forward.
        </p>

        <h2>Build it into the system, not into your head</h2>
        <p>
          None of these habits are complicated. The ones who do them consistently are not
          more disciplined than other sellers. They have built systems: a confirmation
          message template, a batch log, a packing checklist. The habit lives in the
          system, not in the memory.
        </p>
        <p>
          If you want a delivery partner that makes some of these habits automatic, try
          Mckot.{" "}
          <a href={WA_TIPS} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          and we will get your first 3 deliveries moving today.
        </p>
      </ArticleLayout>
    </>
  );
}
