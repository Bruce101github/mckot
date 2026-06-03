import { cookies } from "next/headers";
import { API_BASE, SESSION_COOKIE } from "@/lib/auth/config";

// Server-side proxy for authenticated client calls.
// The browser calls /edge-api/<path>; we inject the bearer token from the
// httpOnly session cookie and forward to the Django backend. This keeps the
// token out of client JS while avoiding cross-origin cookie/CORS complexity.

export const dynamic = "force-dynamic";

async function forward(req: Request, path: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  // Backend customer routes require a trailing slash (avoids 301 + dropped body).
  const joined = path.join("/");
  const search = new URL(req.url).search;
  const target = `${API_BASE}/${joined}/`.replace(/\/{2,}$/, "/") + search;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const init: RequestInit = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const upstream = await fetch(target, init);
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return forward(req, path);
}

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return forward(req, path);
}
