"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTISTS, type Artist } from "@/content/artists";
import { Poster } from "@/components/art/poster";
import { cn } from "@/lib/utils";

/* Datos estáticos: las particiones y la lista de géneros se calculan una vez
   a nivel de módulo; el estado del filtro solo decide qué se pinta. */
const RESIDENTES = ARTISTS.filter((a) => a.role === "residente");
const INVITADOS = ARTISTS.filter((a) => a.role === "invitado");
const GENRES = [...new Set(ARTISTS.flatMap((a) => a.genres))].sort((a, b) =>
  a.localeCompare(b, "es")
);

const pad = (n: number) => String(n).padStart(2, "0");

export function ArtistasRoster() {
  const [genre, setGenre] = useState<string | null>(null);

  const matches = (a: Artist) => genre === null || a.genres.includes(genre);
  const residentes = RESIDENTES.filter(matches);
  const invitados = INVITADOS.filter(matches);

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="filter-bar" role="group" aria-label="Filtrar artistas por género" data-reveal>
          <button
            type="button"
            className={cn("chip", genre === null && "active")}
            aria-pressed={genre === null}
            onClick={() => setGenre(null)}
          >
            Todos
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              className={cn("chip", genre === g && "active")}
              aria-pressed={genre === g}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-7)" }}>
          <RosterBlock
            title="Residentes"
            intro="La base del sello: cabinas fijas del estudio, con serie propia y voz en el catálogo."
            artists={residentes}
            emptyLabel="Sin residentes en este género."
          />
          <RosterBlock
            title="Invitados"
            intro="Quienes pasan por la cabina: una sesión, una serie compartida o un b2b con la casa."
            artists={invitados}
            emptyLabel="Sin invitados en este género."
            dense
          />
        </div>
      </div>
    </section>
  );
}

function RosterBlock({
  title,
  intro,
  artists,
  emptyLabel,
  dense,
}: {
  title: string;
  intro: string;
  artists: Artist[];
  emptyLabel: string;
  /** Invitados: rejilla de 3 columnas y bio recortada. */
  dense?: boolean;
}) {
  return (
    <div>
      {/* Cabecera del bloque: siempre montada aunque el filtro vacíe la lista
          — los data-reveal solo van en nodos estables (el RevealController
          únicamente re-escanea al cambiar de ruta). */}
      <div data-reveal style={{ borderTop: "1px solid var(--rule)", paddingTop: "var(--s-4)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
          <h2 className="section-h">{title}</h2>
          <span className="num">{pad(artists.length)}</span>
        </div>
        <p className="text-faint small" style={{ marginTop: 10, maxWidth: "52ch" }}>
          {intro}
        </p>
      </div>

      <div style={{ marginTop: "var(--s-4)" }}>
        {artists.length === 0 ? (
          <p className="mono text-faint">{emptyLabel}</p>
        ) : dense ? (
          <div className="artist-grid">
            {artists.map((a) => (
              <ArtistCard key={a.slug} artist={a} dense />
            ))}
          </div>
        ) : (
          <div className="grid gap-[var(--s-4)] md:grid-cols-2">
            {artists.map((a) => (
              <ArtistCard key={a.slug} artist={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ArtistCard({ artist, dense }: { artist: Artist; dense?: boolean }) {
  const sesiones = artist.sessions.length;

  /* Ángulo "nexo": sellos, salas y colaboraciones de cada artista, aplanados
     en chips; el tipo va en title para no cargar la tarjeta. */
  const red = [
    ...(artist.connections?.labels ?? []).map((name) => ({ name, type: "Sello" })),
    ...(artist.connections?.venues ?? []).map((name) => ({ name, type: "Sala" })),
    ...(artist.connections?.collabs ?? []).map((name) => ({ name, type: "Colaboración" })),
  ];

  const redes: { label: string; href: string }[] = [];
  if (artist.links?.soundcloud) redes.push({ label: "SoundCloud", href: artist.links.soundcloud });
  if (artist.links?.instagram) redes.push({ label: "Instagram", href: artist.links.instagram });
  if (artist.links?.youtube) redes.push({ label: "YouTube", href: artist.links.youtube });

  return (
    <article className="artist-card">
      <div className="artist-card-media">
        <Poster seed={artist.slug} title={artist.name} kind="artist" image={artist.image} />
      </div>
      <div className="artist-card-body">
        <span
          className="artist-card-role"
          style={artist.role === "invitado" ? { color: "var(--steel)" } : undefined}
        >
          {artist.role === "invitado" ? "Invitado" : "Residente"}
        </span>

        <div>
          <h3>{artist.name}</h3>
          {/* Slot de alias siempre montado para que la chip-row y la bio
              queden a la misma altura aunque el artista no tenga alias. */}
          <p
            className="mono text-faint"
            style={{ marginTop: 4, minHeight: "1lh" }}
          >
            {artist.alias ?? " "}
          </p>
        </div>

        <div className="chip-row">
          {artist.genres.map((g) => (
            <span key={g} className="artist-tag">
              {g}
            </span>
          ))}
        </div>

        <p className={cn("small", dense && "line-clamp-3")} style={{ color: "var(--fg-dim)" }}>
          {artist.bio}
        </p>

        {red.length > 0 && (
          <div>
            <span
              className="mono text-faint"
              style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Red
            </span>
            <div className="chip-row" style={{ marginTop: 6 }}>
              {red.map((c) => (
                <span key={`${c.type}-${c.name}`} className="chip" title={`${c.type} · ${c.name}`}>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          className="mono"
          style={{
            marginTop: "auto",
            paddingTop: 12,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Link href="/sesiones" className="num" title={`Sesiones de ${artist.name} en el archivo`}>
            {sesiones === 1 ? "1 sesión grabada" : `${sesiones} sesiones grabadas`}
          </Link>
          {redes.length > 0 && (
            <span style={{ color: "var(--fg-dim)", display: "inline-flex", gap: 12, flexWrap: "wrap" }}>
              {redes.map((r) => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label} ↗
                </a>
              ))}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
