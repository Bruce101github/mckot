"use client";

import { Loader2, Phone, Star } from "lucide-react";
import { priceNumber, type ActiveRequest } from "@/lib/api/booking";

type Props = {
  request: ActiveRequest;
  currencySymbol: string;
  onCancel: () => void;
  onDone: () => void;
  cancelling: boolean;
};

const STATUS_COPY: Record<string, { title: string; sub: string }> = {
  requested: { title: "Finding your driver", sub: "Matching you with the nearest driver…" },
  accepted: { title: "Driver is on the way", sub: "Your driver is heading to your pickup." },
  "in progress": { title: "On your trip", sub: "Your delivery is on the way." },
  completed: { title: "Trip completed", sub: "Thanks for using Mckot." },
  cancelled: { title: "Trip cancelled", sub: "This request was cancelled." },
  scheduled: { title: "Ride scheduled", sub: "We'll dispatch a driver at your chosen time." },
};

export function ActiveTripCard({ request, currencySymbol, onCancel, onDone, cancelling }: Props) {
  const copy = STATUS_COPY[request.status] ?? STATUS_COPY.requested;
  const driverName = [request.responder__user__first_name, request.responder__user__last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  const hasDriver = Boolean(request.responder);
  const isFinished = request.status === "completed" || request.status === "cancelled";
  const canCancel = request.status === "requested" || request.status === "accepted";

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        {request.status === "requested" && !hasDriver ? (
          <Loader2 className="h-5 w-5 animate-spin text-brand-dark" />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
        )}
        <div>
          <h2 className="text-lg font-semibold text-brand-foreground">{copy.title}</h2>
          <p className="text-sm text-brand-foreground/60">{copy.sub}</p>
        </div>
      </div>

      {hasDriver && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-brand-border bg-white p-3">
          {request.responder__user__image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={request.responder__user__image}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand-foreground/60">
              <Star className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-brand-foreground">{driverName || "Your driver"}</p>
            {request.time_to_pickup_minutes != null && request.status === "accepted" && (
              <p className="text-xs text-brand-foreground/50">
                {request.time_to_pickup_minutes} min to pickup
              </p>
            )}
          </div>
          {request.responder__user__phone && (
            <a
              href={`tel:+${request.responder__user__phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-white"
              aria-label="Call driver"
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-surface px-3 py-2.5 text-sm">
        <span className="text-brand-foreground/60">
          {request.ride_type__label ?? "Ride"} ·{" "}
          {request.payment_method === "in_app_balance" ? "Mckot balance" : "Cash"}
        </span>
        <span className="font-semibold text-brand-foreground">
          {currencySymbol}
          {priceNumber(request.price).toFixed(2)}
        </span>
      </div>

      {request.tracking_token && !isFinished && (
        <a
          href={`/track/${request.tracking_token}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-center text-sm font-medium text-brand-dark underline-offset-2 hover:underline"
        >
          Share trip with someone
        </a>
      )}

      {isFinished ? (
        <button
          type="button"
          onClick={onDone}
          className="mt-4 flex h-12 items-center justify-center rounded-xl bg-brand-dark font-semibold text-white hover:bg-brand-dark/90"
        >
          Book another ride
        </button>
      ) : canCancel ? (
        <button
          type="button"
          onClick={onCancel}
          disabled={cancelling}
          className="mt-4 flex h-12 items-center justify-center rounded-xl border border-brand-border font-semibold text-brand-foreground/70 hover:bg-brand-muted/50 disabled:opacity-50"
        >
          {cancelling ? <Loader2 className="h-5 w-5 animate-spin" /> : "Cancel delivery"}
        </button>
      ) : null}
    </div>
  );
}
