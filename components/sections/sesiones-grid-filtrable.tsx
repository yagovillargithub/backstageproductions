"use client";

import { useMemo, useState } from "react";
import { ARTISTS } from "@/content/artists";
import { SESSIONS } from "@/content/sessions";
import { cn } from "@/lib/utils";
import { SesionCard } from "./sesiones-card";

/**
 * Grid del archivo con filtros por género y por artista. Las cards van SIN
 * data-reveal a propósito: el RevealController solo observa los elementos
 * presentes al montar la ruta, y una card recreada al filtrar se quedaría
 * invisible (opacity 0 sin .is-in) para siempre.
 */
export function SesionesGridFiltrable() {
  const [genre, setGenre] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);

  const genres = useMemo(
    () => Array.from(new Set(SESSIONS.flatMap((s) => s.genres))).sort((a, b) => a.localeCompare(b, "es")),
    []
  );
  // Solo artistas con sesión como principal, en el orden del roster
  // (residentes primero) para que la barra cuente la misma historia.
  const artists = useMemo(() => {
    const principals = new Set(SESSIONS.map((s) => s.artistSlug));
    return ARTISTS.filter((a) => principals.has(a.slug));
  }, []);

  const filtered = SESSIONS.filter(
    (s) => (!genre || s.genres.includes(genre)) && (!artist || s.artistSlug === artist)
  );
  const hasFilters = genre !== null || artist !== null;
  const clearFilters = () => {
    setGenre(null);
    setArtist(null);
  };

  return (
    <div data-reveal>
      <div className="filter-bar" role="group" aria-label="Filtrar por género" style={{ marginBottom: "10px" }}>
        <span className="mono text-fg-faint self-center px-1">Género</span>
        <button
          type="button"
          className={cn("chip", genre === null && "active")}
          aria-pressed={genre === null}
          onClick={() => setGenre(null)}
        >
          Todos
        </button>
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            className={cn("chip", genre === g && "active")}
            aria-pressed={genre === g}
            onClick={() => setGenre(genre === g ? null : g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="filter-bar" role="group" aria-label="Filtrar por artista" style={{ marginBottom: "var(--s-3)" }}>
        <span className="mono text-fg-faint self-center px-1">Artista</span>
        <button
          type="button"
          className={cn("chip", artist === null && "active")}
          aria-pressed={artist === null}
          onClick={() => setArtist(null)}
        >
          Todos
        </button>
        {artists.map((a) => (
          <button
            key={a.slug}
            type="button"
            className={cn("chip", artist === a.slug && "active")}
            aria-pressed={artist === a.slug}
            onClick={() => setArtist(artist === a.slug ? null : a.slug)}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginBottom: "var(--s-4)" }}>
        <span className="num" aria-live="polite">
          {filtered.length} de {SESSIONS.length} sesiones
        </span>
        {hasFilters && (
          <button type="button" className="chip" onClick={clearFilters}>
            Quitar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="session-grid">
          {filtered.map((s) => (
            <SesionCard key={s.slug} session={s} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center gap-5 border border-rule px-6 py-16 text-center"
          style={{ borderRadius: "var(--radius-card)", background: "var(--bg-2)" }}
        >
          <p className="lede">Ninguna sesión del archivo coincide con esa combinación.</p>
          <button type="button" className="chip" onClick={clearFilters}>
            Quitar filtros
          </button>
        </div>
      )}
    </div>
  );
}
