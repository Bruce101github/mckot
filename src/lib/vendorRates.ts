// Vendor delivery rate card — edit the numbers here to update pricing
// everywhere the calculator and rate sheet use it.

export const VENDOR_RATE_TIERS = [
  { maxKm: 15, price: 35 },
  { maxKm: 25, price: 50 },
  { maxKm: 30, price: 60 },
] as const;

// Applies beyond the last fixed tier above.
export const VENDOR_RATE_BEYOND = {
  afterKm: 30,
  basePrice: 70,
  perKm: 2,
};

export function calcVendorRate(distanceKm: number): number {
  for (const tier of VENDOR_RATE_TIERS) {
    if (distanceKm <= tier.maxKm) return tier.price;
  }
  const extraKm = Math.max(0, distanceKm - VENDOR_RATE_BEYOND.afterKm);
  return Math.round(VENDOR_RATE_BEYOND.basePrice + extraKm * VENDOR_RATE_BEYOND.perKm);
}
