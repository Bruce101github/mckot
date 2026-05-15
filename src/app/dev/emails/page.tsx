import Link from "next/link";
import { notFound } from "next/navigation";
import { emailRegistry, type EmailTemplateName } from "@/lib/email/templates";

export const dynamic = "force-dynamic";

const templates = Object.keys(emailRegistry) as EmailTemplateName[];

const titles: Record<EmailTemplateName, string> = {
  "vendor-signup-confirmation": "Vendor signup: confirmation (to vendor)",
  "vendor-signup-internal": "Vendor signup: internal notification (to ops)",
};

export default function EmailPreviewIndex() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Email previews</h1>
      <p style={{ marginTop: 8, color: "#4b5563" }}>
        Dev-only. Renders templates in the browser without sending. Open any template to see the
        HTML, then resize the window to check mobile breakpoints.
      </p>

      <ul style={{ marginTop: 24, padding: 0, listStyle: "none" }}>
        {templates.map((name) => (
          <li key={name} style={{ marginBottom: 12 }}>
            <Link
              href={`/dev/emails/${name}`}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                color: "#0f172a",
                fontWeight: 600,
              }}
            >
              {titles[name]}
              <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 400, marginTop: 2 }}>
                /dev/emails/{name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
