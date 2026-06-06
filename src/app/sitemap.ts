import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const corePaths = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/drive", priority: 0.9, freq: "monthly" },
    { path: "/drive/earnings", priority: 0.8, freq: "monthly" },
    { path: "/deliver", priority: 0.9, freq: "monthly" },
    { path: "/safety", priority: 0.8, freq: "monthly" },
    { path: "/pricing", priority: 0.9, freq: "monthly" },
    { path: "/vendors", priority: 0.9, freq: "monthly" },
    { path: "/coverage", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
    { path: "/eula", priority: 0.3, freq: "yearly" },
  ] as const;

  const locationPaths = [
    "/deliver-to/east-legon",
    "/deliver-to/osu",
    "/deliver-to/spintex",
    "/deliver-to/madina",
    "/deliver-to/tema",
    "/deliver-to/dansoman",
  ] as const;

  const segmentPaths = [
    "/for/instagram-sellers",
    "/for/tiktok-sellers",
    "/for/small-business",
    "/for/restaurants",
    "/for/companies",
    "/for/individuals",
    "/for/pharmacies",
  ] as const;

  const servicePaths = [
    "/services/same-day-delivery",
    "/services/document-delivery",
    "/services/parcel-delivery",
    "/services/business-delivery",
    "/services/scheduled-pickup",
  ] as const;

  const blogPaths = [
    "/blog/delivery-for-instagram-sellers-accra",
    "/blog/best-delivery-service-ghana",
    "/blog/dispatch-rider-accra-guide",
    "/blog/same-day-delivery-accra-prices",
    "/blog/cod-delivery-ghana-online-sellers",
    "/blog/how-to-deliver-tiktok-orders-ghana",
    "/blog/delivery-tips-social-sellers-accra",
    "/blog/mckot-delivery-app-review",
    "/blog/how-to-send-a-package-accra-same-day",
    "/blog/courier-services-small-business-ghana",
    "/blog/set-up-reliable-delivery-accra-business",
    "/blog/sending-documents-across-accra-guide",
    "/blog/mckot-vs-uber-bolt-package-delivery",
    "/blog/restaurants-accra-supply-catering-delivery",
    "/blog/cheapest-reliable-delivery-accra-2026",
    "/blog/book-delivery-online-accra-how-mckot-works",
    "/blog/delivery-apps-ghana-compared-2026",
  ] as const;

  const now = new Date();

  return [
    ...corePaths.map(({ path, priority, freq }) => ({
      url: `${base}${path || "/"}`,
      lastModified: now,
      changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    })),
    ...locationPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...segmentPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...servicePaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...blogPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
