import vendorPlacesData from "@/data/vendor-places.json";
// Spelling variants GeoNames doesn't record — add an entry here, keyed by
// geonameid, whenever a real search misses a place a vendor expects to find.
// Regenerating vendor-places.json from a fresh GeoNames dump won't touch this
// file.
import manualAliases from "@/data/vendor-place-aliases-manual.json";
// GeoNames' official name isn't always what people actually search for
// (e.g. "Medina Estates" vs. "Madina"). Entries here replace the display
// name; the old GeoNames name is kept as an alias so it still matches.
import nameOverrides from "@/data/vendor-place-name-overrides.json";

export type VendorPlace = {
  id: number;
  name: string;
  aliases: string[];
  district: string;
  lat: number;
  lng: number;
};

export const vendorPlaces: VendorPlace[] = (vendorPlacesData as VendorPlace[]).map((p) => {
  const extra = (manualAliases as Record<string, string[]>)[String(p.id)] ?? [];
  const override = (nameOverrides as Record<string, string>)[String(p.id)];
  const aliases = [...p.aliases, ...extra];

  if (!override) return extra.length ? { ...p, aliases } : p;

  return {
    ...p,
    name: override,
    aliases: [...aliases, p.name].filter((a) => a.toLowerCase() !== override.toLowerCase()),
  };
});

export function searchVendorPlaces(query: string, limit = 20): VendorPlace[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return vendorPlaces
    .filter((p) => p.name.toLowerCase().includes(q) || p.aliases.some((a) => a.toLowerCase().includes(q)))
    .slice(0, limit);
}

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Straight-line nearest match — used only to label a geolocated pickup with a
// friendly place name. Actual rate distances always come from Directions/
// Distance Matrix (real driving distance), never this approximation.
export function nearestVendorPlace(lat: number, lng: number): VendorPlace {
  let best = vendorPlaces[0];
  let bestKm = Infinity;
  for (const p of vendorPlaces) {
    const km = haversineKm(lat, lng, p.lat, p.lng);
    if (km < bestKm) {
      bestKm = km;
      best = p;
    }
  }
  return best;
}
