import Link from "next/link";
import type { EventItem } from "@/content/events";
import { getArtist } from "@/content/artists";

/* Piezas compartidas por las secciones de /eventos. Sin "use client" para
   poder importarlas tanto desde Server Components (archivo, cabecera) como
   desde el filtro cliente de la agenda. */

export const EVENT_TYPE_LABELS: Record<EventItem["type"], string> = {
  sesion: "Sesión",
  juntada: "Juntada",
  showcase: "Showcase",
  b2b: "B2B",
};

export const EVENT_STATUS_LABELS: Record<EventItem["status"], string> = {
  proximamente: "Próximamente",
  abierto: "Abierto",
  completo: "Completo",
  celebrado: "Celebrado",
};

const MONTHS_LONG = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];

/** "2026-06" → "JUNIO 2026" (cabeceras de grupo de la agenda). */
export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS_LONG[(m ?? 1) - 1]} ${y}`;
}

/**
 * Pinta el lineup resolviendo cada entrada contra el roster: los slugs de
 * content/artists.ts salen con su nombre artístico (y enlazados a /artistas
 * si `link`); los nombres externos se pintan tal cual.
 */
export function Lineup({ names, link = false }: { names: string[]; link?: boolean }) {
  return (
    <>
      {names.map((entry, i) => {
        const artist = getArtist(entry);
        const label = artist?.name ?? entry;
        return (
          <span key={entry}>
            {i > 0 && <span className="text-faint"> · </span>}
            {artist && link ? (
              <Link
                href={`/artistas#${artist.slug}`}
                className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {label}
              </Link>
            ) : (
              label
            )}
          </span>
        );
      })}
    </>
  );
}
