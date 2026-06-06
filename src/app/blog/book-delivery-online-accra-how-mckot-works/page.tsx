import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "book-delivery-online-accra-how-mckot-works",
  title: "Book Delivery Online in Accra: How Mckot Works",
  excerpt:
    "You no longer need WhatsApp to send something across Accra. Here is exactly how booking a delivery online with Mckot works, step by step.",
  category: "Product",
  readTime: "5 min read",
  date: "2026-06-06",
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
        name: "Can I book a delivery online in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. With Mckot you can book a delivery directly on the website or in the app: enter your pickup and drop-off, see the price, confirm, and track the rider live. WhatsApp is still there if you prefer to type it out.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to download an app to book a Mckot delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You can book online on the website without downloading anything. The Mckot app on Google Play and the App Store adds saved places and faster repeat booking, but it is optional.",
        },
      },
      {
        "@type": "Question",
        name: "How do I pay for an online delivery booking in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can pay by Mobile Money when you book, or let the recipient pay the rider in cash on delivery. Cash-on-delivery is built into the flow.",
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
            heading="Book your first delivery"
            subheading="Online in under a minute, or on the app, or on WhatsApp. Whatever suits you."
            waMessage="Hi Mckot, I'd like to book a delivery online in Accra."
          />
        }
      >
        <p>
          For a long time, booking a delivery in Accra meant one thing: message
          someone on WhatsApp and hope. We still love WhatsApp, and you can still
          use it. But you no longer have to. You can book a delivery online with
          Mckot in under a minute, see the price up front, and watch the rider the
          whole way. Here is exactly how it works.
        </p>

        <h2>Step 1: Open the booking page</h2>
        <p>
          Go to the Mckot site and start a booking. You do not need to download
          anything to send your first package. If you would rather book from your
          phone with your saved places ready, the Mckot app is on Google Play and
          the App Store, but it is optional.
        </p>

        <h2>Step 2: Enter pickup and drop-off</h2>
        <p>
          Type where the package is now and where it is going. Add the recipient&rsquo;s
          name and number so the rider can reach them at the door. You can also add
          a note about what you are sending so it is handled correctly.
        </p>

        <h2>Step 3: See the price before you confirm</h2>
        <p>
          Mckot shows you the price based on the distance and zones before you
          commit. No haggling, no surprise at the end. Within-zone runs start at
          GHS 35. If you want to understand how the rates are built, I explain it
          in <a href="/blog/same-day-delivery-accra-prices">same-day delivery prices in Accra</a>.
        </p>

        <h2>Step 4: Confirm and track</h2>
        <p>
          Confirm the booking and a rider is dispatched. From there you follow the
          rider on the map from pickup to drop-off. No calling around to ask where
          your package is, because you can see it.
        </p>

        <h2>Step 5: Pay the way that suits you</h2>
        <p>
          Pay by Mobile Money when you book, or let the person receiving the item
          pay the rider in cash on delivery. Cash-on-delivery is built into the
          flow, which is what makes it work so well for businesses selling to
          customers across the city.
        </p>

        <h2>Three ways, one network</h2>
        <p>
          Online, app, or WhatsApp, they all reach the same riders and the same
          coverage across Greater Accra. Booking online just gives you the price up
          front and live tracking without typing out a message. Sending for
          yourself? See <a href="/for/individuals">personal delivery</a>. Running a
          business? Start with <a href="/services/business-delivery">business delivery</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
