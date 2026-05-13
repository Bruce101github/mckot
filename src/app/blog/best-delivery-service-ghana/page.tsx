import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { siteConfig } from "@/lib/site";

const WA_COMPARE = `https://wa.me/233503305586?text=${encodeURIComponent("Hi Mckot, I'd like to test you before committing. Claim my 3 free deliveries.")}`;

const article = {
  slug: "best-delivery-service-ghana",
  title: "Best Delivery Services in Ghana for Online Sellers (2026)",
  excerpt:
    "Comparing the top delivery options for Instagram, TikTok, and WhatsApp vendors in Accra. Coverage, pricing, COD, and tracking reviewed honestly.",
  category: "Comparison",
  readTime: "9 min read",
  date: "2026-05-05",
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
        name: "What is the best delivery service in Ghana for online sellers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For Accra-based social commerce vendors (Instagram, TikTok, WhatsApp), the best fit depends on your needs. Mckot is built for this use case with COD handling, batch pickups, and WhatsApp booking. ShaQ Express is better if you need national coverage outside Accra. GIG Logistics serves corporate and cross-border needs.",
        },
      },
      {
        "@type": "Question",
        name: "Which delivery services in Ghana handle cash-on-delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mckot and ShaQ Express both offer cash-on-delivery in Accra, with Mckot providing same-day Mobile Money reconciliation for social commerce vendors. Not all Accra delivery services offer COD, and the quality of reconciliation varies significantly.",
        },
      },
      {
        "@type": "Question",
        name: "How much does delivery cost in Ghana for online sellers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Within-zone same-day delivery in Accra starts from GHS 35 with Mckot. Cross-zone runs (e.g. Osu to Spintex) are GHS 50, and Tema corridor deliveries are GHS 60. Competitor pricing varies — check each service's current rates directly.",
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
          Finding a reliable delivery service in Ghana is not as simple as picking the
          biggest name. The delivery market in Accra in 2026 is fragmented: a handful of
          larger operators, dozens of individual dispatch riders, a few app-based services,
          and aggregator directories that list all of them without any quality filter.
        </p>
        <p>
          This comparison is written for online sellers, Instagram vendors, TikTok sellers,
          and WhatsApp-based businesses in Accra who need last-mile delivery that works for
          their use case. We cover each major option, what it is good at, where it falls
          short, and who it fits.
        </p>
        <p>
          <em>Disclosure: This comparison is written by Mckot, one of the services listed. We have
          tried to be accurate and fair about all competitors. Where we say something is a
          weakness, it is based on publicly available information and reported user experience,
          not speculation. We encourage you to test any service, including ours, before committing.</em>
        </p>

        <h2>What matters for Ghana online sellers choosing a delivery partner</h2>
        <p>
          Generic courier reviews focus on price and speed. For social commerce vendors,
          the priorities are different:
        </p>
        <ul>
          <li><strong>Cash-on-delivery (COD).</strong> Does the service collect cash at the door and reconcile it to you? Not every service offers this, and the ones that do vary widely in how they handle the reconciliation.</li>
          <li><strong>Real-time customer tracking.</strong> Can your buyer see where their order is without messaging you?</li>
          <li><strong>Same-day delivery.</strong> Online shoppers in Accra expect same-day. Next-day is acceptable for some categories, but the bar is rising.</li>
          <li><strong>Coverage across Greater Accra.</strong> Does the service cover East Legon, Tema, Madina, Spintex, and Dansoman, or just the premium zones?</li>
          <li><strong>Batch and scheduled pickups.</strong> Vendors running drops need a rider at a specific time, not &ldquo;sometime in the afternoon.&rdquo;</li>
          <li><strong>WhatsApp-native workflow.</strong> If you have to log into a portal to book, that friction compounds across hundreds of orders.</li>
          <li><strong>Price.</strong> Per-delivery cost, and whether bulk discounts exist for regular senders.</li>
        </ul>

        <h2>The main options in Ghana right now</h2>

        <h3>ShaQ Express</h3>
        <p>
          ShaQ Express is one of the most established delivery companies in Ghana with
          coverage across the country and a strong brand in Accra. They have an app,
          real-time tracking, and a network built over several years. They have expanded
          into food delivery, pharmacies, and other services, positioning as a
          &ldquo;super app.&rdquo;
        </p>
        <p>
          <strong>Good for:</strong> Businesses that need wide geographic coverage,
          including outside Accra.
        </p>
        <p>
          <strong>Limitations for social sellers:</strong> The super app pivot means ShaQ&apos;s
          focus is not exclusively on social commerce vendors. COD process and batch pickup
          scheduling are less optimized for the Instagram drop use case. Pricing is higher
          than leaner alternatives.
        </p>

        <h3>Zippy</h3>
        <p>
          Zippy operates electric vehicles exclusively, which is good for fuel cost
          stability. Their app and web interface are clean. They offer same-day delivery
          and a clear booking flow.
        </p>
        <p>
          <strong>Good for:</strong> Environmentally conscious brands and sellers who
          prioritize a modern booking experience.
        </p>
        <p>
          <strong>Limitations for social sellers:</strong> Coverage is narrower than older
          operators. Less established for COD workflows compared to motorcycle-based
          services.
        </p>

        <h3>Mohabb</h3>
        <p>
          Mohabb is a simple, WhatsApp-friendly dispatch service for Accra. You can book a
          rider quickly through their website and get a delivery done without installing
          anything. Focused on Accra specifically.
        </p>
        <p>
          <strong>Good for:</strong> One-off bookings, individuals who need a quick
          delivery without app setup.
        </p>
        <p>
          <strong>Limitations for social sellers:</strong> No dedicated vendor tooling, no
          batch scheduling, no order history or dashboard. Works for occasional deliveries
          but does not scale for vendors doing five-plus orders per day.
        </p>

        <h3>GIG Logistics (GIGL)</h3>
        <p>
          GIG Logistics is a Nigerian logistics company with Ghana operations. They offer
          parcel delivery, corporate logistics, and cross-border shipping to Nigeria. They
          have formal tracking and a professional operation.
        </p>
        <p>
          <strong>Good for:</strong> Businesses with Nigeria shipping needs, corporate
          clients, high-value parcels requiring formal handling.
        </p>
        <p>
          <strong>Limitations for social sellers:</strong> Priced and structured for
          corporate clients. The experience centre model may require drop-off rather than
          doorstep pickup. Not designed for same-day social commerce deliveries.
        </p>

        <h3>Deliveries Ghana and aggregators</h3>
        <p>
          Deliveries Ghana and similar directories connect you to a network of independent
          dispatch riders. Useful for finding coverage in areas where no single operator
          has a presence.
        </p>
        <p>
          <strong>Good for:</strong> One-off deliveries outside Accra, price shopping.
        </p>
        <p>
          <strong>Limitations for social sellers:</strong> Quality varies significantly
          across riders. No standardized tracking, COD, or proof of delivery. You are
          managing a different rider each time.
        </p>

        <h3>Mckot</h3>
        <p>
          Mckot is built specifically for social commerce vendors in Accra. It covers
          Greater Accra with same-day motorcycle delivery, structured COD reconciliation
          to Mobile Money, real-time tracking links for customers, and a WhatsApp-first
          onboarding process.
        </p>
        <p>
          <strong>Good for:</strong> Instagram, TikTok, WhatsApp, and Facebook sellers
          delivering within Greater Accra who need COD handled reliably.
        </p>
        <p>
          <strong>Limitations:</strong> Coverage is currently Accra only. Kumasi and
          Takoradi are on the roadmap but not live yet. Newer operation with a smaller
          track record than ShaQ Express or GIG Logistics.
        </p>

        <h2>Side-by-side comparison</h2>
        <p>
          <em>Competitor prices are based on publicly available information as of 2026 and may
          change. Verify current rates directly with each service.</em>
        </p>

        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-brand-border">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-brand-muted/20">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Service</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Accra coverage</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">COD</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Tracking link</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Batch pickup</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-foreground">Price (GHS)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 font-medium text-brand-foreground">ShaQ Express</td>
                <td className="px-4 py-3 text-brand-foreground/65">Wide</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">Limited</td>
                <td className="px-4 py-3 text-brand-foreground/65">Varies</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 font-medium text-brand-foreground">Zippy</td>
                <td className="px-4 py-3 text-brand-foreground/65">Moderate</td>
                <td className="px-4 py-3 text-brand-foreground/65">Limited</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Varies</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 font-medium text-brand-foreground">Mohabb</td>
                <td className="px-4 py-3 text-brand-foreground/65">Accra</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Varies</td>
              </tr>
              <tr className="border-t border-brand-border/40">
                <td className="px-4 py-3 font-medium text-brand-foreground">GIG Logistics</td>
                <td className="px-4 py-3 text-brand-foreground/65">Wide</td>
                <td className="px-4 py-3 text-brand-foreground/65">Limited</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">No</td>
                <td className="px-4 py-3 text-brand-foreground/65">Corporate pricing</td>
              </tr>
              <tr className="border-t border-brand-border/40 bg-brand-accent/5">
                <td className="px-4 py-3 font-semibold text-brand-accent">Mckot</td>
                <td className="px-4 py-3 text-brand-foreground/65">Greater Accra</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes, with reconciliation</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">Yes</td>
                <td className="px-4 py-3 text-brand-foreground/65">35 to 60</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Recommendation by use case</h2>
        <p>
          <strong>You are an Instagram or TikTok seller in Accra doing 5 to 50 orders per week.</strong>{" "}
          Mckot is built for this exact use case. COD handling, tracking links, batch
          pickups, and a WhatsApp-native workflow. Start with the 3 free delivery offer
          and test before you commit.
        </p>
        <p>
          <strong>You need delivery outside Accra today.</strong> ShaQ Express has the
          widest national coverage. Use them until Mckot expands to your region.
        </p>
        <p>
          <strong>You send packages to Nigeria regularly.</strong> GIG Logistics has an
          established Nigeria corridor. Not the right tool for daily Accra social commerce
          orders, but useful for that specific cross-border need.
        </p>
        <p>
          <strong>You need one-off deliveries with no commitment.</strong> Mohabb works for
          this. No setup, quick booking, good for occasional use.
        </p>

        <h2>Common questions about Ghana delivery services</h2>

        <p>
          <strong>What is the best delivery service in Ghana for online sellers?</strong><br />
          For Accra-based social commerce vendors, the best fit depends on your use case.
          Mckot is built for Instagram, TikTok, and WhatsApp sellers. ShaQ Express covers
          the whole country. GIG Logistics is for corporate and cross-border needs.
        </p>

        <p>
          <strong>Which services handle cash-on-delivery in Ghana?</strong><br />
          Mckot and ShaQ Express both offer COD in Accra. Mckot provides same-day Mobile
          Money reconciliation. Not all services offer COD, and the quality of
          reconciliation varies significantly between providers.
        </p>

        <p>
          <strong>How much does delivery cost in Ghana?</strong><br />
          Within-zone same-day delivery with Mckot starts from GHS 35. Cross-zone runs
          are GHS 50, Tema corridor is GHS 60. Competitor pricing varies and changes
          frequently. Verify current rates directly with each service.
        </p>

        <h2>Before you commit to any delivery partner</h2>
        <p>
          Ask these questions before you sign up with anyone:
        </p>
        <ul>
          <li>Do you handle cash-on-delivery, and how is it reconciled?</li>
          <li>Does my customer get a tracking link automatically?</li>
          <li>Can I schedule batch pickups at a specific time I choose?</li>
          <li>What happens if a delivery fails or a package is damaged?</li>
          <li>What is the coverage area, and what zones cost extra?</li>
          <li>Is there a minimum order commitment or subscription?</li>
          <li>How do I contact you when something goes wrong, and how fast do you respond?</li>
        </ul>
        <p>
          Any delivery partner worth using should be able to answer all of these clearly
          before you sign up. Vague answers on any of these will show up in the operations.
        </p>
        <p>
          If you want to test Mckot,{" "}
          <a href={WA_COMPARE} target="_blank" rel="noopener noreferrer">
            message us on WhatsApp
          </a>{" "}
          and we will answer all of the above before you book your first delivery.
        </p>
      </ArticleLayout>
    </>
  );
}
