import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_COD = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I need COD handled for my online orders. Claim my 3 free deliveries.")}`;

const article = {
  slug: "cod-delivery-ghana-online-sellers",
  title: "Cash-on-Delivery in Ghana: The Seller's Complete Guide",
  excerpt:
    "Why Ghanaian buyers prefer COD, how to handle it without losing money, and what a proper COD workflow looks like for social commerce vendors.",
  category: "For sellers",
  readTime: "8 min read",
  date: "2026-05-15",
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
        name: "What is cash-on-delivery (COD) in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cash-on-delivery in Ghana means the customer pays the delivery rider in cash when the package arrives at their door. The seller never handles the cash directly. The delivery service collects, reconciles, and transfers the amount to the seller via Mobile Money, typically on the same day.",
        },
      },
      {
        "@type": "Question",
        name: "How do delivery services handle COD reconciliation in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A well-run COD process works like this: the rider collects cash at the customer's door, logs the amount, and it is reconciled against the seller's expected amount at the end of the day. The net amount (after any delivery fee deductions if applicable) is transferred via MTN MoMo or Vodafone Cash to the seller's registered number.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if a customer refuses a COD delivery in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If a customer refuses a delivery, the package is returned to the seller. The delivery fee is still charged in most cases, since the rider completed the trip. To reduce refusals, confirm the customer's availability and delivery window before dispatch, and send a delivery notification so they are expecting the rider.",
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
          Cash-on-delivery is not a gap in the payment system that Ghana needs to grow out
          of. It is a rational response to a real problem. Buyers in Ghana have been scammed
          by prepayment. They have sent money and received nothing. COD removes the trust
          problem from the equation: the customer sees the item before they pay. That is
          a feature, not a legacy habit.
        </p>
        <p>
          For sellers, COD means absorbing the operational complexity that the customer
          refuses to take on. This guide explains how to run COD without losing money,
          what a proper reconciliation process looks like, and how to protect yourself
          when a delivery goes wrong.
        </p>

        <h2>Why Ghanaian buyers still prefer COD</h2>
        <p>
          Mobile Money penetration in Ghana is high. Nearly every adult has an MTN MoMo
          or Vodafone Cash account. The barrier is not access to digital payment. It is trust.
        </p>
        <p>
          Online scams in Ghana have followed a consistent pattern: a buyer pays upfront,
          the seller goes quiet, and the money is gone. Instagram and WhatsApp commerce
          have made this worse because accounts are easy to create and disappear. COD
          breaks the pattern because money only changes hands when the product arrives.
        </p>
        <p>
          <em>When I started talking to vendors about their biggest operational challenge,
          COD came up in nearly every conversation. Not because they hated offering it.
          Because they did not have a reliable way to do it. The informal system, where you
          trust the rider to hand over cash at the end of the day, works until it does not.</em>
        </p>

        <h2>The COD workflow that actually works</h2>
        <p>
          A functional COD process has five steps. If any of these is missing, the system
          breaks down.
        </p>
        <ol>
          <li>
            <strong>Seller confirms the order and COD amount.</strong> Before dispatch, you
            confirm the item, the amount to collect, and whether the customer expects change.
            Round amounts reduce friction at the door.
          </li>
          <li>
            <strong>Rider is briefed before pickup.</strong> The rider knows the COD amount
            before they arrive at your location. No surprises on the route.
          </li>
          <li>
            <strong>Rider collects at the door and records.</strong> When the customer pays,
            the rider logs the amount collected. This record is the basis for reconciliation.
          </li>
          <li>
            <strong>Reconciliation happens same day.</strong> At end of day, all collections
            are matched against expected amounts. Discrepancies are flagged and resolved
            before settlement.
          </li>
          <li>
            <strong>Settlement to Mobile Money.</strong> The net amount hits your MTN MoMo
            or Vodafone Cash account the same evening. You can verify in your MoMo
            statement.
          </li>
        </ol>

        <h2>What can go wrong with COD, and how to protect yourself</h2>

        <h3>Customer refusals</h3>
        <p>
          A customer who refuses to accept the delivery is the most common COD problem. You
          lose the delivery fee, the rider time, and you still have the item.
        </p>
        <p>
          How to reduce refusals:
        </p>
        <ul>
          <li>Confirm the order verbally with the customer before dispatching. &ldquo;Your order is on the way. Can you confirm your address and that you will be available between 2 PM and 5 PM?&rdquo;</li>
          <li>Send a message when the rider is dispatched. Buyers who are expecting a delivery are less likely to refuse.</li>
          <li>Collect a small deposit (GHS 5 to 20) upfront via MoMo for high-value orders. This filters out buyers who are not serious.</li>
        </ul>

        <h3>Informal cash handling</h3>
        <p>
          If you are working with an individual rider rather than a service, cash handling
          is a verbal agreement. Most riders are honest. Some float the money for days. Some
          take fees you did not agree to. A delivery service with a formal reconciliation
          process removes this risk.
        </p>

        <h3>Change and rounding</h3>
        <p>
          If your item costs GHS 78 and the buyer hands over GHS 100, the rider needs to
          carry GHS 22 in change. Set prices in round numbers where possible, or instruct
          buyers in advance to have exact change. Brief your delivery service on your
          change handling policy before the first delivery.
        </p>

        <h2>COD and your cash flow</h2>
        <p>
          COD adds a lag between the delivery and the cash in your account. If you are
          paying for items upfront and offering COD, you are floating the cost of goods
          until settlement. For most vendors doing 5 to 20 orders per day, this is
          manageable. For high-volume vendors, it means you need working capital to cover
          two to three days of orders in transit.
        </p>
        <p>
          Same-day COD settlement, which Mckot offers, minimises this lag. If deliveries
          complete before 8 PM, you should have your Mobile Money settlement before you
          sleep.
        </p>

        <h2>Common questions about COD in Ghana</h2>

        <p>
          <strong>What is cash-on-delivery in Ghana?</strong><br />
          COD means the customer pays the rider in cash at the door. A proper service
          reconciles the cash and sends it to your Mobile Money the same day. The seller
          never handles the cash directly.
        </p>

        <p>
          <strong>How does COD reconciliation work in Ghana?</strong><br />
          The rider logs the amount collected at each stop. At end of day, the service
          matches collections against expected amounts, resolves any discrepancies, and
          transfers the net amount via MTN MoMo or Vodafone Cash to the seller.
        </p>

        <p>
          <strong>What happens if a customer refuses a COD delivery?</strong><br />
          The package is returned to the seller. The delivery fee is charged in most cases.
          To reduce refusals, confirm the customer is available before dispatch and send a
          heads-up message when the rider is en route.
        </p>

        <h2>Setting up COD with Mckot</h2>
        <p>
          Every Mckot delivery includes COD handling with same-day MoMo settlement. There
          is no separate fee for COD. You tell us the amount to collect when you book the
          delivery. We collect, reconcile, and send it to you the same evening.
        </p>
        <p>
          New vendors get 3 free deliveries including COD. No commitment.{" "}
          <a href={WA_COD} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          to get started.
        </p>
      </ArticleLayout>
    </>
  );
}
