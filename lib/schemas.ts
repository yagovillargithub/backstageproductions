import { z } from "zod";

/* ─────────────────────────────────────────────────────────────
 * Contacto — un DJ (o sala/productora) que quiere grabar/colaborar.
 * SIN presupuesto: se pregunta tipo de sesión, formato y plazo.
 * ───────────────────────────────────────────────────────────── */
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Este campo es necesario." })
    .trim()
    .min(2, "Tu nombre o alias, por favor.")
    .max(100),
  email: z
    .string({ required_error: "Este campo es necesario." })
    .trim()
    .email("Email no válido."),
  /** Alias artístico / proyecto / sala (opcional pero útil). */
  project: z.string().trim().max(120).optional().default(""),
  /** Qué busca: grabar, editar, promo, colaboración, etc. */
  interest: z
    .array(z.string().min(1).max(60))
    .min(1, "Selecciona al menos una opción.")
    .max(8),
  /** Formato de la sesión. */
  format: z
    .enum(["audio", "audio-video", "por-definir", ""])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  message: z
    .string({ required_error: "Este campo es necesario." })
    .trim()
    .min(20, "Cuéntanos un poco más (mín. 20 caracteres).")
    .max(1000, "Máximo 1.000 caracteres."),
  /** Plazo deseado — nunca presupuesto. */
  timeline: z
    .enum(["asap", "este-mes", "este-trimestre", "explorando", ""])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  /** Honeypot — debe quedar vacío. */
  website: z.string().max(0, "Bot detectado.").optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const TIMELINE_LABELS: Record<NonNullable<ContactInput["timeline"]>, string> = {
  "asap": "Cuanto antes",
  "este-mes": "Este mes",
  "este-trimestre": "Este trimestre",
  "explorando": "Aún explorando",
};

export const FORMAT_LABELS: Record<NonNullable<ContactInput["format"]>, string> = {
  "audio": "Solo audio",
  "audio-video": "Audio + vídeo",
  "por-definir": "Por definir",
};

/* ─────────────────────────────────────────────────────────────
 * Tweaks feedback — "Me gusta esta configuración" del panel.
 * Shape laxo: solo validamos tipos (el set de tweaks evoluciona).
 * ───────────────────────────────────────────────────────────── */
export const tweaksFeedbackSchema = z.object({
  name: z.string().trim().max(80).optional().default(""),
  note: z.string().trim().max(500).optional().default(""),
  state: z.record(z.union([z.string(), z.boolean(), z.number()])),
  url: z.string().trim().max(500).optional().default(""),
  /** Honeypot. */
  website: z.string().max(0, "Bot detectado.").optional().default(""),
});

export type TweaksFeedbackInput = z.infer<typeof tweaksFeedbackSchema>;
