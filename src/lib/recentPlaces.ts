import type { PlaceResult } from "@/lib/api/booking";

// Uber-style "recent locations", places the rider has previously chosen,
// kept client-side so they surface in the search dropdown before any typing.
const KEY = "mckot_recent_places";
const MAX = 5;

export function getRecentPlaces(): PlaceResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as PlaceResult[]) : [];
  } catch {
    return [];
  }
}

export function addRecentPlace(place: PlaceResult): PlaceResult[] {
  if (typeof window === "undefined") return [];
  const deduped = getRecentPlaces().filter((p) => p.address !== place.address);
  const next = [place, ...deduped].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private-mode errors */
  }
  return next;
}
