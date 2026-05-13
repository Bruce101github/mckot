declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function trackWhatsAppClick(location = "unknown") {
  gtag("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: location,
  });
}

export function trackVendorSignupSubmit() {
  gtag("event", "vendor_signup_submit", {
    event_category: "conversion",
  });
}

export function trackPricingView() {
  gtag("event", "pricing_view", {
    event_category: "engagement",
  });
}

export function trackBlogReadComplete(slug: string) {
  gtag("event", "blog_read_complete", {
    event_category: "engagement",
    event_label: slug,
  });
}
