import { siteConfig } from "@/lib/site";

export const emailBrand = {
  colors: {
    page: "#EDF5EC",
    card: "#FFFFFF",
    surface: "#F4FAF3",
    border: "#CDEAC6",
    foreground: "#0C2F1D",
    foregroundMuted: "#3A5A4B",
    accent: "#A4D233",
    accentHover: "#8FB82B",
    dark: "#0B3B2D",
    darkSurface: "#0f2922",
    darkBorder: "#1f4036",
    darkForeground: "#F0F7EE",
    darkForegroundMuted: "rgba(240, 247, 238, 0.65)",
  },
  fonts: {
    sans: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  layout: {
    containerWidth: 600,
    bodyPadding: 32,
    radius: 12,
  },
  links: {
    site: siteConfig.url,
    logo: `${siteConfig.url}/email/logo.png`,
    whatsapp: siteConfig.social.whatsapp,
    whatsappChannel: siteConfig.social.whatsappChannel,
    instagram: siteConfig.social.instagram,
    facebook: siteConfig.social.facebook,
    tiktok: siteConfig.social.tiktok,
    contact: `${siteConfig.url}/contact`,
    privacy: `${siteConfig.url}/privacy`,
  },
  address: `${siteConfig.address.locality}, ${siteConfig.address.countryName}`,
  founder: { name: "Bruce", role: "Founder, Mckot" },
} as const;
