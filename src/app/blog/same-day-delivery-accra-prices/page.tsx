import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_PRICES = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I want to know your current delivery rates and claim my 3 free deliveries.")}`;

const article = {
  slug: "same-day-delivery-accra-prices",
  title: "Same-Day Delivery Prices in Accra: What to Expect in 2026",
  excerpt:
    "A transparent breakdown of what delivery costs in Accra today, why prices vary by zone, and how to negotiate better rates as your volume grows.",
  category: "Pricing",
  readTime: "5 min read",
  date: "2026-05-12",
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
        name: "How much does same-day delivery cost in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Same-day delivery within one zone in Accra starts from GHS 35. Cross-zone deliveries (e.g. East Legon to Dansoman) cost around GHS 50. Tema corridor runs (Tema to central Accra) are GHS 60. Prices vary by service and distance.",
        },
      },
      {
        "@type": "Question",
        name: "Why do delivery prices in Accra vary by zone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Accra delivery prices vary because rider time and fuel cost increase with distance. Services divide the city into zones and charge more for deliveries that cross zone boundaries. The further the delivery from the pickup point, the higher the rate.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a discount for bulk deliveries in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Most dedicated delivery services in Accra offer bulk pricing for high-volume vendors. With Mckot, vendors running 15 or more deliveries per week can access bulk pack pricing. Contact the service directly to negotiate rates for your volume.",
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
          Delivery pricing in Accra is not standardized. Two vendors running the same route
          can be paying different rates from the same service based on their negotiation,
          volume, and onboarding date. This guide lays out what the market looks like in 2026
          so you know what is reasonable to expect and what is worth pushing back on.
        </p>
        <p>
          We will use Mckot&apos;s published pricing as the reference point throughout, since
          that is the data we have directly. Competitor rates are noted where they are
          publicly available but should be verified directly with each provider.
        </p>

        <h2>The zone model: how Accra delivery pricing works</h2>
        <p>
          Accra delivery pricing is built on a zone model. The city is divided into
          geographic zones, and the rate you pay depends on whether your delivery stays
          within one zone or crosses into another.
        </p>
        <p>
          The major zones used by most delivery services:
        </p>
        <ul>
          <li>East Legon and adjacent (Adjiringanor, East Legon Hills, American House)</li>
          <li>Osu, Cantonments, Airport Residential, Ridge</li>
          <li>Spintex Road, Baatsona, Community 18, Nungua</li>
          <li>Madina, Adenta, Oyibi, Abokobi</li>
          <li>Dansoman, Weija, Kwashieman, Mamprobi</li>
          <li>Accra Central, Jamestown, Adabraka, Kaneshie</li>
          <li>Tema Communities 1 to 12, Ashaiman</li>
        </ul>
        <p>
          A delivery that stays within one zone is a local delivery. A delivery that crosses
          from one zone to another is a cross-zone delivery and costs more because the rider
          travels further and spends more time.
        </p>

        <h2>What to expect to pay in 2026</h2>

        <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-brand-border">
          <table className="min-w-[480px] w-full text-sm">
            <thead className="bg-brand-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Delivery type</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Example route</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Mckot rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Within-zone</td>
                <td className="px-4 py-3 text-brand-foreground/65">East Legon to East Legon</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">GHS 35</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Cross-zone</td>
                <td className="px-4 py-3 text-brand-foreground/65">Osu to Spintex</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">GHS 50</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Cross-zone</td>
                <td className="px-4 py-3 text-brand-foreground/65">Madina to Dansoman</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">GHS 50</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Tema corridor</td>
                <td className="px-4 py-3 text-brand-foreground/65">Tema to Accra Central</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">GHS 60</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 text-brand-foreground/80">Tema corridor</td>
                <td className="px-4 py-3 text-brand-foreground/65">Tema to East Legon</td>
                <td className="px-4 py-3 font-semibold text-brand-foreground">GHS 60</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          COD collection is included in all rates. Your customer pays the rider in cash.
          The rider reconciles with Mckot. You receive the amount via Mobile Money the
          same day. No separate COD fee.
        </p>

        <h2>What drives delivery prices up</h2>
        <p>
          Several factors push delivery prices above the base rate:
        </p>
        <ul>
          <li><strong>Distance.</strong> The more zones crossed, the higher the rate. Tema to Dansoman crosses multiple zones and will cost more than Tema to Spintex.</li>
          <li><strong>Fuel prices.</strong> Ghana fuel prices have been volatile. Services that lock in weekly rates absorb short-term spikes. Others pass them through.</li>
          <li><strong>Traffic.</strong> Peak-hour bookings (07:00 to 09:00 and 16:00 to 19:00) take longer. Some services charge a peak-hour supplement; most do not yet in Accra.</li>
          <li><strong>Package size and weight.</strong> Standard envelope and small parcel rates apply to most social commerce shipments. Heavy or oversized packages may attract a premium.</li>
          <li><strong>Urgency.</strong> Same-day delivery is already the standard in Accra. Same-hour or 90-minute rush delivery commands a premium with any service that can guarantee it.</li>
        </ul>

        <h2>How to get better rates as your volume grows</h2>
        <p>
          Delivery pricing in Accra is negotiable at volume. Here is what works:
        </p>
        <ul>
          <li><strong>Bulk packs.</strong> Buy delivery credits in advance (usually 15 to 30 orders) at a lower per-delivery rate. Mckot offers bulk pack pricing from 15 orders.</li>
          <li><strong>Consistent pickup windows.</strong> Vendors who book pickups at predictable times are cheaper to service. Randomized bookings require more standby rider time.</li>
          <li><strong>Volume commitment.</strong> If you can commit to a minimum weekly volume, ask the service what rate they can offer on a monthly basis. Most will negotiate for reliable volume.</li>
          <li><strong>Single-location pickup.</strong> If all your orders ship from one location, dispatch is simpler and faster. Some services discount single-origin accounts.</li>
        </ul>

        <h2>Common questions about delivery pricing in Accra</h2>

        <p>
          <strong>How much does same-day delivery cost in Accra?</strong><br />
          Within-zone delivery starts at GHS 35. Cross-zone is GHS 50. Tema corridor is GHS 60.
          COD collection is included with Mckot. Other services may charge separately for it.
        </p>

        <p>
          <strong>Why do delivery prices vary by zone?</strong><br />
          Zone pricing reflects rider time and distance. A longer route uses more fuel and
          keeps the rider off other bookings for longer. Zone pricing is how services stay
          profitable on longer runs without overcharging for short ones.
        </p>

        <p>
          <strong>Can I get a bulk discount for deliveries in Accra?</strong><br />
          Yes. Most services offer bulk pack pricing for vendors running 15 or more deliveries
          per week. Contact the service directly. The discount is rarely advertised but almost
          always available for consistent volume.
        </p>

        <h2>Try Mckot before you commit</h2>
        <p>
          New vendors get 3 free deliveries. That is enough to test the full workflow
          including booking, rider dispatch, COD collection, and settlement before you
          commit to any volume or pricing tier.
        </p>
        <p>
          <a href={WA_PRICES} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>{" "}
          and we will confirm your zone pricing and get your first delivery moving today.
        </p>
      </ArticleLayout>
    </>
  );
}
