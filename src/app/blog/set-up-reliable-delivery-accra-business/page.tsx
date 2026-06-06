import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

const article = {
  slug: "set-up-reliable-delivery-accra-business",
  title: "How to Set Up Reliable Delivery for Your Accra Business",
  excerpt:
    "A step-by-step playbook for turning delivery from a daily scramble into a system, from choosing pickup windows to scheduling recurring runs.",
  category: "For business",
  readTime: "7 min read",
  date: "2026-06-03",
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
        name: "How do I set up reliable delivery for my business in Accra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick a consistent pickup window, package orders the same way every time, choose a courier with same-day coverage and cash-on-delivery, and move repeat runs onto a recurring schedule. A predictable routine is what makes delivery reliable.",
        },
      },
      {
        "@type": "Question",
        name: "Should a small business hire its own riders or use a courier?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most small businesses, using a courier that charges per delivery is cheaper and more flexible than employing riders, fueling bikes, and managing maintenance. You scale up and down with demand instead of carrying fixed cost.",
        },
      },
      {
        "@type": "Question",
        name: "What is a scheduled pickup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A scheduled pickup is a fixed recurring window where a rider arrives to collect your deliveries without you booking each time. It suits any business with a daily or weekly delivery rhythm and usually costs less than ad hoc bookings.",
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
            heading="Build your delivery routine on Mckot"
            subheading="Start with one order, then move your repeat runs onto a schedule. Book on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I want to set up reliable delivery for my Accra business."
          />
        }
      >
        <p>
          Most businesses I meet do not have a delivery problem. They have a
          delivery routine problem. The deliveries happen, but every one is a
          fresh scramble: find a rider, agree a price, hope it arrives. The fix is
          not working harder. It is turning delivery into a system. Here is how I
          would set that up.
        </p>

        <h2>Step 1: Decide your daily pickup window</h2>
        <p>
          Pick a time each day when your orders are packed and ready, and make
          that your pickup window. Even a single fixed slot, say late morning,
          changes everything. You pack toward a deadline, the rider knows when to
          come, and customers get consistent delivery times.
        </p>

        <h2>Step 2: Standardise how you package</h2>
        <p>
          Reliable delivery starts before the rider arrives. Use the same
          packaging for the same kinds of orders. Label each package with the
          recipient&rsquo;s name, phone number, and the amount to collect if it is
          cash-on-delivery. Riders move faster when there is no guesswork at the
          door.
        </p>

        <h2>Step 3: Choose a courier you can build on</h2>
        <p>
          You want same-day coverage across the areas you sell to, cash-on-delivery
          with same-day settlement, live tracking, and per-delivery pricing with no
          contract. If you are weighing options, my checklist on{" "}
          <a href="/blog/courier-services-small-business-ghana">choosing a courier for your business</a>{" "}
          covers exactly what to ask.
        </p>

        <h2>Step 4: Use cash-on-delivery properly</h2>
        <p>
          In Ghana, COD is not a weakness, it is a sales tool. The key is clean
          reconciliation. With Mckot, the rider collects, we reconcile, and you are
          paid by Mobile Money the same day. Tell your customer the exact amount in
          advance so the handover is quick.
        </p>

        <h2>Step 5: Move repeat runs onto a schedule</h2>
        <p>
          Once you can see your pattern, stop booking the predictable runs one by
          one. A <a href="/services/scheduled-pickup">scheduled pickup</a> means a
          rider arrives in your window automatically, often at a better rate than
          ad hoc bookings. This is the step that takes delivery off your daily
          to-do list for good.
        </p>

        <h2>Step 6: Own vs outsource the riders</h2>
        <p>
          Some owners ask whether they should just hire riders. For most small and
          mid-size businesses, the maths favours a courier: no salaries, no fuel,
          no bike maintenance, no idle time on slow days. You pay for deliveries
          when you have them and scale with demand. If your volume is genuinely
          large and steady, a <a href="/for/companies">company account</a> gives
          you scheduled runs and one monthly statement without taking on a fleet.
        </p>

        <h2>Putting it together</h2>
        <p>
          Reliable delivery is a routine, not a hero effort. Fixed pickup window,
          standard packaging, the right courier, clean COD, and a schedule for the
          repeat runs. Set that up once and delivery stops being the thing that
          breaks on your busiest day. When you are ready, here is{" "}
          <a href="/services/business-delivery">how business delivery works on Mckot</a>.
        </p>
      </ArticleLayout>
    </>
  );
}
