"use client";

// Typed client for the customer booking endpoint (Django POST /requester/,
// dispatched on `type`) plus the place-search / saved-address helpers under
// /requester/*. All calls go through the /edge-api proxy which injects the
// bearer token server-side. Mirrors transport/views/requester.py.

import { apiPost } from "./client";

// [lat, lng] throughout — matches the backend Location model + route serializers.
export type Coords = [number, number];

export type PlaceResult = {
  address: string;
  location: string;
  coordinates: Coords;
};

export type RouteStop = {
  coordinates: Coords;
  address: string | null;
  location: string | null;
  recipient_name?: string;
  recipient_phone?: string;
};

export type RideTypeOption = {
  id: number;
  label: string;
  type: string;
  image: string | null;
  persons: number;
  minutes: number;
  price: string | number;
  available: boolean;
  queued: boolean;
  pricing_mode: string;
};

export type RouteEstimate = {
  service: string;
  total_distance_km: number;
  total_duration_minutes: number;
  route: RouteStop[];
  encoded_polyline: string[];
  ride_types: RideTypeOption[];
};

// Subset of get_request_details(...) we render on web.
export type ActiveRequest = {
  id: number;
  channel: string;
  status: "requested" | "accepted" | "in progress" | "completed" | "cancelled" | "scheduled";
  price: string | number;
  currency: string | null;
  payment_method: string | null;
  route: RouteStop[];
  route_polyline?: string[] | null;
  route_to_pickup_polyline?: string[] | null;
  tracking_token?: string | null;
  ride_type__label?: string | null;
  service_type?: string | null;
  responder?: number | null;
  responder__user__first_name?: string | null;
  responder__user__last_name?: string | null;
  responder__user__phone?: string | null;
  responder__user__image?: string | null;
  time_to_pickup_minutes?: number | null;
  duration_minutes?: number | null;
  distance_km?: number | null;
};

export type PaymentMethod = "cash" | "in_app_balance";
export type ServiceType = "ride" | "delivery";

export async function searchPlaces(keyword: string, coordinates: Coords): Promise<PlaceResult[]> {
  const res = await apiPost<PlaceResult[]>("requester/search_places", { keyword, coordinates });
  return res.success && Array.isArray(res.info) ? res.info : [];
}

export async function estimateRoute(
  route: Coords[],
  service: ServiceType = "ride",
): Promise<{ success: boolean; info: RouteEstimate | string }> {
  const res = await apiPost<RouteEstimate | string>("requester", {
    type: "estimate_route",
    route,
    service,
  });
  return res;
}

export async function requestService(
  rideTypeId: number,
  paymentMethod: PaymentMethod,
): Promise<{ success: boolean; info: { message: string; request: ActiveRequest } | string }> {
  const res = await apiPost<{ message: string; request: ActiveRequest } | string>("requester", {
    type: "request_service",
    ride_type_id: rideTypeId,
    payment_method: paymentMethod,
  });
  return res;
}

export async function checkRequest(): Promise<ActiveRequest | null> {
  const res = await apiPost<{ requests: ActiveRequest[] } | null>("requester", {
    type: "check_request",
  });
  if (res.success && res.info && Array.isArray(res.info.requests) && res.info.requests.length > 0) {
    return res.info.requests[0];
  }
  return null;
}

export async function cancelRequest(
  requestId: number,
): Promise<{ success: boolean; info: unknown }> {
  return apiPost("requester", { type: "cancel_request", request_id: requestId });
}

export function priceNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}
