import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_TIKTOK = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I sell on TikTok and I'd like to claim my 3 free deliveries.")}`;

const article = {
  slug: "how-to-deliver-tiktok-orders-ghana",
  title: "How TikTok Sellers in Ghana Handle Delivery",
  excerpt:
    "TikTok sellers in Ghana are converting live viewers into paying customers. Here is how the most successful ones handle the logistics after the sale.",
  category: "For sellers",
  readTime: "6 min read",
  date: "2026-05-18",
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
        name: "How do TikTok sellers in Ghana manage delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most TikTok sellers in Ghana take orders via DMs or a link in bio, then coordinate delivery through a third-party service. The most common workflow is: confirm the order via DM, get the delivery address, send the details to a delivery service via WhatsApp, and share the tracking link with the buyer once the rider is dispatched.",
        },
      },
      {
        "@type": "Question",
        name: "Can I do cash-on-delivery for TikTok orders in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A delivery service with COD handling collects cash from your customer at the door and reconciles it to your Mobile Money account the same day. This is the standard payment model for TikTok commerce in Ghana, where most buyers will not pay upfront.",
        },
      },
      {
        "@type": "Question",
        name: "How do I handle multiple orders from one TikTok video in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For order spikes after a viral video, batch pickup is the most efficient approach. You compile all orders with delivery addresses, send the full list to your delivery service, and they sequence the runs. Some services offer same-day batch processing for lists sent before noon.",
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
          TikTok commerce in Ghana is real and growing. Vendors are filming from their
          homes, going live in the evenings, and converting viewers into buyers through
          DMs. The content side works. The delivery side is where most of them hit the wall.
        </p>
        <p>
          The challenge is not that delivery does not exist in Accra. It is that TikTok
          creates orders in bursts. A video goes up at 7 PM. By 9 PM there are thirty DMs
          asking for the same item. By 10 PM, half of them want to know about delivery.
          Whatever logistics system you have needs to handle that surge or you lose the
          orders.
        </p>

        <h2>The TikTok order pattern in Ghana</h2>
        <p>
          TikTok orders in Ghana arrive in three patterns:
        </p>
        <ul>
          <li><strong>Live sale orders.</strong> You go live, you sell in real time, orders come in during the broadcast. High urgency. Buyers expect to hear from you fast.</li>
          <li><strong>Post-video DMs.</strong> A video goes up, it gets traction, DMs pile in over the next few hours. Lower urgency but higher volume.</li>
          <li><strong>Link-in-bio form submissions.</strong> Buyers who find you through a saved video and submit through a Google form, Typeform, or similar. Slower, more deliberate buyers.</li>
        </ul>
        <p>
          Each pattern needs a slightly different logistics response. Live sale orders need
          same-day dispatch. Post-video DMs can be batched and sent out the next morning.
          Form submissions can be scheduled.
        </p>

        <h2>The standard TikTok seller delivery workflow in Ghana</h2>
        <ol>
          <li><strong>Order confirmed via DM.</strong> You confirm the item, get the delivery address, and confirm whether the buyer wants COD or prepaid. In Ghana, most want COD.</li>
          <li><strong>Address logged.</strong> Add the order to a WhatsApp message or shared doc: customer name, phone, address, item, COD amount if applicable.</li>
          <li><strong>Batch sent to delivery service.</strong> Before noon, send the list to your delivery service via WhatsApp. A good service acknowledges, assigns riders, and confirms pickup time.</li>
          <li><strong>Rider dispatches to you.</strong> Rider picks up all items in one trip from your location.</li>
          <li><strong>Deliveries run.</strong> Rider delivers to each address. Customer pays cash if COD. Rider logs each delivery.</li>
          <li><strong>Proof and settlement.</strong> You receive delivery confirmations per order. COD amounts reconcile to your MoMo by evening.</li>
          <li><strong>Post to your TikTok stories.</strong> Screenshot or video of packed orders going out. This is content. It builds trust with future buyers.</li>
        </ol>
        <p>
          <em>The sellers I have seen build real volume on TikTok are not just good at content.
          They are good at operations. The delivery process is part of the content. Showing
          orders going out builds the social proof that converts the next viewer.</em>
        </p>

        <h2>Handling the surge: when a video goes viral</h2>
        <p>
          TikTok can generate thirty orders from a single video. That is great news for your
          business and a logistics problem you need to have planned for in advance.
        </p>
        <p>
          What to do when you get a spike:
        </p>
        <ul>
          <li>Stop taking orders once you know your stock count. Do not oversell. A failed delivery is worse than a missed sale.</li>
          <li>Compile all addresses before you message the delivery service. One complete list is easier to dispatch than thirty individual messages.</li>
          <li>Set a delivery expectation with your buyers. &ldquo;All orders from today&apos;s video ship tomorrow before 2 PM.&rdquo; This reduces the follow-up DMs.</li>
          <li>Make sure your delivery service knows spikes happen. If you are a regular vendor, ask whether they can handle batch lists of 20-plus on short notice.</li>
        </ul>

        <h2>Why COD is non-negotiable for TikTok commerce in Ghana</h2>
        <p>
          TikTok buyers in Ghana have a lower trust baseline than buyers from a brand&apos;s
          own website. They found you through an algorithm, not a search or a referral. That
          means fewer of them will pay upfront than buyers who sought you out deliberately.
        </p>
        <p>
          Offering COD removes the trust barrier and converts buyers who would otherwise
          DM you ten questions and never purchase. The operational cost of COD, when handled
          by a delivery service, is minimal. The revenue cost of not offering it is not.
        </p>

        <h2>Common questions from TikTok sellers in Ghana</h2>

        <p>
          <strong>How do TikTok sellers in Ghana manage delivery?</strong><br />
          Most use a third-party delivery service. Orders are confirmed via DM, compiled into
          a list, and sent to the service via WhatsApp. Riders pick up in a batch and deliver
          across Accra the same day. COD is collected at the door and settled via Mobile Money.
        </p>

        <p>
          <strong>Can I do cash-on-delivery for TikTok orders in Ghana?</strong><br />
          Yes. A delivery service with COD handling collects cash at the door and reconciles
          it to your Mobile Money account the same day. This is how most TikTok orders in
          Ghana are paid.
        </p>

        <p>
          <strong>How do I handle multiple orders from one TikTok video?</strong><br />
          Compile all addresses into one list and send it to your delivery service before
          noon. They sequence the runs. The most efficient approach is one batch pickup from
          your location, with the rider handling all drops in the same run.
        </p>

        <h2>Getting started</h2>
        <p>
          Mckot handles TikTok orders across Greater Accra. Same-day pickup, COD collection,
          and delivery confirmation you can screenshot and post. New vendors get 3 free
          deliveries to test the workflow before committing.
        </p>
        <p>
          <a href={WA_TIKTOK} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          with your next order and we will dispatch today.
        </p>
      </ArticleLayout>
    </>
  );
}
