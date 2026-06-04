"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

// Single shared loader so the Maps script is injected once per page.
let loaderPromise: Promise<typeof google> | null = null;

function getLoader(): Promise<typeof google> {
  if (loaderPromise) return loaderPromise;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const loader = new Loader({
    apiKey,
    version: "weekly",
    // geometry → polyline decoding + spherical math for ambient traffic.
    // routes → DirectionsService, used to make decorative vehicles follow
    // real roads. We use the backend for place search, so Places isn't loaded.
    libraries: ["geometry", "routes"],
  });
  loaderPromise = loader.load();
  return loaderPromise;
}

export type MapsState =
  | { status: "loading"; maps: null; error: null }
  | { status: "ready"; maps: typeof google.maps; error: null }
  | { status: "error"; maps: null; error: string };

export function useGoogleMaps(): MapsState {
  const [state, setState] = useState<MapsState>({ status: "loading", maps: null, error: null });

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setState({ status: "error", maps: null, error: "Map key not configured" });
      return;
    }
    let active = true;
    getLoader()
      .then((g) => {
        if (active) setState({ status: "ready", maps: g.maps, error: null });
      })
      .catch((e: unknown) => {
        if (active) {
          setState({
            status: "error",
            maps: null,
            error: e instanceof Error ? e.message : "Failed to load map",
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
