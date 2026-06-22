import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, TIMELINE_LABELS, FORMAT_LABELS } from "@/lib/schemas";
import { getLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateRef() {
  return `BSR-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: {
  name: string;
  email: string;
  project: string;
  interest: string[];
  format?: string;
  message: string;
  timeline?: string;
  ref: string;
}) {
  const formatLabel = data.format
    ? FORMAT_LABELS[data.format as keyof typeof FORMAT_LABELS] ?? data.format
    : "—";
  const timelineLabel = data.timeline
    ? TIMELINE_LABELS[data.timeline as keyof typeof TIMELINE_LABELS] ?? data.timeline
    : "—";
  const rows: Array<[string, string]> = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Proyecto / alias", data.project || "—"],
    ["Interés", data.interest.join(", ")],
    ["Formato", formatLabel],
    ["Plazo deseado", timelineLabel],
    ["Ref", data.ref],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n---\n${data.message}\n`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#111;max-width:560px">
      <h2 style="margin:0 0 16px;font-weight:500">Nuevo mensaje desde la web de Backstage Records</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:130px">${escapeHtml(k)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-weight:500">Mensaje</h3>
      <p style="white-space:pre-wrap;line-height:1.5">${escapeHtml(data.message)}</p>
    </div>
  `;
  return { text, html };
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: real users never see the `website` field. If filled, pretend
  // success so the bot doesn't learn we spotted it.
  if (data.website) {
    return NextResponse.json({ ok: true, ref: generateRef() });
  }

  // Rate limit per IP
  const ip = getClientIp(req);
  const limiter = getLimiter();
  const rl = await limiter.limit(`contact:${ip}`);
  if (!rl.success) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas peticiones. Pruebe en unos minutos." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.reset - Date.now()) / 1000)) } }
    );
  }

  const ref = generateRef();
  const { text, html } = buildEmail({ ...data, ref });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hola@brecords.unlimited-systems.net";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Backstage Records <noreply@brecords.unlimited-systems.net>";

  if (!apiKey) {
    // Without Resend configured the form still works in dev — log + accept,
    // so reviewers without secrets can exercise the flow end-to-end.
    console.warn("[contact] RESEND_API_KEY not set — skipping send. Payload:", { ref, ...data });
    return NextResponse.json({ ok: true, ref });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `[Backstage] ${data.name}${data.project ? ` · ${data.project}` : ""}`,
      text,
      html,
    });
    if (error) {
      console.error("Resend send failed", error);
      return NextResponse.json(
        { ok: false, error: "No hemos podido enviar el mensaje. Inténtelo de nuevo." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend threw", err);
    return NextResponse.json(
      { ok: false, error: "No hemos podido enviar el mensaje. Inténtelo de nuevo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ref });
}
