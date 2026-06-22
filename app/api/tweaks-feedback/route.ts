import { NextResponse } from "next/server";
import { Resend } from "resend";
import { tweaksFeedbackSchema } from "@/lib/schemas";
import { getLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

const TWEAK_LABELS: Record<string, string> = {
  palette: "Paleta",
  font: "Tipografía",
  dark: "Modo oscuro",
  heroVariant: "Hero",
  density: "Densidad",
  radius: "Bordes",
  accentIntensity: "Acento",
  contrast: "Contraste",
  motion: "Movimiento",
  grain: "Grano",
  glow: "Glow",
  texture: "Textura",
  accentShift: "Matiz de acento",
};

function generateRef() {
  return `TWK-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function buildEmail(
  data: { name: string; note: string; state: Record<string, string | boolean | number>; url: string },
  ref: string
) {
  const rows = Object.entries(data.state).map<[string, string]>(([k, v]) => [
    TWEAK_LABELS[k] ?? k,
    typeof v === "boolean" ? (v ? "Sí" : "No") : String(v),
  ]);
  const text =
    `Configuración favorita compartida desde la web.\n\n` +
    (data.name ? `Nombre: ${data.name}\n` : "") +
    (data.note ? `Nota: ${data.note}\n\n` : "") +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nURL: ${data.url || "—"}\nRef: ${ref}\n`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#111;max-width:560px">
      <h2 style="margin:0 0 8px;font-weight:500">Le ha gustado una configuración de Tweaks</h2>
      <p style="margin:0 0 16px;color:#666;font-size:13px">Alguien pulsó "Me gusta esta configuración" en brecords.unlimited-systems.net.</p>
      ${data.name ? `<p style="margin:0 0 4px;font-size:14px"><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>` : ""}
      ${data.note ? `<p style="margin:0 0 16px;font-size:14px;white-space:pre-wrap">${escapeHtml(data.note)}</p>` : ""}
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:140px">${escapeHtml(k)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee"><code>${escapeHtml(v)}</code></td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:18px 0 0;color:#666;font-size:12px">URL: <a href="${escapeHtml(data.url)}">${escapeHtml(data.url || "—")}</a></p>
      <p style="margin:4px 0 0;color:#999;font-size:11px">Ref: ${escapeHtml(ref)}</p>
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

  const parsed = tweaksFeedbackSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot — silent accept.
  if (data.website) {
    return NextResponse.json({ ok: true, ref: generateRef() });
  }

  const ip = getClientIp(req);
  const limiter = getLimiter();
  const rl = await limiter.limit(`tweaks:${ip}`);
  if (!rl.success) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas peticiones. Pruebe en unos minutos." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.reset - Date.now()) / 1000)) } }
    );
  }

  const ref = generateRef();
  const { text, html } = buildEmail(data, ref);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hola@brecords.unlimited-systems.net";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Backstage Records <noreply@brecords.unlimited-systems.net>";

  if (!apiKey) {
    // Mirror /api/contact behaviour: accept + log, so dev/preview still works.
    console.warn("[tweaks-feedback] RESEND_API_KEY not set — skipping send. Payload:", {
      ref,
      state: data.state,
      url: data.url,
    });
    return NextResponse.json({ ok: true, ref });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `[Backstage Tweaks] Configuración favorita · ${ref}`,
      text,
      html,
    });
    if (error) {
      console.error("Resend send failed", error);
      return NextResponse.json(
        { ok: false, error: "No hemos podido enviar la configuración. Inténtelo de nuevo." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend threw", err);
    return NextResponse.json(
      { ok: false, error: "No hemos podido enviar la configuración. Inténtelo de nuevo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ref });
}
