import "server-only";
import { render } from "@react-email/render";
import * as React from "react";
import { formatFromHeader, getEmailEnv } from "./env";
import { getResend } from "./resend";
import {
  emailRegistry,
  type EmailTemplateName,
  type EmailTemplateProps,
} from "./templates";

type Recipient = string | string[];

type BaseOptions = {
  to: Recipient;
  /** Override the reply-to header for this send. */
  replyTo?: string;
  /** Resend tags for analytics (template tag is added automatically). */
  tags?: { name: string; value: string }[];
};

export type SendEmailInput<K extends EmailTemplateName> = BaseOptions & {
  template: K;
  data: EmailTemplateProps<K>;
};

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function sendEmail<K extends EmailTemplateName>(
  input: SendEmailInput<K>
): Promise<SendEmailResult> {
  const env = getEmailEnv();
  const entry = emailRegistry[input.template];
  if (!entry) {
    return { ok: false, error: `Unknown template: ${input.template}` };
  }

  const subjectBuilder = entry.subject as
    | ((p: EmailTemplateProps<K>) => string)
    | string;
  const subject =
    typeof subjectBuilder === "function" ? subjectBuilder(input.data) : subjectBuilder;

  const Component = entry.component as (
    p: EmailTemplateProps<K>
  ) => React.JSX.Element;
  const element = React.createElement(Component, input.data);

  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);

  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: formatFromHeader(env),
      to: Array.isArray(input.to) ? input.to : [input.to],
      replyTo: input.replyTo ?? env.replyTo,
      subject,
      html,
      text,
      tags: [
        { name: "template", value: entry.tag },
        ...(input.tags ?? []),
      ],
    });

    if (result.error) {
      console.error("[email] resend error", entry.tag, result.error);
      return { ok: false, error: result.error.message };
    }

    return { ok: true, id: result.data?.id ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown send error";
    console.error("[email] send threw", entry.tag, err);
    return { ok: false, error: message };
  }
}
