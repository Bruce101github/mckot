import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "mckot-vs-uber-bolt-package-delivery",
  title: "Mckot vs Sending a Package by Uber or Bolt: When Each Makes Sense",
  excerpt:
    "Riders use Uber and Bolt to move packages all the time. Here is an honest look at when that works, when it does not, and where a dedicated courier wins.",
  category: "Comparison",
  readTime: "6 min read",
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
        name: "Can I send a package with Uber or Bolt in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can send a package by booking an Uber or Bolt trip and handing the item to the driver, but it is built for moving people, not parcels. There is no cash-on-delivery, no proof of delivery, and no guarantee the driver will accept a package-only run.",
        },
      },
      {
        "@type": "Question",
        name: "Is a dedicated courier better than Uber or Bolt for delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For anything beyond a one-off, yes. A dedicated courier like Mckot offers cash-on-delivery, proof of delivery, parcel handling, and motorbike rates that are usually cheaper than a car trip for the same route.",
        },
      },
      {
        "@type": "Question",
        name: "Which is cheaper for sending a package in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A motorbike courier is usually cheaper than a ride-hailing car for the same package, because you are paying for a bike and a dedicated delivery rather than a passenger car fare. Mckot package delivery starts at GHS 35 within a zone.",
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
            heading="Send it the way that is built for it"
            subheading="Cash-on-delivery, proof of delivery, and motorbike rates. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I want to send a package across Accra today."
          />
        }
      >
        <p>
          I will be honest, because pretending otherwise helps no one: people send
          packages by Uber and Bolt in Accra every single day. You book a trip,
          hand the driver the item, and it gets there. It works. So the real
          question is not whether it works, but when it is the right tool and when
          a dedicated courier is the better call. Here is how I think about it.
        </p>

        <h2>When Uber or Bolt is fine</h2>
        <p>
          If you have a single item, the receiver can pay you separately, and you
          do not need a record, a ride-hailing trip can do the job. It is
          convenient when you already have the app open and you are not sending
          anything that needs handling. For a true one-off, there is no shame in
          it.
        </p>

        <h2>Where it falls short</h2>
        <p>
          The cracks show the moment your send is anything more than basic:
        </p>
        <ul>
          <li><strong>No cash-on-delivery.</strong> The driver will not collect payment from your customer and reconcile it with you. For a business, that is the whole game.</li>
          <li><strong>No proof of delivery.</strong> You get a trip receipt, not confirmation that your specific item reached the right person.</li>
          <li><strong>It is built for people.</strong> Drivers can decline a package-only run, and a car fare is usually more than a motorbike rate for the same route.</li>
          <li><strong>No parcel handling.</strong> A passenger car is not set up to carry, protect, or prioritise your package.</li>
        </ul>

        <h2>Side by side</h2>
        <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-brand-border">
          <table className="min-w-[480px] w-full text-sm">
            <thead className="bg-brand-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">What you need</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Uber / Bolt trip</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Mckot courier</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Cash-on-delivery</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Built in</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Proof of delivery</td>
                <td className="px-4 py-3 text-brand-foreground/65">Trip receipt only</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Per delivery</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Built for packages</td>
                <td className="px-4 py-3 text-brand-foreground/65">No, built for riders</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Yes</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Typical cost (within zone)</td>
                <td className="px-4 py-3 text-brand-foreground/65">Car fare</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">From GHS 35</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Recurring and scheduled runs</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>My honest take</h2>
        <p>
          Sending one item, one time, with no payment to collect? A ride-hailing
          trip is fine, use it. Sending to a customer, sending often, collecting
          cash, or needing to prove it arrived? That is what a courier is for, and
          it usually costs less per package too. For the price detail, see{" "}
          <a href="/blog/same-day-delivery-accra-prices">same-day delivery prices in Accra</a>,
          and if you want the broader landscape, my guide to the{" "}
          <a href="/blog/best-delivery-service-ghana">best delivery services in Ghana</a>{" "}
          puts the options together.
        </p>
        <p>
          When you are ready to send something properly, here is{" "}
          <a href="/services/parcel-delivery">how parcel delivery works on Mckot</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
