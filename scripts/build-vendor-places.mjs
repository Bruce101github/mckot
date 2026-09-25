// Regenerates src/data/vendor-places.json from the GeoNames Ghana bulk dump
// (public domain-ish, CC BY 4.0 — https://download.geonames.org/export/dump/).
//
// Usage:
//   curl -O https://download.geonames.org/export/dump/GH.zip && unzip GH.zip
//   curl -O https://download.geonames.org/export/dump/admin2Codes.txt
//   node scripts/build-vendor-places.mjs ./GH.txt ./admin2Codes.txt
//
// Filters to Greater Accra (admin1 code "01"), populated-place feature class
// "P" (towns, suburbs, neighborhoods), and resolves each place's admin2 code
// to a human-readable district name for display/grouping in the UI.

import { readFileSync, writeFileSync } from "node:fs";

const [, , ghPath, admin2Path] = process.argv;
if (!ghPath || !admin2Path) {
  console.error("Usage: node build-vendor-places.mjs <GH.txt> <admin2Codes.txt>");
  process.exit(1);
}

const districtByCode = new Map();
for (const line of readFileSync(admin2Path, "utf8").split("\n")) {
  if (!line.startsWith("GH.01.")) continue;
  const [code, name] = line.split("\t");
  districtByCode.set(code.replace("GH.01.", ""), name);
}

// Only Latin-script, unaccented aliases are useful for local search — the
// raw column also carries translations in dozens of scripts/languages
// (e.g. Accra's alternatenames includes Cyrillic, Arabic, Vietnamese...).
const LATIN_ALIAS = /^[A-Za-z0-9 .'-]+$/;
const MAX_ALIASES = 6;

const places = [];
for (const line of readFileSync(ghPath, "utf8").split("\n")) {
  if (!line) continue;
  const cols = line.split("\t");
  const [geonameid, name, , altNames, lat, lng, featureClass, , , , admin1, admin2] = cols;
  if (admin1 !== "01" || featureClass !== "P") continue;

  const aliases = (altNames || "")
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a && LATIN_ALIAS.test(a) && a.toLowerCase() !== name.toLowerCase())
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .slice(0, MAX_ALIASES);

  places.push({
    id: Number(geonameid),
    name,
    aliases,
    district: districtByCode.get(admin2) || "Other",
    lat: Number(lat),
    lng: Number(lng),
  });
}

// Stable order: district, then name — makes the generated file easy to diff/review.
places.sort((a, b) => a.district.localeCompare(b.district) || a.name.localeCompare(b.name));

writeFileSync(
  new URL("../src/data/vendor-places.json", import.meta.url),
  JSON.stringify(places, null, 2) + "\n",
);

console.log(`Wrote ${places.length} places.`);
