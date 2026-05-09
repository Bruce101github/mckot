import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { UrgencyBanner } from "@/components/home/UrgencyBanner";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Last-mile delivery for Accra vendors`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Mckot",
    "last mile delivery Accra",
    "Ghana logistics",
    "Instagram seller delivery",
    "WhatsApp commerce",
    "social commerce Ghana",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: {
      "@type": "City",
      name: "Accra",
      containedInPlace: { "@type": "Country", name: "Ghana" },
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = siteConfig.gaMeasurementId;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
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
        <UrgencyBanner />
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
