"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, MapPin, MessageCircle, PackageX, RefreshCw } from "lucide-react";
import {
  STAGES,
  describe,
  dropLabel,
  formatParcelNumber,
  formatTime,
  isParcelNumber,
  type TrackInfo,
  type TrackResult,
} from "@/lib/tracking";
import { siteConfig } from "@/lib/site";
import { TrackMap } from "./TrackMap";

const LIVE_REFRESH_MS = 15_000;
const IDLE_REFRESH_MS = 60_000;

export function TrackDetails({ token, initial }: { token: string; initial: TrackInfo }) {
  const [info, setInfo] = useState<TrackInfo>(initial);
  const [updatedAt, setUpdatedAt] = useState(() => new Date());
  const [stale, setStale] = useState(false);
  const view = describe(info);
  const live = view.stage === 1 || view.stage === 2;

  useEffect(() => {
    if (view.final) return;
    let cancelled = false;
    const id = window.setInterval(
      async () => {
        if (document.visibilityState !== "visible") return;
        try {
          const res = await fetch(`/api/track/${encodeURIComponent(token)}`, { cache: "no-store" });
          const data = (await res.json()) as TrackResult;
          if (cancelled) return;
          if (data.ok) {
            setInfo(data.info);
            setUpdatedAt(new Date());
            setStale(false);
          } else {
            setStale(true);
          }
        } catch {
          if (!cancelled) setStale(true);
        }
      },
      live ? LIVE_REFRESH_MS : IDLE_REFRESH_MS,
    );
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [token, view.final, live]);

  const rider = info.live_location ? { lat: info.live_location.lat, lng: info.live_location.lng } : null;
  const hasCoords = rider !== null || info.drops.some((d) => typeof d.lat === "number");
  const showMap = !view.final && live && hasCoords;
  const number = info.tracking_number ?? (isParcelNumber(token) ? token : null);

  const helpUrl = useMemo(() => {
    const ref = number ? formatParcelNumber(number) : token;
    return `https://wa.me/${siteConfig.phones.primary.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `Hi Mckot, I have a question about my delivery ${ref}.`,
    )}`;
  }, [number, token]);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 md:py-14">
      <p className="text-sm font-medium text-brand-foreground/60">
        {number ? `Tracking ${formatParcelNumber(number)}` : "Delivery tracking"}
      </p>
      <h1
        className={`mt-1 text-3xl font-bold md:text-4xl ${
          view.tone === "stopped" ? "text-red-800" : "text-brand-foreground"
        }`}
      >
        {view.headline}
      </h1>
      {view.detail && <p className="mt-2 text-brand-foreground/70">{view.detail}</p>}

      {view.tone !== "stopped" && <Steps stage={view.stage} />}

      {showMap && (
        <div className="mt-6">
          <TrackMap rider={rider} drops={info.drops} />
          {info.live_location && (
            <p className="mt-2 text-xs text-brand-foreground/55">
              Rider location as of {formatTime(info.live_location.at)}
            </p>
          )}
        </div>
      )}

      {info.courier && !view.final && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4">
          {info.courier.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={info.courier.image}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-lg font-bold text-brand-dark">
              {(info.courier.first_name || "R").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-brand-foreground">{info.courier.first_name || "Your rider"}</p>
            <p className="text-sm text-brand-foreground/60">
              Mckot rider{info.courier.phone_tail ? ` · phone ending ${info.courier.phone_tail}` : ""}
            </p>
          </div>
        </div>
      )}

      {info.drops.length > 0 && (
        <div className="mt-6 rounded-2xl border border-brand-border bg-white p-4">
          <p className="text-sm font-medium text-brand-foreground/60">
            {info.drops.length > 1 ? "Drop-offs" : "Delivering to"}
          </p>
          <ul className="mt-2 space-y-2">
            {info.drops.map((d, i) => {
              const current = live && info.drops.length > 1 && (info.active_target_index ?? 0) - 1 === i;
              return (
                <li key={i} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" aria-hidden />
                  <span className="text-brand-foreground">
                    {dropLabel(d)}
                    {current && <span className="ml-2 text-sm font-medium text-brand-dark">· next stop</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {info.proof_of_delivery_url && view.stage === 3 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-brand-foreground/60">Proof of delivery</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={info.proof_of_delivery_url}
            alt="Photo taken by the rider at delivery"
            className="mt-2 max-h-80 w-full rounded-2xl border border-brand-border object-cover"
          />
        </div>
      )}

      {!view.final && (
        <p className="mt-6 flex items-center gap-2 text-xs text-brand-foreground/55">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          {stale
            ? "Couldn't refresh just now. We'll keep trying."
            : `Updates automatically · last checked ${formatTime(updatedAt.toISOString())}`}
        </p>
      )}

      <a
        href={helpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex h-12 items-center justify-center gap-2 rounded-xl border border-brand-border bg-white font-semibold text-brand-dark hover:bg-brand-surface"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Questions? Chat with us on WhatsApp
      </a>
    </div>
  );
}

function Steps({ stage }: { stage: number }) {
  return (
    <ol className="mt-8 grid grid-cols-4 gap-2" aria-label="Delivery progress">
      {STAGES.map((label, i) => {
        const done = i < stage || stage === 3;
        const current = i === stage && stage !== 3;
        return (
          <li key={label} className="flex flex-col gap-2" aria-current={current ? "step" : undefined}>
            <div
              className={`h-1.5 rounded-full ${
                done ? "bg-brand-dark" : current ? "bg-brand-accent" : "bg-brand-border"
              }`}
            />
            <span
              className={`flex items-center gap-1 text-xs leading-tight ${
                done || current ? "font-semibold text-brand-foreground" : "text-brand-foreground/50"
              }`}
            >
              {done && <Check className="h-3 w-3 shrink-0" aria-hidden />}
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function TrackNotFound({ token, message, notFound }: { token: string; message: string; notFound: boolean }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 md:py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand-dark">
        <PackageX className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="mt-5 text-3xl font-bold text-brand-foreground">
        {notFound ? "We couldn't find that delivery" : "Tracking is unavailable"}
      </h1>
      <p className="mt-3 text-brand-foreground/70">
        {notFound
          ? isParcelNumber(token)
            ? `Check the number on the label or SMS and try again. You searched for ${formatParcelNumber(token)}.`
            : "This tracking link has expired or isn't valid. Enter the tracking number from the label or SMS instead."
          : `${message} Please try again in a minute.`}
      </p>
    </div>
  );
}
