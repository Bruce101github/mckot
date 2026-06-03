// Mirrors the backend get_user_details payload (user/utils.py).
export type ResponderProfile = {
  kyc_status?: string;
  auto_accept?: boolean;
  online_activated?: boolean;
  service_type?: string;
  vehicle_type?: string | null;
};

export type MckotUser = {
  phone: string;
  email?: string | null;
  user_type: string;
  image?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  balance: number;
  language?: string | null;
  locale?: string | null;
  country?: string | null;
  country_short_name?: string | null;
  currency_code?: string | null;
  currency_symbol?: string | null;
  websocket_token?: string | null;
  is_staff?: boolean;
  identity_verified?: boolean;
  responder_profile?: ResponderProfile | null;
  referral_code?: string | null;
  has_referrer?: boolean;
};

export type Country = {
  id: number;
  name: string;
  short_name?: string;
  phone_code?: string;
  image?: string | null;
};

export type AuthResult =
  | { success: true; user: MckotUser }
  | { success: false; error: string };

export type OtpRequestResult = { success: boolean; error?: string };
