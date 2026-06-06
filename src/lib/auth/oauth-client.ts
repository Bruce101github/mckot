"use client";

// Browser-side OAuth helpers: load the Google / Apple JS SDKs on demand,
// surface an id_token that the `oauthLogin` server action verifies against
// the provider JWKS. The custom buttons stay; for Google we render its
// (transparent) official button over our styled one because GIS only hands
// back an id_token through its own rendered button / One Tap flow.

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ?? "";
export const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_OAUTH_CLIENT_ID ?? "";

const GOOGLE_SRC = "https://accounts.google.com/gsi/client";
const APPLE_SRC =
  "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

const scriptPromises = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  const cached = scriptPromises.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    el.defer = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scriptPromises.delete(src);
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(el);
  });
  scriptPromises.set(src, promise);
  return promise;
}

type GoogleId = {
  initialize: (config: {
    client_id: string;
    callback: (resp: { credential?: string }) => void;
    ux_mode?: "popup" | "redirect";
    auto_select?: boolean;
  }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
};

type AppleAuth = {
  init: (config: {
    clientId: string;
    scope: string;
    redirectURI: string;
    usePopup: boolean;
  }) => void;
  signIn: () => Promise<{
    authorization?: { id_token?: string };
    user?: { name?: { firstName?: string; lastName?: string } };
  }>;
};

function googleId(): GoogleId | null {
  const g = (window as unknown as { google?: { accounts?: { id?: GoogleId } } }).google;
  return g?.accounts?.id ?? null;
}

// GIS only needs initializing once; we keep the active credential handler in a
// mutable ref so React re-renders can swap it without re-initializing (which
// GSI warns about).
let googleInitialized = false;
let activeCredential: (idToken: string) => void = () => {};
let activeError: (message: string) => void = () => {};

// Render Google's transparent official button into `host` (positioned over
// our styled button). `onCredential` receives the id_token.
export async function renderGoogleButton(
  host: HTMLElement,
  onCredential: (idToken: string) => void,
  onError: (message: string) => void,
): Promise<void> {
  if (!GOOGLE_CLIENT_ID) return;
  activeCredential = onCredential;
  activeError = onError;
  try {
    await loadScript(GOOGLE_SRC);
  } catch {
    onError("Could not reach Google sign-in. Check your connection.");
    return;
  }
  const id = googleId();
  if (!id) {
    onError("Google sign-in is unavailable right now.");
    return;
  }
  if (!googleInitialized) {
    id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      ux_mode: "popup",
      auto_select: false,
      callback: (resp) => {
        if (resp?.credential) activeCredential(resp.credential);
        else activeError("Google sign-in was cancelled.");
      },
    });
    googleInitialized = true;
  }
  host.innerHTML = "";
  id.renderButton(host, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "pill",
    logo_alignment: "center",
    width: Math.min(Math.max(host.offsetWidth || 320, 200), 400),
  });
}

export async function signInWithApple(): Promise<{
  idToken: string;
  firstName?: string;
  lastName?: string;
}> {
  if (!APPLE_CLIENT_ID) throw new Error("Apple sign-in is not configured yet.");
  await loadScript(APPLE_SRC);
  const AppleID = (window as unknown as { AppleID?: { auth: AppleAuth } }).AppleID;
  if (!AppleID) throw new Error("Apple sign-in is unavailable right now.");

  AppleID.auth.init({
    clientId: APPLE_CLIENT_ID,
    scope: "name email",
    redirectURI:
      process.env.NEXT_PUBLIC_APPLE_OAUTH_REDIRECT_URI ||
      `${window.location.origin}/ride`,
    usePopup: true,
  });

  const resp = await AppleID.auth.signIn();
  const idToken = resp?.authorization?.id_token;
  if (!idToken) throw new Error("Apple sign-in failed.");
  const name = resp?.user?.name;
  return { idToken, firstName: name?.firstName, lastName: name?.lastName };
}
