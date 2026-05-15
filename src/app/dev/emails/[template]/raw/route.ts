import { render } from "@react-email/render";
import * as React from "react";
import { NextResponse } from "next/server";
import {
  emailRegistry,
  type EmailTemplateName,
} from "@/lib/email/templates";
import { applyDevLogoSwap } from "../../_dev-logo";

export const dynamic = "force-dynamic";

const isTemplateName = (s: string): s is EmailTemplateName =>
  Object.prototype.hasOwnProperty.call(emailRegistry, s);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ template: string }> }
) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { template } = await params;
  if (!isTemplateName(template)) {
    return new NextResponse("Unknown template", { status: 404 });
  }

  const entry = emailRegistry[template];
  const Component = entry.component as unknown as React.ComponentType<Record<string, unknown>> & {
    PreviewProps?: Record<string, unknown>;
  };
  const props = Component.PreviewProps ?? {};
  const element = React.createElement(Component, props);

  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");
  if (mode === "text") {
    const text = await render(element, { plainText: true });
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const html = await render(element);
  return new NextResponse(applyDevLogoSwap(html), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
