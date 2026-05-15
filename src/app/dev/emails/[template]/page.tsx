import { render } from "@react-email/render";
import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  emailRegistry,
  type EmailTemplateName,
} from "@/lib/email/templates";
import { applyDevLogoSwap } from "../_dev-logo";

export const dynamic = "force-dynamic";

type RouteParams = { template: string };

const isTemplateName = (s: string): s is EmailTemplateName =>
  Object.prototype.hasOwnProperty.call(emailRegistry, s);

export default async function EmailPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (process.env.NODE_ENV === "production") notFound();

  const { template } = await params;
  const search = await searchParams;
  if (!isTemplateName(template)) notFound();

  const entry = emailRegistry[template];
  const Component = entry.component as unknown as React.ComponentType<Record<string, unknown>> & {
    PreviewProps?: Record<string, unknown>;
  };
  const props = Component.PreviewProps ?? {};
  const element = React.createElement(Component, props);

  const mode = search.mode === "text" ? "text" : "html";
  const subject =
    typeof entry.subject === "function"
      ? entry.subject(props as never)
      : entry.subject;

  if (mode === "text") {
    const text = await render(element, { plainText: true });
    return (
      <main style={{ maxWidth: 760, margin: "32px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
        <ToolBar template={template} mode="text" subject={subject} />
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            color: "#e2e8f0",
            padding: 20,
            borderRadius: 10,
            fontSize: 13,
            lineHeight: "20px",
          }}
        >
          {text}
        </pre>
      </main>
    );
  }

  const html = applyDevLogoSwap(await render(element));

  return (
    <main style={{ maxWidth: 760, margin: "32px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
      <ToolBar template={template} mode="html" subject={subject} />
      <iframe
        title={`Preview: ${template}`}
        srcDoc={html}
        style={{
          width: "100%",
          minHeight: 1100,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff",
        }}
      />
    </main>
  );
}

function ToolBar({
  template,
  mode,
  subject,
}: {
  template: string;
  mode: "html" | "text";
  subject: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, color: "#6b7280" }}>
        <Link href="/dev/emails" style={{ color: "#0f766e" }}>
          ← All templates
        </Link>
      </div>
      <h1 style={{ fontSize: 22, margin: "8px 0 4px" }}>{template}</h1>
      <div style={{ fontSize: 14, color: "#374151" }}>
        <strong>Subject:</strong> {subject}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Link
          href={`/dev/emails/${template}`}
          style={tabStyle(mode === "html")}
        >
          HTML
        </Link>
        <Link
          href={`/dev/emails/${template}?mode=text`}
          style={tabStyle(mode === "text")}
        >
          Plain text
        </Link>
      </div>
    </div>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    textDecoration: "none",
    border: "1px solid #e5e7eb",
    background: active ? "#0B3B2D" : "#fff",
    color: active ? "#fff" : "#0f172a",
  };
}
