import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "delivery-apps-ghana-compared-2026",
  title: "Delivery Apps in Ghana Compared (2026)",
  excerpt:
    "Ride-hailing apps, food-ordering apps, informal riders, and dedicated couriers all promise delivery. Here is how the options actually compare for sending something in Ghana.",
  category: "Comparison",
  readTime: "8 min read",
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
        name: "Which delivery app should I use in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For sending packages, documents, and parcels, a dedicated courier app like Mckot is the best fit because it offers cash-on-delivery, proof of delivery, live tracking, and motorbike rates. Ride-hailing and food-ordering apps are built for other jobs.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best delivery app in Ghana for businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A dedicated courier with cash-on-delivery, same-day coverage, batch and scheduled runs, and no contract is the best fit for businesses. Mckot covers seven zones across Greater Accra and lets you book online, in the app, or on WhatsApp.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book delivery without downloading an app in Ghana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Mckot lets you book a delivery on the website or over WhatsApp without downloading anything. The app is optional and adds saved places and faster repeat booking.",
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
            heading="The courier built for sending things"
            subheading="Cash-on-delivery, live tracking, and seven zones across Greater Accra. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I'm comparing delivery options in Ghana. Can you tell me how Mckot works?"
          />
        }
      >
        <p>
          When someone in Ghana needs to send something, they reach for whatever
          app is already on their phone. A ride-hailing app, a food-ordering app,
          a number for an informal rider. They all move things, but they are built
          for different jobs, and using the wrong one is where the frustration
          comes from. Here is an honest comparison of the options in 2026.
        </p>

        <h2>The four kinds of delivery in Ghana</h2>
        <p>
          Almost everything people use falls into one of four categories. Knowing
          which is which saves you a lot of trouble.
        </p>
        <ul>
          <li><strong>Ride-hailing apps.</strong> Built to move people. You can hand a driver a package, but there is no cash-on-delivery, no proof of delivery, and the fare is a passenger car rate.</li>
          <li><strong>Food-ordering apps.</strong> Built to move meals from listed restaurants to customers. Excellent at that one job, not designed for sending your own package across town.</li>
          <li><strong>Informal riders.</strong> The number a friend gave you. Cheap and personal when they are available, but no tracking, no record, and no backup when the one rider is busy or unreachable.</li>
          <li><strong>Dedicated couriers.</strong> Built specifically to send packages, documents, and parcels, with cash-on-delivery, tracking, proof of delivery, and a network of riders so there is always one available. This is where Mckot sits.</li>
        </ul>

        <h2>How they compare for sending something</h2>
        <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-brand-border">
          <table className="min-w-[560px] w-full text-sm">
            <thead className="bg-brand-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">What you need</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Ride-hailing</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Informal rider</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Mckot courier</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Cash-on-delivery</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Informal</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Built in</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Live tracking</td>
                <td className="px-4 py-3 text-brand-foreground/65">Trip only</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Yes</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Proof of delivery</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Yes</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Always a rider available</td>
                <td className="px-4 py-3 text-brand-foreground/65">Usually</td>
                <td className="px-4 py-3 text-brand-foreground/65">One person</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Rider network</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Scheduled and recurring runs</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Ad hoc</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Yes</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Book without an app</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Call only</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Site or WhatsApp</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>So which should you use?</h2>
        <p>
          Match the tool to the job. Moving yourself across town: ride-hailing.
          Ordering dinner from a listed restaurant: a food app. A genuine one-off
          send where nothing matters but getting it there: an informal rider is
          fine. But for anything you send regularly, anything with payment to
          collect, or anything where you need to know it arrived, a dedicated
          courier is the right tool, and usually the cheaper one per package too.
        </p>

        <h2>Where Mckot fits</h2>
        <p>
          Mckot is the dedicated courier in that list. It is built for sending
          things across Greater Accra: cash-on-delivery, live tracking, proof of
          delivery, a network of riders so you are not stuck when one is busy, and
          three ways to book so there is always a fast path. For the deeper
          comparison of named services, see my guide to the{" "}
          <a href="/blog/best-delivery-service-ghana">best delivery services in Ghana</a>.
          If you specifically want to know when a ride-hailing trip is enough, I
          covered that in{" "}
          <a href="/blog/mckot-vs-uber-bolt-package-delivery">Mckot vs sending a package by Uber or Bolt</a>.
        </p>
        <p>
          Ready to try the tool built for the job? Here is{" "}
          <a href="/blog/book-delivery-online-accra-how-mckot-works">how booking a delivery online with Mckot works</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
