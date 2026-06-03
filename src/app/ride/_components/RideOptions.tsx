"use client";

import { Loader2, Users } from "lucide-react";
import {
  priceNumber,
  type PaymentMethod,
  type RideTypeOption,
  type RouteEstimate,
} from "@/lib/api/booking";
import { cn } from "@/lib/utils";

type Props = {
  estimate: RouteEstimate;
  currencySymbol: string;
  balance: number;
  selectedRideId: number | null;
  onSelectRide: (id: number) => void;
  paymentMethod: PaymentMethod;
  onChangePayment: (m: PaymentMethod) => void;
  onRequest: () => void;
  onBack: () => void;
  requesting: boolean;
  error?: string | null;
};

export function RideOptions({
  estimate,
  currencySymbol,
  balance,
  selectedRideId,
  onSelectRide,
  paymentMethod,
  onChangePayment,
  onRequest,
  onBack,
  requesting,
  error,
}: Props) {
  const rideTypes = estimate.ride_types ?? [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-brand-foreground/60 hover:text-brand-foreground"
        >
          ← Edit route
        </button>
        <span className="text-xs text-brand-foreground/50">
          {estimate.total_distance_km.toFixed(1)} km · {estimate.total_duration_minutes} min
        </span>
      </div>

      <div className="mt-3 max-h-64 space-y-2 overflow-auto pr-1">
        {rideTypes.length === 0 && (
          <p className="py-6 text-center text-sm text-brand-foreground/50">
            No ride options available for this route right now.
          </p>
        )}
        {rideTypes.map((ride: RideTypeOption) => {
          const selected = ride.id === selectedRideId;
          const disabled = !ride.available && !ride.queued;
          return (
            <button
              key={ride.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectRide(ride.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                selected
                  ? "border-brand-dark bg-brand-dark/5"
                  : "border-brand-border hover:border-brand-foreground/30",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {ride.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ride.image} alt="" className="h-10 w-10 rounded-lg object-contain" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted/60 text-brand-foreground/60">
                  <Users className="h-5 w-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-brand-foreground">{ride.label}</span>
                  <span className="flex items-center gap-0.5 text-xs text-brand-foreground/50">
                    <Users className="h-3 w-3" />
                    {ride.persons}
                  </span>
                </div>
                <span className="text-xs text-brand-foreground/50">
                  {ride.queued && !ride.available
                    ? "Busy — may take longer"
                    : `${ride.minutes} min away`}
                </span>
              </div>
              <span className="font-semibold text-brand-foreground">
                {currencySymbol}
                {priceNumber(ride.price).toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <PaymentChip
          active={paymentMethod === "cash"}
          onClick={() => onChangePayment("cash")}
          title="Cash"
          subtitle="Pay the driver"
        />
        <PaymentChip
          active={paymentMethod === "in_app_balance"}
          onClick={() => onChangePayment("in_app_balance")}
          title="Mckot balance"
          subtitle={`${currencySymbol}${balance.toFixed(2)}`}
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={onRequest}
        disabled={requesting || selectedRideId === null || rideTypes.length === 0}
        className="mt-3 flex h-12 items-center justify-center rounded-xl bg-brand-dark font-semibold text-white transition hover:bg-brand-dark/90 disabled:opacity-50"
      >
        {requesting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request ride"}
      </button>
    </div>
  );
}

function PaymentChip({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2 text-left transition",
        active ? "border-brand-dark bg-brand-dark/5" : "border-brand-border hover:border-brand-foreground/30",
      )}
    >
      <span className="block text-sm font-medium text-brand-foreground">{title}</span>
      <span className="block truncate text-xs text-brand-foreground/50">{subtitle}</span>
    </button>
  );
}
