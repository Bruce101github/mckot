"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/lib/maps/useGoogleMaps";
import { MAP_STYLE } from "@/app/ride/_components/MapCanvas";
import type { TrackDrop } from "@/lib/tracking";

type Point = { lat: number; lng: number };

/** Rider (live) + drop-off pins. Renders nothing if the map can't load. */
export function TrackMap({ rider, drops }: { rider: Point | null; drops: TrackDrop[] }) {
  const maps = useGoogleMaps();
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const riderRef = useRef<google.maps.Marker | null>(null);
  const dropRefs = useRef<google.maps.Marker[]>([]);

  const dropPoints: Point[] = drops
    .filter((d) => typeof d.lat === "number" && typeof d.lng === "number")
    .map((d) => ({ lat: d.lat as number, lng: d.lng as number }));
  const dropKey = JSON.stringify(dropPoints);

  useEffect(() => {
    if (maps.status !== "ready" || !divRef.current || mapRef.current) return;
    mapRef.current = new maps.maps.Map(divRef.current, {
      center: rider ?? dropPoints[0] ?? { lat: 5.6037, lng: -0.187 },
      zoom: 14,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      gestureHandling: "cooperative",
      styles: MAP_STYLE,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maps.status]);

  // Drop-off pins + framing.
  useEffect(() => {
    const map = mapRef.current;
    if (maps.status !== "ready" || !map) return;
    dropRefs.current.forEach((m) => m.setMap(null));
    dropRefs.current = dropPoints.map(
      (p, i) =>
        new maps.maps.Marker({
          map,
          position: p,
          label: dropPoints.length > 1 ? { text: String(i + 1), color: "#fff", fontWeight: "700" } : undefined,
          title: "Drop-off",
        }),
    );
    const all = rider ? [rider, ...dropPoints] : dropPoints;
    if (all.length > 1) {
      const b = new maps.maps.LatLngBounds();
      all.forEach((p) => b.extend(p));
      map.fitBounds(b, 56);
    } else if (all.length === 1) {
      map.setCenter(all[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maps.status, dropKey, rider === null]);

  // Rider pin follows live updates without re-framing the map.
  useEffect(() => {
    const map = mapRef.current;
    if (maps.status !== "ready" || !map) return;
    if (!rider) {
      riderRef.current?.setMap(null);
      riderRef.current = null;
      return;
    }
    if (!riderRef.current) {
      riderRef.current = new maps.maps.Marker({
        map,
        position: rider,
        title: "Rider",
        zIndex: 10,
        icon: {
          path: maps.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: "#0B3B2D",
          fillOpacity: 1,
          strokeColor: "#A4D233",
          strokeWeight: 4,
        },
      });
    } else {
      riderRef.current.setPosition(rider);
    }
  }, [maps, rider]);

  if (maps.status === "error") return null;
  return (
    <div
      ref={divRef}
      className="h-64 w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-surface md:h-80"
      aria-label="Map showing the rider and the drop-off"
      role="img"
    />
  );
}
