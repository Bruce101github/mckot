import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_REVIEW = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I read the review and I'd like to try the 3 free deliveries.")}`;

const article = {
  slug: "mckot-delivery-app-review",
  title: "Mckot App Review: What Vendors in Accra Are Saying",
  excerpt:
    "An honest look at what the Mckot delivery app does, who it is built for, how it compares to booking by WhatsApp, and what the first vendors noticed.",
  category: "Product",
  readTime: "7 min read",
  date: "2026-05-28",
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
        name: "Is Mckot available in my area in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mckot currently covers East Legon, Osu, Cantonments, Airport Residential, Spintex, Madina, Adenta, Dansoman, Weija, Accra Central, and Tema Communities. Coverage is updated as new zones are confirmed. Contact us on WhatsApp to verify your specific location.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a delivery on Mckot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The simplest way to book is via WhatsApp: send your customer name, delivery address, item description, and whether it is COD to +233 50 330 5586. The Mckot app is available on Android and iOS for vendors who prefer an in-app booking flow.",
        },
      },
      {
        "@type": "Question",
        name: "Does Mckot handle cash-on-delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. COD is included with every Mckot delivery. The rider collects cash from your customer at the door. The amount is reconciled and transferred to your Mobile Money account the same day. There is no additional fee for COD.",
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
          <em>Disclosure: This review is written by Mckot. We are reviewing our own product.
          We have tried to be honest about limitations and early-stage roughness. You should
          test any service for yourself before committing. That is exactly why we offer 3
          free deliveries.</em>
        </p>
        <p>
          Mckot is a same-day delivery service built for social commerce vendors in Accra.
          The app, the WhatsApp booking flow, the COD reconciliation, and the vendor
          dashboard are all part of the same product. This review covers what the system
          does, who it is built for, what early vendors have noticed, and where there is
          still work to do.
        </p>

        <h2>What Mckot does</h2>
        <p>
          Mckot provides three things:
        </p>
        <ul>
          <li><strong>Same-day pickup and delivery</strong> across Greater Accra. A rider collects from your location and delivers to your customer the same day, seven days a week.</li>
          <li><strong>Cash-on-delivery handling.</strong> The rider collects cash at the customer&apos;s door. Amounts are reconciled and transferred to your Mobile Money account the same day.</li>
          <li><strong>Proof of delivery.</strong> A delivery confirmation with timestamp and rider notes for every completed drop. You can share this with your customer or keep it for your records.</li>
        </ul>
        <p>
          Everything is bookable via WhatsApp or through the Mckot app. You do not need to
          use the app to access any feature. The WhatsApp flow handles the same capabilities
          as the in-app booking.
        </p>

        <h2>WhatsApp vs. in-app booking</h2>
        <p>
          Most Mckot vendors use WhatsApp booking, particularly early on. Here is the honest
          comparison:
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-brand-border">
          <table className="min-w-[480px] w-full text-sm">
            <thead className="bg-brand-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">WhatsApp</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">App</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Booking speed</td>
                <td className="px-4 py-3 text-brand-foreground/65">Fast (one message)</td>
                <td className="px-4 py-3 text-brand-foreground/65">Slightly slower (form flow)</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Batch orders</td>
                <td className="px-4 py-3 text-brand-foreground/65">Send a list, we handle it</td>
                <td className="px-4 py-3 text-brand-foreground/65">In-app batch booking</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Order history</td>
                <td className="px-4 py-3 text-brand-foreground/65">Via WhatsApp thread</td>
                <td className="px-4 py-3 text-brand-foreground/65">Full dashboard view</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">COD tracking</td>
                <td className="px-4 py-3 text-brand-foreground/65">Reported via message</td>
                <td className="px-4 py-3 text-brand-foreground/65">In-app reconciliation view</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Setup required</td>
                <td className="px-4 py-3 text-brand-foreground/65">None</td>
                <td className="px-4 py-3 text-brand-foreground/65">Download + account</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For vendors doing under 10 orders per day, WhatsApp is the faster path. For vendors
          doing more than that, the app&apos;s dashboard and order history become genuinely useful.
        </p>

        <h2>What early vendors noticed</h2>
        <p>
          We have been running live deliveries with founding vendors across Accra. Here is
          an honest summary of what they have told us:
        </p>
        <p>
          <strong>What works well:</strong>
        </p>
        <ul>
          <li>Pickup confirmation before dispatch. Vendors know a rider is assigned before they start packing.</li>
          <li>Same-day COD settlement. Cash collected during the day is in their MoMo by evening.</li>
          <li>WhatsApp response time. Most booking confirmations come back within minutes during operating hours.</li>
          <li>Delivery proof. Vendors who have had disputes with customers say the timestamp confirmation resolved them quickly.</li>
        </ul>
        <p>
          <strong>Where there is still work:</strong>
        </p>
        <ul>
          <li>The app&apos;s tracking interface is functional but not as polished as established services. We are working on it.</li>
          <li>Coverage is Accra only. Vendors with buyers in Kumasi or Takoradi need a different service for those orders.</li>
          <li>Peak-hour rider availability can be tight on days when multiple vendors run large batches simultaneously. We are scaling the rider pool.</li>
        </ul>

        <h2>Coverage: what is live in 2026</h2>
        <p>
          Mckot currently covers all major Greater Accra zones:
        </p>
        <ul>
          <li>East Legon, East Legon Hills, Adjiringanor</li>
          <li>Osu, Ridge, Cantonments, Airport Residential</li>
          <li>Spintex Road, Baatsona, Community 18, Nungua</li>
          <li>Madina, Adenta, Oyibi, Abokobi</li>
          <li>Dansoman, Weija, Kwashieman, Mamprobi</li>
          <li>Accra Central, Jamestown, Adabraka, Kaneshie</li>
          <li>Tema Communities 1 to 12, Ashaiman</li>
        </ul>
        <p>
          Kumasi and Takoradi are on the roadmap. No date confirmed yet. If you have buyers
          in either city, we are not the right service for those orders today.
        </p>

        <h2>Pricing</h2>
        <ul>
          <li>Within-zone delivery: GHS 35</li>
          <li>Cross-zone delivery: GHS 50</li>
          <li>Tema corridor: GHS 60</li>
          <li>COD: included. No extra charge.</li>
          <li>Bulk packs available from 15 orders per week.</li>
        </ul>

        <h2>Who Mckot is for</h2>
        <p>
          Mckot works best for Instagram, TikTok, WhatsApp, and Facebook vendors in Accra
          doing 3 to 50 orders per day. The COD handling, batch scheduling, and WhatsApp
          booking are built for social commerce volume. If you need national coverage, a
          corporate account manager, or delivery to Kumasi, a larger operator is a better
          fit today.
        </p>

        <h2>Common questions about Mckot</h2>

        <p>
          <strong>Is Mckot available in my area in Accra?</strong><br />
          We cover all major Greater Accra zones. If you are not sure whether your specific
          location is included, message us on WhatsApp with your address and we will confirm
          within minutes.
        </p>

        <p>
          <strong>How do I book a delivery on Mckot?</strong><br />
          The simplest way is WhatsApp: send customer name, delivery address, item, and
          whether it is COD to +233 50 330 5586. The app is available on Android and iOS
          for vendors who prefer in-app booking.
        </p>

        <p>
          <strong>Does Mckot handle cash-on-delivery?</strong><br />
          Yes. COD is included with every delivery at no extra charge. The rider collects
          at the door. We reconcile and transfer to your Mobile Money the same day.
        </p>

        <h2>Try it before you decide</h2>
        <p>
          The right way to evaluate a delivery service is to use it. We offer 3 free
          deliveries to new vendors. No contract, no commitment. Test the booking process,
          the COD settlement, and whether the tracking works for your customers before
          you make a decision.
        </p>
        <p>
          <a href={WA_REVIEW} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          with your first order and we will get it moving today.
        </p>
      </ArticleLayout>
    </>
  );
}
