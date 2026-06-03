"use client";

const DEVICE_KEY = "mckot_site_device";

// Stable per-browser device id — backend ties tokens to (user, device).
export function getDeviceId(): string {
  if (typeof window === "undefined") return "web";
  let id = window.localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = `web-${crypto.randomUUID()}`;
    window.localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

// Build the backend phone format: country code + local number, no plus, no leading 0.
export function normalizePhone(local: string, phoneCode: string): string {
  const digits = local.replace(/\D/g, "").replace(/^0+/, "");
  const code = phoneCode.replace(/\D/g, "");
  return `${code}${digits}`;
}
