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
  // real driver data: a steady set of cars and motorbikes follow real roads
  // by travelling along Directions routes computed within the visible map.
  // Every few seconds one fades out and reappears on another road, so the mix
  // keeps changing without the count flickering. Hidden during an active trip
  // so they don't compete with the real driver marker. If the Directions API
  // isn't available on the key, vehicles fall back to a gentle free drift.
  useEffect(() => {
    if (state.status !== "ready" || !mapRef.current || driver) return;
    const maps = state.maps;
    const map = mapRef.current;
    const spherical = maps.geometry.spherical;

    const COUNT = 5;
    const SWAP_MS = 3200; // how often a vehicle is cycled to a new road
    const POOL_SIZE = 6; // road paths kept on hand for vehicles to travel
    const REGEN_M = 1500; // regenerate the pool if the map pans this far
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

    const rndKind = (): Kind => (Math.random() < 0.4 ? "bike" : "car");
    // metres travelled per ~16ms frame; bikes a touch quicker
    const speedFor = (kind: Kind) =>
      kind === "bike" ? 0.7 + Math.random() * 0.5 : 0.45 + Math.random() * 0.4;

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

    // Pick a pool path; return its index, or -1 if the pool is empty.
    const pickPath = () => (pool.length ? Math.floor(Math.random() * pool.length) : -1);

    type Vehicle = {
      marker: google.maps.Marker;
      kind: Kind;
      // road-follow state
      pathIndex: number;
      seg: number; // current vertex index along the path
      t: number; // 0..1 progress within the current segment
      // drift fallback state
      pos: google.maps.LatLng;
      heading: number;
      speed: number;
      iconHeading: number;
      opacity: number;
      target: number; // target opacity; 0 while being cycled out
      cycling: boolean;
    };

    const make = (): Vehicle => {
      const kind = rndKind();
      const heading = Math.random() * 360;
      const pos = randomInView();
      const marker = new maps.Marker({
        map,
        position: pos,
        icon: buildIcon(kind, heading),
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
        iconHeading: heading,
        speed: speedFor(kind),
        opacity: 0,
        target: 0,
        cycling: false,
      };
    };

    // Place a vehicle at the start of a fresh pool path with a new look.
    const assignPath = (v: Vehicle, idx: number) => {
      v.pathIndex = idx;
      v.seg = 0;
      v.t = 0;
      v.kind = rndKind();
      v.speed = speedFor(v.kind);
      const path = pool[idx];
      v.pos = path[0];
      v.heading = spherical.computeHeading(path[0], path[1]);
      v.iconHeading = v.heading;
      v.marker.setIcon(buildIcon(v.kind, v.heading));
    };

    // Advance a vehicle `dist` metres along its assigned road path.
    const advanceAlong = (v: Vehicle, dist: number) => {
      const path = pool[v.pathIndex];
      if (!path) return;
      let rem = dist;
      while (rem > 0 && v.seg < path.length - 1) {
        const a = path[v.seg];
        const b = path[v.seg + 1];
        const segLen = spherical.computeDistanceBetween(a, b) || 0.0001;
        const remOnSeg = (1 - v.t) * segLen;
        if (rem < remOnSeg) {
          v.t += rem / segLen;
          rem = 0;
        } else {
          rem -= remOnSeg;
          v.seg += 1;
          v.t = 0;
        }
      }
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
        if (roadMode) {
          if (v.pathIndex < 0 || v.pathIndex >= pool.length) {
            // Needs a path (first frame, or pool was regenerated).
            const idx = pickPath();
            if (idx >= 0) {
              assignPath(v, idx);
              v.target = v.cycling ? 0 : 1;
            }
          } else if (!v.cycling) {
            advanceAlong(v, v.speed * steps);
            const path = pool[v.pathIndex];
            if (v.seg >= path.length - 1) {
              // Reached the end of the road → fade out and re-route.
              v.cycling = true;
              v.target = 0;
            } else {
              const a = path[v.seg];
              const b = path[v.seg + 1];
              v.pos = spherical.interpolate(a, b, Math.min(1, v.t));
              v.heading = spherical.computeHeading(a, b);
            }
            v.target = v.cycling ? 0 : 1;
          }
        } else {
          // Free-drift fallback (Directions unavailable).
          v.target = directionsTried && !v.cycling ? 1 : v.target;
          if (!v.cycling) {
            v.heading += (Math.random() - 0.5) * 1.4 * steps;
            v.pos = spherical.computeOffset(v.pos, v.speed * steps, v.heading);
          }
        }

        v.opacity += (v.target - v.opacity) * Math.min(1, 0.14 * steps);

        // Fully faded out and flagged for cycling → reappear elsewhere.
        if (v.cycling && v.opacity < 0.04) {
          if (roadMode) {
            const idx = pickPath();
            if (idx >= 0) {
              assignPath(v, idx);
              v.cycling = false;
              v.target = 1;
            }
          } else {
            v.kind = rndKind();
            v.pos = randomInView();
            v.heading = Math.random() * 360;
            v.iconHeading = v.heading;
            v.speed = speedFor(v.kind);
            v.marker.setIcon(buildIcon(v.kind, v.heading));
            v.cycling = false;
            v.target = 1;
          }
        }

        v.marker.setPosition(v.pos);
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
      maps.event.removeListener(idleListener);
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
