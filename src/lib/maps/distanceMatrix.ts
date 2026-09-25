import type { VendorPlace } from "@/lib/vendorPlaces";

export type DistanceResult = { place: VendorPlace; km: number | null };

const BATCH_SIZE = 25;
const BATCH_DELAY_MS = 150;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Real driving distance via the Google Maps JS Distance Matrix service
// (already loaded through useGoogleMaps' "routes" library). The class is
// flagged deprecated in @types/google.maps in favor of the server-side Routes
// API, but it's the only client-side many-destinations distance API Google
// ships in the JS SDK, and it's still fully supported. Batches destinations
// 25 at a time — the API's per-request limit — with a short stagger between
// batches to stay under QPS limits.
export async function computeDrivingDistances(
  maps: typeof google.maps,
  origin: { lat: number; lng: number },
  destinations: VendorPlace[],
  onProgress?: (done: number, total: number) => void,
): Promise<DistanceResult[]> {
  const service = new maps.DistanceMatrixService();
  const results: DistanceResult[] = [];

  for (let i = 0; i < destinations.length; i += BATCH_SIZE) {
    const batch = destinations.slice(i, i + BATCH_SIZE);

    try {
      const response = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: batch.map((p) => ({ lat: p.lat, lng: p.lng })),
            travelMode: maps.TravelMode.DRIVING,
            unitSystem: maps.UnitSystem.METRIC,
          },
          (res, status) => {
            if (status === "OK" && res) resolve(res);
            else reject(new Error(String(status)));
          },
        );
      });

      const elements = response.rows[0]?.elements ?? [];
      batch.forEach((place, idx) => {
        const el = elements[idx];
        results.push({ place, km: el?.status === "OK" ? el.distance.value / 1000 : null });
      });
    } catch {
      // One bad batch shouldn't sink the whole sheet — mark its places as unknown.
      batch.forEach((place) => results.push({ place, km: null }));
    }

    onProgress?.(results.length, destinations.length);
    if (i + BATCH_SIZE < destinations.length) await sleep(BATCH_DELAY_MS);
  }

  return results;
}
