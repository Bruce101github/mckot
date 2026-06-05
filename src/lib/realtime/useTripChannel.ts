"use client";

// Centrifugo (v6) live-trip channel for the web booking app. Mirrors the
// Flutter requester flow: connect with the user's websocket_token, subscribe
// to the request's opaque `channel` (a UUID supplied by the backend) using a
// short-lived per-channel subscribe token from /security/ws_subscribe_token/,
// then translate {event, data} publications into live driver location + status.

import { useEffect, useRef, useState } from "react";
import { Centrifuge, type PublicationContext } from "centrifuge";
import { apiPost } from "@/lib/api/client";
import type { Coords } from "@/lib/api/booking";

const WS_URL =
  process.env.NEXT_PUBLIC_CENTRIFUGO_WS_URL ?? "wss://ws.mckot.com/connection/websocket";

// Verbose lifecycle logging for the live-trip channel. Errors are always
// logged (low volume, genuinely useful when tracking stalls); set
// NEXT_PUBLIC_TRIP_CHANNEL_DEBUG=1 to also log connect/subscribe/publication.
const DEBUG = process.env.NEXT_PUBLIC_TRIP_CHANNEL_DEBUG === "1";
const log = (...args: unknown[]) => {
  if (DEBUG) console.log("[trip-channel]", ...args);
};

export type LiveDriver = {
  coords: Coords;
  bearing: number;
  speedKmh: number;
};

// Status hints pushed over the channel, in backend status vocabulary.
export type LiveStatus = "accepted" | "in progress" | "completed" | "cancelled";

export type TripChannelState = {
  driver: LiveDriver | null;
  liveStatus: LiveStatus | null;
  connected: boolean;
};

type Envelope = { event?: string; data?: Record<string, unknown> };

async function fetchSubscribeToken(channel: string): Promise<string> {
  const res = await apiPost<{ token: string; expires_in: number } | string>(
    "security/ws_subscribe_token",
    { channel },
  );
  if (res.success && res.info && typeof res.info !== "string" && res.info.token) {
    return res.info.token;
  }
  throw new Error(
    typeof res.info === "string" ? res.info : "Could not authorize the trip channel.",
  );
}

function toLiveStatus(event: string): LiveStatus | null {
  switch (event) {
    case "request_accepted":
      return "accepted";
    case "request_started":
      return "in progress";
    case "request_completed":
      return "completed";
    case "request_cancelled":
      return "cancelled";
    default:
      return null;
  }
}

/**
 * Subscribe to a live trip channel. Pass a null channel or token to stay idle
 * (e.g. before a request exists). Reconnects whenever channel/token change.
 */
export function useTripChannel(
  channel: string | null,
  connectionToken: string | null | undefined,
): TripChannelState {
  const [driver, setDriver] = useState<LiveDriver | null>(null);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [connected, setConnected] = useState(false);

  // Keep the latest channel in a ref so the getToken closure stays stable.
  const channelRef = useRef(channel);
  channelRef.current = channel;

  useEffect(() => {
    if (!channel || !connectionToken) return;

    const centrifuge = new Centrifuge(WS_URL, { token: connectionToken });
    const sub = centrifuge.newSubscription(channel, {
      getToken: () => fetchSubscribeToken(channel),
    });

    const onPublication = (ctx: PublicationContext) => {
      const payload = ctx.data as Envelope | undefined;
      if (!payload || typeof payload !== "object") return;
      const event = payload.event ?? "";

      if (event === "responder_location" && payload.data) {
        const d = payload.data;
        const coords = d.coordinates as [number, number] | undefined;
        if (Array.isArray(coords) && coords.length === 2) {
          log("responder_location", coords, "bearing", d.bearing);
          setDriver({
            coords: [Number(coords[0]), Number(coords[1])],
            bearing: Number(d.bearing ?? 0),
            speedKmh: Number(d.speed_kmh ?? 0),
          });
        }
        return;
      }

      const status = toLiveStatus(event);
      if (status) setLiveStatus(status);
    };

    log("connecting", { channel, ws: WS_URL });
    sub.on("publication", onPublication);
    sub.on("subscribed", () => {
      log("subscribed", channel);
      setConnected(true);
    });
    sub.on("unsubscribed", (ctx) => {
      log("unsubscribed", channel, ctx);
      setConnected(false);
    });
    sub.on("error", (ctx) => {
      console.warn("[trip-channel] subscription error", channel, ctx);
      setConnected(false);
    });
    centrifuge.on("error", (ctx) => {
      console.warn("[trip-channel] connection error", ctx);
    });
    centrifuge.on("connected", () => log("connected"));
    centrifuge.on("disconnected", (ctx) => log("disconnected", ctx));

    sub.subscribe();
    centrifuge.connect();

    return () => {
      setConnected(false);
      sub.removeAllListeners();
      try {
        sub.unsubscribe();
      } catch {
        /* already torn down */
      }
      centrifuge.disconnect();
    };
  }, [channel, connectionToken]);

  return { driver, liveStatus, connected };
}
