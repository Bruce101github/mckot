export const siteConfig = {
  name: "Mckot",
  tagline: "Logistics that scales with your business",
  description:
    "Same-day delivery in Accra for social commerce vendors. Mckot handles pickup, cash-on-delivery, and real-time tracking so Instagram, TikTok, and WhatsApp sellers can focus on selling.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mckot.com",
  locale: "en_GH",
  phones: {
    primary: "+233503305586",
    secondary: "+233548173087",
    primaryFormatted: "+233 50 330 5586",
    secondaryFormatted: "+233 54 817 3087",
  },
  address: {
    locality: "Accra",
    region: "Greater Accra",
    country: "GH",
    countryName: "Ghana",
  },
  social: {
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL ||
      "https://wa.me/233503305586?text=Hi%20Mckot%2C%20I%27d%20like%20to%20claim%20my%203%20free%20deliveries.",
    whatsappChannel:
      process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL ||
      "https://whatsapp.com/channel/0029VaXjCfzJkK7Hxqekhh26",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/mckot.com.gh",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/share/1E21vqQx25/",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@mckot.com",
  },
  app: {
    playStore:
      process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
      "https://play.google.com/store/apps/details?id=com.mckot.app",
    appStore:
      process.env.NEXT_PUBLIC_APP_STORE_URL ||
      "https://apps.apple.com/app/id6742553503",
  },
  offer: {
    headline: "3 free deliveries in your first 30 days",
    short: "3 free deliveries",
    days: 30,
  },
  vendorCount: "50",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
};

export type CoverageZone = {
  id: string;
  label: string;
  slug: string;
  neighborhoods: string[];
  inCoverage: boolean;
};

export const coverageZones: CoverageZone[] = [
  {
    id: "east-legon",
    label: "East Legon and Adjacent",
    slug: "east-legon",
    neighborhoods: ["East Legon", "East Legon Hills", "Adjiringanor", "American House"],
    inCoverage: true,
  },
  {
    id: "osu-ridge",
    label: "Osu, Ridge, Cantonments",
    slug: "osu",
    neighborhoods: ["Osu", "Ridge", "Cantonments", "Airport Residential"],
    inCoverage: true,
  },
  {
    id: "circle-kasoa",
    label: "Circle, Lapaz, Achimota corridor",
    slug: "achimota",
    neighborhoods: ["Circle", "Lapaz", "Achimota", "Kwashieman"],
    inCoverage: true,
  },
  {
    id: "madina-adenta",
    label: "Madina, Adenta, Oyibi corridor",
    slug: "madina",
    neighborhoods: ["Madina", "Adenta", "Oyibi", "Abokobi"],
    inCoverage: true,
  },
  {
    id: "tema",
    label: "Tema Communities 1 to 12",
    slug: "tema",
    neighborhoods: ["Tema Community 1", "Tema Community 2", "Tema Community 5", "Tema Community 11", "Tema Community 12", "Ashaiman"],
    inCoverage: true,
  },
  {
    id: "spintex",
    label: "Spintex Road corridor",
    slug: "spintex",
    neighborhoods: ["Spintex", "Baatsona", "Comm 18", "Nungua"],
    inCoverage: true,
  },
  {
    id: "west-accra",
    label: "Kwashieman, Dansoman, Weija",
    slug: "dansoman",
    neighborhoods: ["Dansoman", "Weija", "Kwashieman", "Mamprobi"],
    inCoverage: true,
  },
  {
    id: "north-coming",
    label: "Greater Kumasi (waitlist)",
    slug: "kumasi",
    neighborhoods: [],
    inCoverage: false,
  },
  {
    id: "west-coming",
    label: "Takoradi corridor (waitlist)",
    slug: "takoradi",
    neighborhoods: [],
    inCoverage: false,
  },
];
