// Public delivery tracking: types and helpers shared by /track pages
// and the /api/track proxy. The backend view is
// GET /transport/track/<token>/ (ridehailing-backend
// transport/views/delivery_extras.py, public_track). The token is
// either a trip's share token or a vendor parcel's MCK tracking number.

export type TrackDrop = {
  address?: string;
  location?: string;
  lat?: number | null;
  lng?: number | null;
  recipient_name?: string;
};

export type TrackInfo = {
  status: string;
  tracking_number?: string;
  delivery_date?: string | null;
  scheduled_for?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  active_target_index?: number | null;
  drops: TrackDrop[];
  courier: { first_name: string; phone_tail: string; image: string | null } | null;
  live_location: { lat: number; lng: number; at: string } | null;
  proof_of_delivery_url?: string | null;
};

export type TrackResult =
  | { ok: true; info: TrackInfo }
  | { ok: false; notFound: boolean; message: string };

/** Accepts "MCK 109 315 039", "mck109315039" or a share token. */
export function normalizeTrackingInput(raw: string): string | null {
  let s = raw.trim();
  const fromUrl = s.match(/\/track\/([A-Za-z0-9-]+)\/?(?:[?#].*)?$/);
  if (fromUrl) s = fromUrl[1];
  s = s.replace(/\s+/g, "");
  if (/^mck\d{9}$/i.test(s)) return s.toUpperCase();
  return /^[A-Za-z0-9-]{6,64}$/.test(s) ? s : null;
}

export function isParcelNumber(token: string): boolean {
  return /^MCK\d{9}$/i.test(token);
}

/** MCK109315039 → "MCK 109 315 039". */
export function formatParcelNumber(token: string): string {
  const t = token.toUpperCase();
  return isParcelNumber(t) ? `MCK ${t.slice(3, 6)} ${t.slice(6, 9)} ${t.slice(9)}` : t;
}

export type Stage = 0 | 1 | 2 | 3;

export const STAGES = ["Booked", "Rider assigned", "On the way", "Delivered"] as const;

export type TrackView = {
  stage: Stage;
  headline: string;
  detail: string;
  tone: "progress" | "done" | "stopped";
  final: boolean;
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Africa/Accra",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Africa/Accra",
});

export function formatDay(iso: string): string {
  // Date-only strings ("2026-10-07") are calendar days, not instants.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00Z`) : new Date(iso);
  return dateFmt.format(d);
}

export function formatTime(iso: string): string {
  return timeFmt.format(new Date(iso)).replace(" ", "").toLowerCase();
}

export function describe(info: TrackInfo): TrackView {
  const s = info.status;
  switch (s) {
    case "booked":
    case "held":
      return {
        stage: 0,
        headline: "Booked",
        detail: info.delivery_date
          ? `Going out for delivery on ${formatDay(info.delivery_date)}. You can follow the rider here from then.`
          : "A rider is assigned when it goes out for delivery.",
        tone: "progress",
        final: false,
      };
    case "scheduled":
      return {
        stage: 0,
        headline: "Scheduled",
        detail: info.scheduled_for
          ? `Booked for ${formatDay(info.scheduled_for)} at ${formatTime(info.scheduled_for)}.`
          : "Booked for later today.",
        tone: "progress",
        final: false,
      };
    case "pooled":
    case "requested":
      return {
        stage: 0,
        headline: "Finding a rider",
        detail: "We're matching this delivery with a nearby rider.",
        tone: "progress",
        final: false,
      };
    case "accepted":
      return {
        stage: 1,
        headline: "Rider assigned",
        detail: "The rider is on the way to pick up the parcel.",
        tone: "progress",
        final: false,
      };
    case "dispatched":
    case "in progress":
      return {
        stage: 2,
        headline: "On the way",
        detail: "The parcel has been picked up and is on its way.",
        tone: "progress",
        final: false,
      };
    case "completed":
    case "delivered":
      return {
        stage: 3,
        headline: "Delivered",
        detail: info.completed_at
          ? `Delivered ${formatDay(info.completed_at)} at ${formatTime(info.completed_at)}.`
          : "This parcel has been delivered.",
        tone: "done",
        final: true,
      };
    case "failed":
      return {
        stage: 2,
        headline: "Delivery attempt failed",
        detail: "The rider couldn't complete this delivery. Contact us and we'll sort it out.",
        tone: "stopped",
        final: true,
      };
    case "cancelled":
      return {
        stage: 0,
        headline: "Cancelled",
        detail: "This delivery was cancelled.",
        tone: "stopped",
        final: true,
      };
    default:
      return { stage: 0, headline: "Booked", detail: "", tone: "progress", final: false };
  }
}

export function dropLabel(d: TrackDrop): string {
  return d.address || d.location || "Drop-off";
}
