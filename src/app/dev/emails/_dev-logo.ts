import "server-only";
import fs from "node:fs";

const LOGO_TMP_PATH = "/tmp/mckot-email-logo.png";

let cached: { mtimeMs: number; dataUri: string } | null = null;

function readLogoDataUri(): string | null {
  try {
    if (!fs.existsSync(LOGO_TMP_PATH)) return null;
    const stat = fs.statSync(LOGO_TMP_PATH);
    if (cached && cached.mtimeMs === stat.mtimeMs) return cached.dataUri;
    const buf = fs.readFileSync(LOGO_TMP_PATH);
    cached = { mtimeMs: stat.mtimeMs, dataUri: `data:image/png;base64,${buf.toString("base64")}` };
    return cached.dataUri;
  } catch {
    return null;
  }
}

/**
 * Dev-preview helper. The brand logo URL points at the production CDN path
 * (which is still root-owned and may not yet have the final logo). When the
 * file isn't reachable, swap any `/email/logo.png` reference with the
 * placeholder PNG stored at /tmp so the rendered preview shows the layout
 * with a visible mark instead of a broken image. No-op in production.
 */
export function applyDevLogoSwap(html: string): string {
  if (process.env.NODE_ENV === "production") return html;
  const dataUri = readLogoDataUri();
  if (!dataUri) return html;
  return html.replace(/src="[^"]*\/email\/logo\.png"/g, `src="${dataUri}"`);
}
