"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/lib/maps/useGoogleMaps";
import type { Coords } from "@/lib/api/booking";

// Accra city centre — default view before we have a pickup.
const DEFAULT_CENTER: Coords = [5.6037, -0.187];

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
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
      ],
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
          strokeColor: "#0B3B2D",
          strokeOpacity: 0.9,
          strokeWeight: 4,
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
