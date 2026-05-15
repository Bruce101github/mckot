import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { AnalyticsInit } from "@/components/AnalyticsInit";
import { SystemBanner } from "@/components/SystemBanner";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mckot | Same-Day Delivery for Online Vendors in Accra, Ghana",
    template: `%s | Mckot`,
  },
  description: siteConfig.description,
  keywords: [
    "delivery service Accra",
    "same day delivery Ghana",
    "dispatch rider Accra",
    "last mile delivery Accra",
    "delivery for Instagram sellers Ghana",
    "courier service Accra",
    "online vendor delivery Ghana",
    "cash on delivery Ghana",
    "delivery app Accra",
    "Mckot",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Mckot | Same-Day Delivery for Online Vendors in Accra, Ghana",
    description: siteConfig.description,
    images: [
      {
        url: "/photo-rider.png",
        width: 1200,
        height: 630,
        alt: "Mckot rider delivering across Accra, Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mckot | Same-Day Delivery for Online Vendors in Accra, Ghana",
    description: siteConfig.description,
    images: ["/photo-rider.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "DeliveryService"],
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo-light.svg`,
        image: `${siteConfig.url}/photo-rider.png`,
        description:
          "Last-mile delivery for social commerce vendors in Accra, Ghana. Same-day pickup and delivery, cash-on-delivery handling, and real-time tracking for Instagram, TikTok, and WhatsApp sellers.",
        telephone: siteConfig.phones.primary,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        areaServed: [
          { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
          { "@type": "Place", name: "East Legon" },
          { "@type": "Place", name: "Osu" },
          { "@type": "Place", name: "Tema" },
          { "@type": "Place", name: "Spintex" },
          { "@type": "Place", name: "Madina" },
          { "@type": "Place", name: "Dansoman" },
          { "@type": "Place", name: "Cantonments" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "07:00",
          closes: "22:00",
        },
        priceRange: "GHS 35 - GHS 60",
        currenciesAccepted: "GHS",
        paymentAccepted: "Mobile Money, Bank Transfer, Cash on Delivery",
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.tiktok,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phones.primary,
          contactType: "customer service",
          availableLanguage: "English",
          areaServed: "GH",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Delivery Services in Accra",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Local Delivery",
              description: "Same-zone same-day delivery within Greater Accra",
              price: "35",
              priceCurrency: "GHS",
              eligibleRegion: { "@type": "Place", name: "Accra, Ghana" },
            },
            {
              "@type": "Offer",
              name: "Cross-Zone Delivery",
              description: "Delivery across adjacent zones in Greater Accra",
              price: "50",
              priceCurrency: "GHS",
              eligibleRegion: { "@type": "Place", name: "Accra, Ghana" },
            },
            {
              "@type": "Offer",
              name: "Tema Corridor Delivery",
              description: "Tema Communities and Spintex to central Accra",
              price: "60",
              priceCurrency: "GHS",
              eligibleRegion: { "@type": "Place", name: "Tema, Ghana" },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#business` },
        inLanguage: "en-GH",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = siteConfig.gaMeasurementId;

  return (
    <html lang="en-GH" className={inter.variable}>
      <head>
        <SiteSchema />
      </head>
      <body className="min-h-screen font-sans">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-brand opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-foreground"
        >
          Skip to content
        </a>
        {ga ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <AnalyticsInit />
        <SystemBanner />
        <Header />
        <main id="main-content" className="pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
