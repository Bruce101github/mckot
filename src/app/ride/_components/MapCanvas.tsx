"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/lib/maps/useGoogleMaps";
import type { Coords } from "@/lib/api/booking";

// Accra city centre — default view before we have a pickup.
const DEFAULT_CENTER: Coords = [5.6037, -0.187];

// Light map theme — kept in sync with the Flutter app
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

export function MapCanvas({ pickup, dropoff, polyline, driver, driverBearing }: Props) {
  const state = useGoogleMaps();
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const pickupMarker = useRef<google.maps.Marker | null>(null);
  const dropoffMarker = useRef<google.maps.Marker | null>(null);
  const driverMarker = useRef<google.maps.Marker | null>(null);
  const routeLine = useRef<google.maps.Polyline | null>(null);

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

    // Fit the view to whatever we have. Skip while a driver is live — the
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

  // Live driver marker — updates on every location push without touching the
  // route/markers effect. Keeps the driver and the relevant endpoint in view.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current) return;
    const maps = state.maps;
    const map = mapRef.current;

    if (!driver) {
      if (driverMarker.current) {
        driverMarker.current.setMap(null);
        driverMarker.current = null;
      }
      return;
    }

    const pos = { lat: driver[0], lng: driver[1] };
    const icon: google.maps.Symbol = {
      path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
      fillColor: "#0B3B2D",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
      scale: 5,
      rotation: driverBearing ?? 0,
    };
    if (!driverMarker.current) {
      driverMarker.current = new maps.Marker({ map, icon, zIndex: 999 });
    } else {
      driverMarker.current.setIcon(icon);
    }
    driverMarker.current.setPosition(pos);

    // Keep the driver and the active endpoint (dropoff, else pickup) framed.
    const target = dropoff ?? pickup;
    if (target) {
      const bounds = new maps.LatLngBounds();
      bounds.extend(pos);
      bounds.extend({ lat: target[0], lng: target[1] });
      map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
    } else {
      map.setCenter(pos);
    }
  }, [state, driver, driverBearing, pickup, dropoff]);

  // Ambient "nearby vehicles" — purely decorative, like Uber's home map. No
  // real driver data: a steady set of cars and motorbikes drift gently within
  // the visible map. Every few seconds one fades out and reappears on another
  // road, so the mix keeps changing without the count flickering. Hidden
  // during an active trip so they don't compete with the real driver marker.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current || driver) return;
    const maps = state.maps;
    const map = mapRef.current;

    const COUNT = 5;
    const SWAP_MS = 3200; // how often a vehicle is cycled to a new road
    type Kind = "car" | "bike";

    const buildIcon = (kind: Kind, heading: number): google.maps.Icon => {
      const body =
        kind === "car"
          ? `<rect x='10' y='4' width='10' height='21' rx='3.5' fill='#1f2937'/>` +
            `<rect x='11.5' y='6.5' width='7' height='4.5' rx='1.5' fill='#9ca3af'/>` +
            `<rect x='11.5' y='18' width='7' height='3.5' rx='1.5' fill='#4b5563'/>`
          : `<rect x='13' y='7' width='4' height='16' rx='2' fill='#1f2937'/>` +
            `<rect x='10.5' y='9' width='9' height='2.4' rx='1.2' fill='#4b5563'/>` +
            `<circle cx='15' cy='8' r='1.8' fill='#111827'/>` +
            `<circle cx='15' cy='22' r='2' fill='#111827'/>`;
      const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>` +
        `<g transform='rotate(${heading.toFixed(0)} 15 15)'>${body}</g></svg>`;
      return {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
        anchor: new maps.Point(15, 15),
        scaledSize: new maps.Size(30, 30),
      };
    };

    // A random point inside the current viewport (inset from the edges so
    // vehicles sit on visible roads). Falls back to a spread around centre
    // before the map reports its bounds.
    const randomInView = () => {
      const b = map.getBounds();
      if (b) {
        const ne = b.getNorthEast();
        const sw = b.getSouthWest();
        const latPad = (ne.lat() - sw.lat()) * 0.12;
        const lngPad = (ne.lng() - sw.lng()) * 0.12;
        return {
          lat: sw.lat() + latPad + Math.random() * (ne.lat() - sw.lat() - 2 * latPad),
          lng: sw.lng() + lngPad + Math.random() * (ne.lng() - sw.lng() - 2 * lngPad),
        };
      }
      const c = map.getCenter();
      const cLat = c ? c.lat() : DEFAULT_CENTER[0];
      const cLng = c ? c.lng() : DEFAULT_CENTER[1];
      return { lat: cLat + (Math.random() - 0.5) * 0.02, lng: cLng + (Math.random() - 0.5) * 0.02 };
    };

    type Vehicle = {
      marker: google.maps.Marker;
      kind: Kind;
      lat: number;
      lng: number;
      heading: number;
      speed: number;
      iconHeading: number;
      opacity: number;
      target: number; // target opacity; 0 while being cycled out
      cycling: boolean;
    };

    const make = (): Vehicle => {
      const kind: Kind = Math.random() < 0.4 ? "bike" : "car";
      const p = randomInView();
      const heading = Math.random() * 360;
      const marker = new maps.Marker({
        map,
        position: p,
        icon: buildIcon(kind, heading),
        clickable: false,
        optimized: false,
        opacity: 0,
        zIndex: 1,
      });
      return {
        marker,
        kind,
        lat: p.lat,
        lng: p.lng,
        heading,
        iconHeading: heading,
        speed: kind === "bike" ? 0.000007 + Math.random() * 0.000006 : 0.000004 + Math.random() * 0.000005,
        opacity: 0,
        target: 1,
        cycling: false,
      };
    };

    const fleet: Vehicle[] = Array.from({ length: COUNT }, make);

    let raf = 0;
    let last = performance.now();
    let swapAccum = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const steps = dt / 16; // normalise to ~60fps

      // Periodically retire one vehicle so the visible mix keeps refreshing.
      swapAccum += dt;
      if (swapAccum >= SWAP_MS) {
        swapAccum = 0;
        const live = fleet.filter((v) => !v.cycling);
        const pick = live[Math.floor(Math.random() * live.length)];
        if (pick) {
          pick.cycling = true;
          pick.target = 0;
        }
      }

      for (const v of fleet) {
        v.heading += (Math.random() - 0.5) * 1.4 * steps;
        const rad = (v.heading * Math.PI) / 180;
        v.lat += Math.cos(rad) * v.speed * steps;
        v.lng += Math.sin(rad) * v.speed * steps;

        v.opacity += (v.target - v.opacity) * Math.min(1, 0.14 * steps);

        // Fully faded out and flagged for cycling → respawn on another road.
        if (v.cycling && v.opacity < 0.04) {
          const p = randomInView();
          v.kind = Math.random() < 0.4 ? "bike" : "car";
          v.lat = p.lat;
          v.lng = p.lng;
          v.heading = Math.random() * 360;
          v.iconHeading = v.heading;
          v.speed = v.kind === "bike" ? 0.000007 + Math.random() * 0.000006 : 0.000004 + Math.random() * 0.000005;
          v.marker.setIcon(buildIcon(v.kind, v.heading));
          v.cycling = false;
          v.target = 1;
        }

        v.marker.setPosition({ lat: v.lat, lng: v.lng });
        v.marker.setOpacity(Math.max(0, Math.min(1, v.opacity)));
        if (Math.abs(v.heading - v.iconHeading) > 4) {
          v.iconHeading = v.heading;
          v.marker.setIcon(buildIcon(v.kind, v.heading));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      fleet.forEach((v) => v.marker.setMap(null));
    };
  }, [state, driver]);

  return (
    <div className="absolute inset-0">
      <div ref={divRef} className="h-full w-full" />
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
