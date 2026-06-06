"use client";

// Typed client for the wallet + trip-history reads the web account pages
// render. Wallet calls hit Django POST /user/wallet (dispatched on `type`,
// see user/wallet_views.py); trip history reuses the requester dispatcher
// (POST /requester/, type "history", transport/views/requester.py). Both go
// through the /edge-api proxy which injects the bearer token server-side.

import { apiPost } from "./client";

export type WalletOverview = {
  balance: string;
  currency: string;
  has_pin: boolean;
  pin_locked: boolean;
  pending_money_requests: number;
};

export type SavedMethod = {
  id: number;
  type: string;
  label: string;
  user_label: string | null;
  is_default: boolean;
  is_payout_default: boolean;
  card_last4: string | null;
  card_brand: string | null;
  card_bank: string | null;
  momo_provider: string | null;
  momo_phone: string | null;
  momo_account_name: string | null;
};

export type WalletTx = {
  id: number;
  txid: string;
  amount: string;
  currency: string;
  method: string;
  trans_type: string;
  status: string;
  note: string;
  counterparty_name: string | null;
  counterparty_phone: string | null;
  counterparty_image: string | null;
  created: string;
};

export type TripHistoryRow = {
  id: number;
  channel: string;
  status: string;
  price: string | number;
  currency: string | null;
  payment_method: string | null;
  service_type: string | null;
  ride_type__label: string | null;
  route: { coordinates: [number, number]; address: string | null; location: string | null }[];
  distance_km: number | null;
  duration_minutes: number | null;
  responder__user__first_name: string | null;
  responder__user__last_name: string | null;
  created: string;
};

export type Paginator = {
  items: number;
  total_items: number;
  next_page: number;
  previous_page: number;
  next: boolean;
  prev: boolean;
};

export async function getWalletOverview(): Promise<WalletOverview | null> {
  const res = await apiPost<WalletOverview | string>("user/wallet", { type: "overview" });
  return res.success && typeof res.info !== "string" ? res.info : null;
}

export async function getSavedMethods(): Promise<SavedMethod[]> {
  const res = await apiPost<SavedMethod[] | string>("user/wallet", { type: "saved_methods" });
  return res.success && Array.isArray(res.info) ? res.info : [];
}

export async function getWalletActivity(
  page = 1,
): Promise<{ items: WalletTx[]; paginator: Paginator | null }> {
  const res = await apiPost<WalletTx[] | string>("user/wallet", { type: "activity", page });
  const items = res.success && Array.isArray(res.info) ? res.info : [];
  const paginator = (res as { paginator?: Paginator }).paginator ?? null;
  return { items, paginator };
}

export async function getTripHistory(
  page = 1,
): Promise<{ items: TripHistoryRow[]; paginator: Paginator | null }> {
  const res = await apiPost<TripHistoryRow[] | string>("requester", { type: "history", page });
  const items = res.success && Array.isArray(res.info) ? res.info : [];
  const paginator = (res as { paginator?: Paginator }).paginator ?? null;
  return { items, paginator };
}
