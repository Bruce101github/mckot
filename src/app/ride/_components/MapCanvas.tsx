"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useGoogleMaps } from "@/lib/maps/useGoogleMaps";
import type { Coords } from "@/lib/api/booking";

// Accra city centre, default view before we have a pickup.
const DEFAULT_CENTER: Coords = [5.6037, -0.187];

// Light map theme, kept in sync with the Flutter app
// (ridehailing-mobile/assets/map_style.json) so web and mobile look identical.
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9a9a9a" }] },
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#7d7d7d" }, { visibility: "on" }] },
  { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#b0b0b0" }, { visibility: "on" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#fafafa" }] },
  { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#f3f3f3" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#eef3ec" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#fafafa" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ededed" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e3e3e3" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#d8d8d8" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#9a9a9a" }, { visibility: "on" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#e8eef2" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#a8b3bc" }] },
];

type Props = {
  pickup: Coords | null;
  dropoff: Coords | null;
  // Encoded polyline segments from estimate_route (one per step).
  polyline?: string[] | null;
  // Live driver position pushed over the Centrifugo trip channel (Phase 3).
  driver?: Coords | null;
  // Heading in degrees, used to point the driver marker.
  driverBearing?: number;
  // True while a trip is live (step === "active"). Hides the ambient/decorative
  // vehicles even before the first real driver fix arrives.
  activeTrip?: boolean;
  // "Set location on map" mode, a fixed centre pin the rider pans under.
  // The map reports its centre (reverse-geocoded) up to the panel, which owns
  // the confirm / cancel controls.
  picking?: boolean;
  onPickPointChange?: (p: { coords: Coords; address: string | null }) => void;
};

function pinIcon(maps: typeof google.maps, color: string): google.maps.Symbol {
  return {
    path: maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 3,
    scale: 7,
  };
}

// Same motorbike art the ambient fleet uses (landscape, points east → -90 to
// face heading 0). Embedded in a rotated SVG so the marker can point along the
// rider's heading. Used for the live driver marker on an active trip.
const BIKE_ART = { src: "/vehicles/bike.png", w: 1118, h: 610, offset: -90 };

function bikeIcon(
  maps: typeof google.maps,
  dataUrl: string,
  heading: number,
): google.maps.Icon {
  const BOX = 56;
  const LEN = 44;
  const scale = LEN / Math.max(BIKE_ART.w, BIKE_ART.h);
  const w = BIKE_ART.w * scale;
  const h = BIKE_ART.h * scale;
  const x = (BOX - w) / 2;
  const y = (BOX - h) / 2;
  const angle = ((((heading % 360) + 360) % 360) + BIKE_ART.offset).toFixed(1);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${BOX}' height='${BOX}' viewBox='0 0 ${BOX} ${BOX}'>` +
    `<image href='${dataUrl}' x='${x.toFixed(2)}' y='${y.toFixed(2)}' width='${w.toFixed(2)}' height='${h.toFixed(2)}' ` +
    `transform='rotate(${angle} ${BOX / 2} ${BOX / 2})'/></svg>`;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    anchor: new maps.Point(BOX / 2, BOX / 2),
    scaledSize: new maps.Size(BOX, BOX),
  };
}

// Shortest signed angle (deg) from b to a, in (-180, 180].
function angleDelta(a: number, b: number): number {
  return ((a - b + 540) % 360) - 180;
}

export function MapCanvas({
  pickup,
  dropoff,
  polyline,
  driver,
  driverBearing,
  activeTrip,
  picking,
  onPickPointChange,
}: Props) {
  const state = useGoogleMaps();
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const pickupMarker = useRef<google.maps.Marker | null>(null);
  const dropoffMarker = useRef<google.maps.Marker | null>(null);
  const driverMarker = useRef<google.maps.Marker | null>(null);
  // Smoothly animate the bike between location pushes (refs survive re-renders).
  const driverRaf = useRef<number | null>(null);
  const driverPos = useRef<google.maps.LatLng | null>(null);
  const driverHeading = useRef<number>(0);
  const driverBucket = useRef<number | null>(null);
  const routeLine = useRef<google.maps.Polyline | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  // Keep the latest callback without re-subscribing the idle listener.
  const pickCb = useRef(onPickPointChange);
  pickCb.current = onPickPointChange;

  // Motorbike art for the live driver marker, loaded once as a data URL so it
  // can be embedded in a rotated SVG icon. Until it resolves the driver marker
  // falls back to a simple arrow.
  const [bikeUrl, setBikeUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(BIKE_ART.src)
      .then((r) => r.blob())
      .then(
        (b) =>
          new Promise<string>((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(fr.result as string);
            fr.onerror = rej;
            fr.readAsDataURL(b);
          }),
      )
      .then((url) => {
        if (!cancelled) setBikeUrl(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Init the map once Maps is ready.
  useEffect(() => {
    if (state.status !== "ready" || !divRef.current || mapRef.current) return;
    const maps = state.maps;
    const div = divRef.current;
    const map = new maps.Map(div, {
      center: { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] },
      zoom: 13,
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "greedy",
      // Mirrors the Flutter app's light map theme (ridehailing-mobile/assets/map_style.json).
      styles: MAP_STYLE,
    });
    mapRef.current = map;

    // The map can initialize before the flex layout has given its container a
    // real size, leaving it blank until something fires a resize. Observe the
    // container and re-render the map (re-centering) whenever its size changes.
    const ro = new ResizeObserver(() => {
      const center = map.getCenter();
      maps.event.trigger(map, "resize");
      if (center) map.setCenter(center);
    });
    ro.observe(div);
    return () => ro.disconnect();
  }, [state]);

  // Sync markers + route whenever inputs change.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current) return;
    const maps = state.maps;
    const map = mapRef.current;

    // Pickup marker
    if (pickup) {
      const pos = { lat: pickup[0], lng: pickup[1] };
      if (!pickupMarker.current) {
        pickupMarker.current = new maps.Marker({ map, icon: pinIcon(maps, "#0B3B2D") });
      }
      pickupMarker.current.setPosition(pos);
    } else if (pickupMarker.current) {
      pickupMarker.current.setMap(null);
      pickupMarker.current = null;
    }

    // Dropoff marker
    if (dropoff) {
      const pos = { lat: dropoff[0], lng: dropoff[1] };
      if (!dropoffMarker.current) {
        dropoffMarker.current = new maps.Marker({ map, icon: pinIcon(maps, "#A4D233") });
      }
      dropoffMarker.current.setPosition(pos);
    } else if (dropoffMarker.current) {
      dropoffMarker.current.setMap(null);
      dropoffMarker.current = null;
    }

    // Route polyline (decoded from estimate segments)
    if (routeLine.current) {
      routeLine.current.setMap(null);
      routeLine.current = null;
    }
    if (polyline && polyline.length > 0) {
      const path: google.maps.LatLng[] = [];
      for (const seg of polyline) {
        try {
          path.push(...maps.geometry.encoding.decodePath(seg));
        } catch {
          /* skip malformed segment */
        }
      }
      if (path.length > 1) {
        routeLine.current = new maps.Polyline({
          map,
          path,
          strokeColor: "#A4D233",
          strokeOpacity: 1,
          strokeWeight: 6,
        });
      }
    }

    // Fit the view to whatever we have. Skip while a driver is live, the
    // driver effect owns the viewport then, so the map doesn't fight the
    // user's pan as location pushes arrive.
    if (driver) {
      // leave viewport to the driver effect
    } else if (pickup && dropoff) {
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat: pickup[0], lng: pickup[1] });
      bounds.extend({ lat: dropoff[0], lng: dropoff[1] });
      if (routeLine.current) {
        routeLine.current.getPath().forEach((p) => bounds.extend(p));
      }
      map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
    } else if (pickup) {
      map.setCenter({ lat: pickup[0], lng: pickup[1] });
      map.setZoom(15);
    }
  }, [state, pickup, dropoff, polyline, driver]);

  // Live driver marker, animates smoothly between location pushes so the bike
  // glides along the road rather than teleporting on each fix. Until the first
  // live fix arrives the bike is parked at the pickup end of the route, so an
  // active trip always shows exactly one rider on the line.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current) return;
    const maps = state.maps;
    const map = mapRef.current;
    const spherical = maps.geometry.spherical;

    const at = driver ?? (activeTrip ? pickup : null);
    if (!at) {
      if (driverRaf.current != null) cancelAnimationFrame(driverRaf.current);
      driverRaf.current = null;
      driverPos.current = null;
      driverBucket.current = null;
      if (driverMarker.current) {
        driverMarker.current.setMap(null);
        driverMarker.current = null;
      }
      return;
    }

    const target = new maps.LatLng(at[0], at[1]);
    const targetHeading = driverBearing ?? driverHeading.current;

    // Build the bike icon (PNG embedded in a rotated SVG), rebuilt only when
    // the heading crosses a 12° bucket. Falls back to a cheap arrow Symbol
    // until the art has loaded.
    const applyIcon = (heading: number) => {
      if (!driverMarker.current) return;
      if (!bikeUrl) {
        driverMarker.current.setIcon({
          path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: "#0B3B2D",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 5,
          rotation: heading,
        });
        return;
      }
      const bucket = Math.round((((heading % 360) + 360) % 360) / 12) * 12;
      if (bucket === driverBucket.current) return;
      driverBucket.current = bucket;
      driverMarker.current.setIcon(bikeIcon(maps, bikeUrl, bucket));
    };

    // First appearance: drop the marker straight at the target, no animation.
    if (!driverMarker.current) {
      driverMarker.current = new maps.Marker({ map, zIndex: 999, optimized: false });
      driverMarker.current.setPosition(target);
      driverPos.current = target;
      driverHeading.current = targetHeading;
      driverBucket.current = null;
      applyIcon(targetHeading);
    } else {
      // Animate from where the bike currently is to the new fix.
      const from = driverPos.current ?? target;
      const fromHeading = driverHeading.current;
      const dist = spherical.computeDistanceBetween(from, target);
      if (driverRaf.current != null) cancelAnimationFrame(driverRaf.current);

      if (dist < 0.5) {
        driverMarker.current.setPosition(target);
        driverPos.current = target;
        driverHeading.current = targetHeading;
        applyIcon(targetHeading);
      } else {
        // Glide over ~1s, but snap large GPS jumps (>3km) to avoid a long crawl.
        const DURATION = dist > 3000 ? 0 : 1000;
        const start = performance.now();
        const step = (now: number) => {
          const k = DURATION === 0 ? 1 : Math.min(1, (now - start) / DURATION);
          const lat = from.lat() + (target.lat() - from.lat()) * k;
          const lng = from.lng() + (target.lng() - from.lng()) * k;
          const p = new maps.LatLng(lat, lng);
          const h = fromHeading + angleDelta(targetHeading, fromHeading) * k;
          driverMarker.current!.setPosition(p);
          driverPos.current = p;
          driverHeading.current = h;
          applyIcon(h);
          driverRaf.current = k < 1 ? requestAnimationFrame(step) : null;
        };
        driverRaf.current = requestAnimationFrame(step);
      }
    }

    // Keep the bike and the trip's far endpoint framed. Once a live fix exists
    // we follow the driver; before that we frame the whole pickup→dropoff line.
    const frameTarget = driver ? dropoff ?? pickup : dropoff;
    if (frameTarget) {
      const bounds = new maps.LatLngBounds();
      bounds.extend(target);
      bounds.extend({ lat: frameTarget[0], lng: frameTarget[1] });
      map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
    } else {
      map.setCenter(target);
    }

    return () => {
      if (driverRaf.current != null) cancelAnimationFrame(driverRaf.current);
      driverRaf.current = null;
    };
  }, [state, driver, driverBearing, pickup, dropoff, bikeUrl, activeTrip]);

  // "Set location on map", while picking, report the map centre (the point
  // under the fixed pin) up to the panel, reverse-geocoded to a street address.
  // Re-reports on every pan (idle) so the address tracks the pin live.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current || !picking) return;
    const maps = state.maps;
    const map = mapRef.current;
    if (!geocoder.current) geocoder.current = new maps.Geocoder();
    let cancelled = false;

    const report = () => {
      const c = map.getCenter();
      if (!c) return;
      const coords: Coords = [c.lat(), c.lng()];
      pickCb.current?.({ coords, address: null });
      geocoder.current!.geocode({ location: { lat: coords[0], lng: coords[1] } }, (results, status) => {
        if (cancelled) return;
        const address = status === "OK" && results && results[0] ? results[0].formatted_address : null;
        pickCb.current?.({ coords, address });
      });
    };

    const listener = map.addListener("idle", report);
    report();
    return () => {
      cancelled = true;
      maps.event.removeListener(listener);
    };
  }, [state, picking]);

  // Ambient "nearby vehicles", purely decorative, like Uber's home map. No
  // real driver data: a steady set of cars and motorbikes follow real roads
  // by travelling along Directions routes computed within the visible map.
  // Every few seconds one fades out and reappears on another road, so the mix
  // keeps changing without the count flickering. Hidden during an active trip
  // so they don't compete with the real driver marker. If the Directions API
  // isn't available on the key, vehicles fall back to a gentle free drift.
  useEffect(() => {
    // Hidden during an active trip (so the decorative fleet doesn't compete with
    // the real rider marker, even before the first driver fix) and while the
    // rider is setting a location on the map (the centre pin shouldn't fight
    // decoration).
    if (state.status !== "ready" || !mapRef.current || activeTrip || driver || picking) return;
    const maps = state.maps;
    const map = mapRef.current;
    const spherical = maps.geometry.spherical;

    const COUNT = 4;
    const SWAP_MS = 3200; // how often a vehicle is cycled to a new road
    const POOL_SIZE = 8; // road paths kept on hand for vehicles to travel
    const REGEN_M = 1500; // regenerate the pool if the map pans this far
    type Kind = "car" | "bike";

    // The same top-down car/motorbike art the Flutter app uses as map markers
    // (ridehailing-mobile/assets/images/{car,bike}_marker.png). We embed each in
    // an SVG and rotate it to face the road. The car art is portrait and points
    // north; the bike art is landscape and points east, so each kind carries a
    // base rotation offset that aligns its "front" to heading 0 before we add
    // the travel bearing.
    const ART: Record<Kind, { src: string; w: number; h: number; offset: number }> = {
      car: { src: "/vehicles/car.png", w: 137, h: 192, offset: 0 },
      bike: { src: "/vehicles/bike.png", w: 1118, h: 610, offset: -90 },
    };
    const BOX = 48; // square marker canvas (roomy enough for the rotated diagonal)
    const LEN = 36; // rendered length of the longest art dimension
    let dataUrls: Partial<Record<Kind, string>> = {};
    let assetsReady = false;

    const toDataUrl = (src: string) =>
      fetch(src)
        .then((r) => r.blob())
        .then(
          (b) =>
            new Promise<string>((res, rej) => {
              const fr = new FileReader();
              fr.onload = () => res(fr.result as string);
              fr.onerror = rej;
              fr.readAsDataURL(b);
            }),
        );
    Promise.all([toDataUrl(ART.car.src), toDataUrl(ART.bike.src)]).then(([car, bike]) => {
      dataUrls = { car, bike };
      assetsReady = true;
    });

    // Cache one icon per kind + heading bucket so we don't rebuild the (large,
    // base64-embedded) SVG every frame.
    const iconCache = new Map<string, google.maps.Icon>();
    const buildIcon = (kind: Kind, heading: number): google.maps.Icon | null => {
      const data = dataUrls[kind];
      if (!data) return null;
      const bucket = Math.round((((heading % 360) + 360) % 360) / 12) * 12;
      const key = `${kind}:${bucket}`;
      const cached = iconCache.get(key);
      if (cached) return cached;
      const art = ART[kind];
      const scale = LEN / Math.max(art.w, art.h);
      const w = art.w * scale;
      const h = art.h * scale;
      const x = (BOX - w) / 2;
      const y = (BOX - h) / 2;
      const angle = bucket + art.offset;
      const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${BOX}' height='${BOX}' viewBox='0 0 ${BOX} ${BOX}'>` +
        `<image href='${data}' x='${x.toFixed(2)}' y='${y.toFixed(2)}' width='${w.toFixed(2)}' height='${h.toFixed(2)}' ` +
        `transform='rotate(${angle} ${BOX / 2} ${BOX / 2})'/></svg>`;
      const icon: google.maps.Icon = {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
        anchor: new maps.Point(BOX / 2, BOX / 2),
        scaledSize: new maps.Size(BOX, BOX),
      };
      iconCache.set(key, icon);
      return icon;
    };

    // Cars are temporarily disabled (we have few on the road right now); the
    // ambient fleet is bikes only. Restore the random mix to bring cars back.
    const rndKind = (): Kind => "bike";
    // metres travelled per ~16ms frame; bikes a touch quicker. Kept gentle so
    // the traffic reads as calm ambient motion, not a race.
    const speedFor = (kind: Kind) =>
      kind === "bike" ? 0.42 + Math.random() * 0.26 : 0.3 + Math.random() * 0.2;

    // A random point inside the current viewport (inset from the edges).
    const randomInView = () => {
      const b = map.getBounds();
      if (b) {
        const ne = b.getNorthEast();
        const sw = b.getSouthWest();
        const latPad = (ne.lat() - sw.lat()) * 0.12;
        const lngPad = (ne.lng() - sw.lng()) * 0.12;
        return new maps.LatLng(
          sw.lat() + latPad + Math.random() * (ne.lat() - sw.lat() - 2 * latPad),
          sw.lng() + lngPad + Math.random() * (ne.lng() - sw.lng() - 2 * lngPad),
        );
      }
      const c = map.getCenter();
      const cLat = c ? c.lat() : DEFAULT_CENTER[0];
      const cLng = c ? c.lng() : DEFAULT_CENTER[1];
      return new maps.LatLng(cLat + (Math.random() - 0.5) * 0.02, cLng + (Math.random() - 0.5) * 0.02);
    };

    // ── Road-path pool ────────────────────────────────────────────────
    const ds = new maps.DirectionsService();
    let pool: google.maps.LatLng[][] = [];
    let poolCenter: google.maps.LatLng | null = null;
    let directionsAvailable = true; // flips false if the API is denied
    let directionsTried = false; // true once the first batch resolves
    let generating = false;

    const genPool = () => {
      if (generating || !map.getBounds()) return;
      generating = true;
      const next: google.maps.LatLng[][] = [];
      let pending = POOL_SIZE;
      for (let i = 0; i < POOL_SIZE; i++) {
        ds.route(
          { origin: randomInView(), destination: randomInView(), travelMode: maps.TravelMode.DRIVING },
          (res, status) => {
            pending -= 1;
            if (status === maps.DirectionsStatus.OK) {
              const path = res?.routes?.[0]?.overview_path;
              if (path && path.length > 1) next.push(path);
            } else if (status !== maps.DirectionsStatus.ZERO_RESULTS) {
              directionsAvailable = false; // denied / over-limit → fall back
            }
            if (pending === 0) {
              generating = false;
              directionsTried = true;
              if (next.length) {
                pool = next;
                poolCenter = map.getCenter() ?? null;
              }
            }
          },
        );
      }
    };

    const LOOKAHEAD_M = 28; // sample the bearing this far ahead to avoid jitter
    // Shortest signed angle (deg) from b to a, in (-180, 180].
    const angleDiff = (a: number, b: number) => ((a - b + 540) % 360) - 180;

    // Total length of a pool path in metres.
    const pathLen = (path: google.maps.LatLng[]) => {
      let d = 0;
      for (let i = 0; i < path.length - 1; i++) d += spherical.computeDistanceBetween(path[i], path[i + 1]);
      return d;
    };

    // Walk `dist` metres along a path from (seg,t); pure, returns the new
    // cursor, its position, and whether the path end was reached.
    const walk = (path: google.maps.LatLng[], seg: number, t: number, dist: number) => {
      let s = seg;
      let tt = t;
      let rem = dist;
      while (rem > 0 && s < path.length - 1) {
        const segLen = spherical.computeDistanceBetween(path[s], path[s + 1]) || 0.0001;
        const remOnSeg = (1 - tt) * segLen;
        if (rem < remOnSeg) {
          tt += rem / segLen;
          rem = 0;
        } else {
          rem -= remOnSeg;
          s += 1;
          tt = 0;
        }
      }
      const a = path[Math.min(s, path.length - 2)];
      const b = path[Math.min(s + 1, path.length - 1)];
      return { seg: s, t: tt, pos: spherical.interpolate(a, b, Math.min(1, tt)), atEnd: s >= path.length - 1 };
    };

    type Vehicle = {
      marker: google.maps.Marker;
      kind: Kind;
      // road-follow state
      pathIndex: number;
      seg: number; // current vertex index along the path
      t: number; // 0..1 progress within the current segment
      pos: google.maps.LatLng;
      heading: number; // travel bearing (target)
      dispHeading: number; // smoothed bearing actually drawn
      speed: number;
      iconHeading: number;
      opacity: number;
      target: number; // target opacity; 0 while being cycled out
      cycling: boolean;
      hasIcon: boolean; // false until the art is loaded + first applied
    };

    // Apply the current kind/heading art to a marker once the PNGs are loaded.
    const applyIcon = (v: Vehicle) => {
      const icon = buildIcon(v.kind, v.dispHeading);
      if (icon) {
        v.marker.setIcon(icon);
        v.iconHeading = v.dispHeading;
        v.hasIcon = true;
      }
    };

    const make = (): Vehicle => {
      const kind = rndKind();
      const heading = Math.random() * 360;
      const pos = randomInView();
      const marker = new maps.Marker({
        map,
        position: pos,
        clickable: false,
        optimized: false,
        opacity: 0,
        zIndex: 1,
      });
      return {
        marker,
        kind,
        pathIndex: -1,
        seg: 0,
        t: 0,
        pos,
        heading,
        dispHeading: heading,
        iconHeading: heading,
        speed: speedFor(kind),
        opacity: 0,
        target: 0,
        cycling: false,
        hasIcon: false,
      };
    };

    // Minimum gap between vehicles (metres) so the markers keep clear air at
    // the current zoom, roughly three marker-widths of separation.
    const minGapM = () => {
      const b = map.getBounds();
      const px = divRef.current?.clientWidth ?? 400;
      if (!b) return 250;
      const widthM = spherical.computeDistanceBetween(
        new maps.LatLng(b.getSouthWest().lat(), b.getSouthWest().lng()),
        new maps.LatLng(b.getSouthWest().lat(), b.getNorthEast().lng()),
      );
      return Math.min(widthM * 0.4, Math.max(140, (widthM / px) * 120));
    };

    // True if `pos` would crowd another committed vehicle.
    const tooClose = (pos: google.maps.LatLng, self: Vehicle, gap: number) =>
      fleet.some(
        (o) => o !== self && !o.cycling && o.pathIndex >= 0 && spherical.computeDistanceBetween(pos, o.pos) < gap,
      );

    // Pool path currently carrying the fewest vehicles (random tie-break) so we
    // don't stack several cars onto one road.
    const leastBusyPath = () => {
      const counts = pool.map(() => 0);
      for (const o of fleet) if (o.pathIndex >= 0 && o.pathIndex < counts.length) counts[o.pathIndex] += 1;
      const order = pool.map((_, i) => i).sort(() => Math.random() - 0.5);
      let best = order[0];
      for (const i of order) if (counts[i] < counts[best]) best = i;
      return best;
    };

    // Drop a vehicle onto a quiet road at a random offset, far enough from the
    // others that they don't pile up or run into each other.
    const placeFresh = (v: Vehicle): boolean => {
      if (!pool.length) return false;
      const gap = minGapM();
      let fallback: { idx: number; w: ReturnType<typeof walk> } | null = null;
      let chosen: { idx: number; w: ReturnType<typeof walk> } | null = null;
      for (let attempt = 0; attempt < 10; attempt++) {
        const idx = leastBusyPath();
        const path = pool[idx];
        const w = walk(path, 0, 0, Math.random() * pathLen(path));
        if (!fallback) fallback = { idx, w };
        if (!tooClose(w.pos, v, gap)) {
          chosen = { idx, w };
          break;
        }
      }
      const pick = chosen ?? fallback;
      if (!pick) return false;
      v.pathIndex = pick.idx;
      v.seg = pick.w.seg;
      v.t = pick.w.t;
      v.pos = pick.w.pos;
      v.kind = rndKind();
      v.speed = speedFor(v.kind);
      const look = walk(pool[pick.idx], v.seg, v.t, LOOKAHEAD_M);
      if (spherical.computeDistanceBetween(v.pos, look.pos) > 1) v.heading = spherical.computeHeading(v.pos, look.pos);
      v.dispHeading = v.heading;
      applyIcon(v);
      return true;
    };

    const fleet: Vehicle[] = Array.from({ length: COUNT }, make);

    genPool();
    const idleListener = maps.event.addListener(map, "idle", () => {
      if (!directionsAvailable) return;
      const c = map.getCenter();
      if (!c) return;
      if (!poolCenter || spherical.computeDistanceBetween(c, poolCenter) > REGEN_M) genPool();
    });

    let raf = 0;
    let last = performance.now();
    let swapAccum = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const steps = dt / 16; // normalise to ~60fps
      const roadMode = directionsAvailable && pool.length > 0;

      // Periodically retire one vehicle so the visible mix keeps refreshing.
      swapAccum += dt;
      if (swapAccum >= SWAP_MS) {
        swapAccum = 0;
        const live = fleet.filter((v) => !v.cycling && v.opacity > 0.5);
        const pick = live[Math.floor(Math.random() * live.length)];
        if (pick) {
          pick.cycling = true;
          pick.target = 0;
        }
      }

      for (const v of fleet) {
        if (!assetsReady) {
          // Stay hidden until the car/bike art has loaded.
          v.target = 0;
        } else if (roadMode) {
          if (v.pathIndex < 0 || v.pathIndex >= pool.length) {
            // Needs a path (first frame, or pool was regenerated).
            if (placeFresh(v)) v.target = v.cycling ? 0 : 1;
          } else if (!v.cycling) {
            const adv = walk(pool[v.pathIndex], v.seg, v.t, v.speed * steps);
            v.seg = adv.seg;
            v.t = adv.t;
            v.pos = adv.pos;
            if (adv.atEnd) {
              // Reached the end of the road → fade out and re-route.
              v.cycling = true;
              v.target = 0;
            } else {
              const look = walk(pool[v.pathIndex], v.seg, v.t, LOOKAHEAD_M);
              if (spherical.computeDistanceBetween(v.pos, look.pos) > 1) {
                v.heading = spherical.computeHeading(v.pos, look.pos);
              }
              v.target = 1;
            }
          }
        } else {
          // Free-drift fallback (Directions unavailable).
          v.target = directionsTried && !v.cycling ? 1 : v.target;
          if (!v.cycling) {
            v.heading += (Math.random() - 0.5) * 0.8 * steps;
            v.pos = spherical.computeOffset(v.pos, v.speed * steps, v.heading);
          }
        }

        // Ease the drawn bearing toward the travel bearing so turns are smooth
        // rather than snapping at every road bend.
        v.dispHeading += angleDiff(v.heading, v.dispHeading) * Math.min(1, 0.12 * steps);
        v.opacity += (v.target - v.opacity) * Math.min(1, 0.14 * steps);

        // Fully faded out and flagged for cycling → reappear, well spaced.
        if (v.cycling && v.opacity < 0.04) {
          if (roadMode) {
            if (placeFresh(v)) {
              v.cycling = false;
              v.target = 1;
            }
          } else {
            v.kind = rndKind();
            v.pos = randomInView();
            v.heading = Math.random() * 360;
            v.dispHeading = v.heading;
            v.speed = speedFor(v.kind);
            applyIcon(v);
            v.cycling = false;
            v.target = 1;
          }
        }

        v.marker.setPosition(v.pos);
        v.marker.setOpacity(Math.max(0, Math.min(1, v.opacity)));
        if (assetsReady && (!v.hasIcon || Math.abs(angleDiff(v.dispHeading, v.iconHeading)) > 8)) {
          applyIcon(v);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      maps.event.removeListener(idleListener);
      fleet.forEach((v) => v.marker.setMap(null));
    };
  }, [state, driver, picking, activeTrip]);

  return (
    <div className="absolute inset-0">
      <div ref={divRef} className="h-full w-full" />

      {picking && (
        // Fixed centre pin, its tip marks the point that will be saved. The
        // rider pans the map under it; the panel shows the live address.
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <MapPin
            className="h-10 w-10 -translate-y-1/2 fill-brand-dark text-white drop-shadow-md"
            strokeWidth={1.5}
          />
        </div>
      )}

      {state.status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-dark" />
        </div>
      )}
      {state.status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white px-6 text-center">
          <p className="max-w-xs text-sm text-brand-foreground/60">
            The map couldn&apos;t load. You can still set your pickup and destination to book.
          </p>
        </div>
      )}
    </div>
  );
}
