import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "how-to-send-a-package-accra-same-day",
  title: "How to Send a Package Anywhere in Accra the Same Day",
  excerpt:
    "A simple, practical walkthrough of getting a package across Greater Accra today: what to have ready, what it costs, and the three ways to book.",
  category: "How-to",
  readTime: "6 min read",
  date: "2026-06-02",
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
        name: "How can I send a package across Accra today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a rider on the Mckot website or app, or send your pickup and drop-off addresses on WhatsApp. A rider collects from your location and delivers the same day, usually within one to three hours for a within-zone run.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to send a package in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sending a package starts at GHS 35 within one zone, around GHS 50 across adjacent zones, and GHS 60 on the Tema corridor. You see the price before you confirm the booking.",
        },
      },
      {
        "@type": "Question",
        name: "Can the person receiving the package pay for it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Cash-on-delivery is built in. The recipient can pay the rider in cash, or you can pay by Mobile Money when you book.",
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
            heading="Send your package today"
            subheading="Three ways to book, all reaching the same riders. Pick whichever is easiest right now."
            waMessage="Hi Mckot, I want to send a package across Accra today."
          />
        }
      >
        <p>
          I started Mckot because sending something across Accra used to mean
          calling three riders, haggling on price, and then having no idea where
          your package was until it either showed up or did not. It should be
          simpler than that. Here is exactly how to get a package anywhere in
          Greater Accra the same day, with none of the guesswork.
        </p>

        <h2>Before you book: have these three things ready</h2>
        <p>
          A delivery moves faster when the details are clear from the start. Have
          these ready and the rider can be on the road in minutes:
        </p>
        <ul>
          <li><strong>The pickup address.</strong> Where the package is now, with a landmark if the location is hard to find.</li>
          <li><strong>The drop-off address.</strong> Where it is going, plus the recipient&rsquo;s name and phone number.</li>
          <li><strong>What is inside.</strong> A short description so we match the right rider and handle it correctly.</li>
        </ul>
        <p>
          That is it. No forms, no account setup required to get your first
          package moving.
        </p>

        <h2>The three ways to book Mckot</h2>
        <p>
          You can send a package whichever way suits you in the moment. All three
          reach the same riders and the same coverage.
        </p>
        <ul>
          <li><strong>On the website.</strong> Open the booking page, enter pickup and drop-off, and confirm. You see the price and can watch the rider on the map.</li>
          <li><strong>In the Mckot app.</strong> Same flow on your phone, with your saved places ready to go. Available on Google Play and the App Store.</li>
          <li><strong>On WhatsApp.</strong> Message us the two addresses and what you are sending. Good for when you are busy and just want to type it out.</li>
        </ul>

        <h2>What it costs and how fast it arrives</h2>
        <p>
          Pricing in Accra follows a zone model. A package that stays inside one
          zone is the base rate. Crossing into another zone costs a little more
          because the rider travels further.
        </p>
        <ul>
          <li>Within one zone (for example East Legon to East Legon): from GHS 35</li>
          <li>Across adjacent zones (for example Osu to Spintex): around GHS 50</li>
          <li>Tema corridor (Tema to central Accra): GHS 60</li>
        </ul>
        <p>
          Most within-zone runs are done within one to three hours. Book earlier
          in the day for the fastest turnaround, especially if your route crosses
          the city during peak traffic. For the full picture, I broke down{" "}
          <a href="/blog/same-day-delivery-accra-prices">same-day delivery prices in Accra</a>{" "}
          in a separate guide.
        </p>

        <h2>A few habits that make it smooth</h2>
        <p>
          After thousands of deliveries, the runs that go perfectly almost always
          share the same small habits:
        </p>
        <ul>
          <li>Package the item properly. A padded envelope or a taped box survives a motorbike trip far better than a loose bag.</li>
          <li>Share the recipient&rsquo;s number. The rider can call when they are close instead of circling a neighbourhood.</li>
          <li>Decide who pays before the rider arrives. If the recipient is paying cash on delivery, tell them the amount in advance.</li>
        </ul>

        <h2>Sending often, not just once?</h2>
        <p>
          If you are sending for yourself, the{" "}
          <a href="/for/individuals">personal delivery page</a> walks through the
          everyday sends people use Mckot for. If you are sending for a shop or
          office, look at <a href="/services/parcel-delivery">parcel delivery</a>{" "}
          and <a href="/services/business-delivery">business delivery</a>, where
          cash-on-delivery and batch runs are built in.
        </p>
        <p>
          However you book, the promise is the same: one rider, one trip, tracked
          from your door to theirs. That is the whole point of Mckot.
        </p>
      </ArticleLayout>
    </>
  );
}
