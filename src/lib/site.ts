export const siteConfig = {
  name: "Mckot",
  tagline: "Logistics that scales with your business",
  description:
    "Last-mile delivery in Accra for social commerce vendors. Mckot helps Instagram, TikTok, and WhatsApp sellers ship faster with tech-enabled logistics.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mckot.com",
  locale: "en_GH",
  social: {
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL ||
      "https://wa.me/233503305586?text=Hi%20Mckot%2C%20I%27d%20like%20to%20start%20delivering.",
    whatsappChannel:
      process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL ||
      "https://whatsapp.com/channel/0029VaXjCfzJkK7Hxqekhh26",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com",
  },
  app: {
    playStore:
      process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
      "https://play.google.com/store/apps/details?id=com.mckot.app",
    appStore:
      process.env.NEXT_PUBLIC_APP_STORE_URL ||
      "https://apps.apple.com/app/id6742553503",
  },
  vendorStatsPlaceholder: "200+",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
};

export type CoverageZone = {
  id: string;
  label: string;
  inCoverage: boolean;
};

/** Representative Greater Accra service buckets for MVP checker UI */
export const coverageZones: CoverageZone[] = [
  { id: "east-legon", label: "East Legon and Adjacent", inCoverage: true },
  { id: "osu-ridge", label: "Osu, Ridge, Cantonments", inCoverage: true },
  { id: "circle-kasoa", label: "Circle, Lapaz, Achimota corridor", inCoverage: true },
  { id: "madina-adenta", label: "Madina, Adenta, Oyibi corridor", inCoverage: true },
  { id: "tema", label: "Tema Communities 1 to 12", inCoverage: true },
  { id: "spintex", label: "Spintex Road corridor", inCoverage: true },
  { id: "west-accra", label: "Kwashieman, Dansoman, Weija", inCoverage: true },
  { id: "north-coming", label: "Greater Kumasi (waitlist)", inCoverage: false },
  { id: "west-coming", label: "Takoradi corridor (waitlist)", inCoverage: false },
];
