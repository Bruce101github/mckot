import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "sending-documents-across-accra-guide",
  title: "Sending Documents Across Accra: A Guide",
  excerpt:
    "Contracts, IDs, cheques, and legal papers move differently from parcels. Here is how to send documents across Accra quickly, safely, and with a record.",
  category: "How-to",
  readTime: "5 min read",
  date: "2026-06-04",
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
        name: "How do I send documents across Accra the same day?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a rider on the Mckot site or app, or send the pickup and drop-off addresses on WhatsApp. A rider collects from your office and delivers straight to the recipient, usually within a few hours.",
        },
      },
      {
        "@type": "Question",
        name: "Is it safe to send legal or sensitive documents by courier in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, when the courier handles documents in protective packaging and gives you proof of delivery. With Mckot you get confirmation showing when and where the document arrived, so there is a clear record.",
        },
      },
      {
        "@type": "Question",
        name: "How much does document delivery cost in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Document delivery starts at GHS 35 within a zone, around GHS 50 across zones, and GHS 60 on the Tema corridor. Documents are light, so they fall into the standard rate.",
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
            heading="Send a document today"
            subheading="Office to office, same day, with proof of delivery. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I need to send documents across Accra today."
          />
        }
      >
        <p>
          A document is not like a parcel. A box of clothes can wait an hour. A
          signed contract that has to be filed before an office closes cannot. Over
          the years I have learned that document delivery is really about two
          things: speed and certainty. Here is how to get both when you send papers
          across Accra.
        </p>

        <h2>What counts as a document delivery</h2>
        <p>
          People use Mckot for documents far more than they expect to. The common
          ones:
        </p>
        <ul>
          <li>Signed contracts and agreements</li>
          <li>Legal documents and court filings</li>
          <li>Cheques and bank paperwork</li>
          <li>ID cards, passports, and certificates</li>
          <li>Tender and bid submissions with a deadline</li>
          <li>Internal mail moving between branches</li>
        </ul>

        <h2>Get it there fast</h2>
        <p>
          The single biggest factor is when you book. A document booked in the
          morning has the whole day to clear traffic and reach its destination. If
          there is a hard deadline, say a tender that closes at a set time, book
          with a buffer. Accra traffic is the one thing no courier fully controls,
          so give the run room to breathe. Most within-zone document runs are done
          within a couple of hours.
        </p>

        <h2>Get it there safely</h2>
        <p>
          Documents are light but they are not robust. A few simple steps protect
          them:
        </p>
        <ul>
          <li>Use a proper envelope or document folder so papers stay flat and dry.</li>
          <li>Seal it. A sealed envelope tells the recipient nothing was disturbed in transit.</li>
          <li>Tell us if it is sensitive, so it is handled discreetly from desk to desk.</li>
        </ul>

        <h2>Keep a record</h2>
        <p>
          With documents, certainty matters as much as speed. You want to know it
          arrived, when, and who received it. Every Mckot delivery comes with
          confirmation, and you can follow the rider on the map the whole way. For
          anything legal or financial, that record is worth as much as the speed.
        </p>

        <h2>For offices that send documents daily</h2>
        <p>
          If your office runs documents between branches or to the same partners
          regularly, do not book each one fresh. A{" "}
          <a href="/services/scheduled-pickup">scheduled pickup</a> puts a rider on
          your routine automatically, and a{" "}
          <a href="/for/companies">company account</a> rolls every run into one
          monthly statement for your accounts team.
        </p>
        <p>
          When you have something to send right now, here is{" "}
          <a href="/services/document-delivery">how document delivery works on Mckot</a>.
          One rider, office to office, with a record at the end.
        </p>
      </ArticleLayout>
    </>
  );
}
