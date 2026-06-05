import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brecords.unlimited-systems.net";

export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "34600000000";

export function waLink(message = "Hola Backstage, quiero grabar una sesión") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Formats a number like 34600123456 → "+34 600 123 456" (best-effort, ES). */
export function prettyPhone(raw: string = WA_NUMBER) {
  const m = raw.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${raw}`;
}

/** Deterministic 0..1 hash from a string — used by SVG posters to vary art per slug. */
export function seededHash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

/** Formats an ISO date (YYYY-MM-DD) to a short ES label, e.g. "14 JUN". */
export function shortDate(iso: string): string {
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  const [, m, d] = iso.split("-").map(Number) as [number, number, number];
  return `${String(d).padStart(2, "0")} ${months[(m ?? 1) - 1]}`;
}
