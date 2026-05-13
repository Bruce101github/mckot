import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_DISPATCH = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I need a dispatch rider in Accra. Can I claim my 3 free deliveries?")}`;

const article = {
  slug: "dispatch-rider-accra-guide",
  title: "How to Book a Dispatch Rider in Accra (Without the Stress)",
  excerpt:
    "A practical walkthrough for vendors who are tired of chasing riders by phone. What to look for, what to avoid, and how the booking process actually works.",
  category: "How-to",
  readTime: "6 min read",
  date: "2026-05-08",
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
        name: "How much does a dispatch rider cost in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Within-zone same-day delivery in Accra starts from GHS 35 with a dedicated delivery service like Mckot. Cross-zone runs (e.g. Osu to Spintex) cost GHS 50. Tema corridor deliveries are GHS 60. Individual freelance riders may quote differently based on distance and negotiation.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a dispatch rider and a delivery service in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A dispatch rider is typically an individual freelancer you book directly, often through WhatsApp or a referral. A delivery service is a company that manages a fleet of riders, provides tracking, handles COD reconciliation, and offers a consistent booking experience. For vendors doing regular deliveries, a service is more reliable than an individual rider.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find a reliable dispatch rider in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Options include booking through a dedicated delivery service (Mckot, ShaQ Express), joining vendor WhatsApp groups where riders are recommended, or using aggregator platforms like Deliveries Ghana. Dedicated services are more consistent than individual riders for regular volume.",
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
          The standard way to get a dispatch rider in Accra in 2026 is still a WhatsApp
          message to someone you met through a friend, who might be available or might not,
          and who will give you a price that depends on the day, the traffic, and his mood.
          Vendors who rely on this system are building businesses on a foundation that can
          collapse any Monday morning.
        </p>
        <p>
          This guide explains how to move off that system, what your actual options are, and
          what to tell any dispatch service before you hand over your first package.
        </p>

        <h2>Individual rider vs. delivery service: which one to use</h2>
        <p>
          Most vendors in Accra start with an individual dispatch rider. It feels cheaper,
          more personal, and you know the person. Here is what that model actually costs you
          over time:
        </p>
        <ul>
          <li>Your rider gets sick, has a funeral, or just goes quiet. You have no backup and your orders are stuck.</li>
          <li>There is no tracking. Your customer messages you. You message the rider. The rider responds two hours later.</li>
          <li>COD is informal. You trust the rider to hand over the cash. Most do. Some do not, at least not immediately.</li>
          <li>Batch scheduling is a negotiation. The rider shows up when it works for him.</li>
        </ul>
        <p>
          A delivery service solves all of these at a cost that is not significantly higher
          than what a reliable individual rider charges. The difference is that the service
          has a dispatch system, multiple riders, and accountability built in.
        </p>
        <p>
          <em>Every vendor I have onboarded at Mckot has a rider story. A package that went
          missing. A rider who disappeared mid-route. An informal COD arrangement that took
          three days to settle. These are not edge cases. They are what happens when you
          run volume through an informal system.</em>
        </p>

        <h2>How to book a dispatch rider in Accra: step by step</h2>

        <h3>Option 1: Through a delivery service (recommended for regular volume)</h3>
        <ol>
          <li><strong>Pick a service with COD handling.</strong> If your customers pay cash, you need a service that collects and reconciles, not just delivers.</li>
          <li><strong>Confirm coverage.</strong> Not every service covers every Accra zone. Confirm your pickup and drop-off areas before you commit.</li>
          <li><strong>Send the booking details.</strong> For each delivery: customer name, address, item description, whether it is COD, and the amount to collect.</li>
          <li><strong>Get pickup confirmation.</strong> A good service confirms rider assignment before pickup, not after.</li>
          <li><strong>Track and confirm.</strong> Your customer should get a tracking link. You should get a delivery confirmation with timestamp.</li>
        </ol>

        <h3>Option 2: Freelance rider via WhatsApp groups</h3>
        <p>
          Join vendor groups on WhatsApp relevant to your industry. Vendors share rider
          contacts they have tested. Ask for riders who have delivered for people in your
          volume range. Get at least two contacts so you have a backup.
        </p>
        <p>
          Before handing over your first package, confirm: does the rider cover your zone,
          what is their rate, do they handle COD, and how do they confirm delivery?
        </p>

        <h3>Option 3: Aggregator platforms</h3>
        <p>
          Deliveries Ghana and similar platforms list available riders. Good for one-off
          deliveries or areas where no dedicated service operates. Quality varies widely and
          you will get a different rider each time.
        </p>

        <h2>What to tell any dispatch service before you book</h2>
        <p>
          Every delivery needs these details:
        </p>
        <ul>
          <li><strong>Pickup address.</strong> As specific as possible: neighborhood, street, landmarks. Vague addresses slow dispatch.</li>
          <li><strong>Customer name and phone number.</strong> The rider needs to call on arrival if the customer is not visible.</li>
          <li><strong>Delivery address.</strong> Neighborhood, street, landmarks, apartment number if applicable.</li>
          <li><strong>Item description.</strong> Brief. Fragile items need to be flagged so the rider handles carefully.</li>
          <li><strong>COD amount.</strong> Exact amount the rider should collect. Round numbers are easier. Confirm change handling in advance.</li>
          <li><strong>Preferred pickup window.</strong> A specific time, not &ldquo;whenever.&rdquo;</li>
        </ul>

        <h2>Red flags to watch for</h2>
        <ul>
          <li>No pickup confirmation before dispatch. If they cannot tell you a rider is assigned before you pack, they are winging it.</li>
          <li>No tracking link for your customer. This means your inbox will fill with &ldquo;where is my order&rdquo; messages.</li>
          <li>COD settlement in days, not same day. Cash collected on Monday should hit your MoMo by end of day Monday.</li>
          <li>No delivery proof. A timestamp and confirmation photo are standard. If there is nothing to show the customer, you have no evidence when a dispute comes up.</li>
          <li>Price quoted but never confirmed in writing. A WhatsApp confirmation is enough. Nothing in writing means the price can change after delivery.</li>
        </ul>

        <h2>Common questions about dispatch riders in Accra</h2>

        <p>
          <strong>How much does a dispatch rider cost in Accra?</strong><br />
          Same-day within-zone delivery starts from GHS 35 through a service like Mckot. Cross-zone
          runs are GHS 50 and Tema corridor is GHS 60. Individual riders vary by negotiation.
          What you save on the rate you often spend on follow-up and unreliability.
        </p>

        <p>
          <strong>What is the difference between a dispatch rider and a delivery service?</strong><br />
          A dispatch rider is an individual you book directly. A delivery service manages
          multiple riders, provides tracking, handles COD reconciliation, and has backup
          when one rider is unavailable. For regular volume, a service is more reliable.
        </p>

        <p>
          <strong>How do I find a reliable dispatch rider in Accra?</strong><br />
          Through a dedicated delivery service, vendor WhatsApp groups with referrals, or
          aggregator platforms. Dedicated services are the most consistent for regular
          deliveries. Individual riders work for occasional or one-off runs.
        </p>

        <h2>Getting started without the risk</h2>
        <p>
          Mckot offers 3 free deliveries to new vendors. That is enough to test the booking
          process, the COD reconciliation, and whether the tracking links work for your
          customers before you commit to any volume.
        </p>
        <p>
          <a href={WA_DISPATCH} target="_blank" rel="noopener noreferrer">
            Send us your first order on WhatsApp
          </a>{" "}
          and we will have a rider dispatched to you today.
        </p>
      </ArticleLayout>
    </>
  );
}
