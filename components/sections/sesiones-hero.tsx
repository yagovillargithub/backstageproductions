import { SESSIONS } from "@/content/sessions";

/**
 * Cabecera del catálogo. Las métricas se derivan del propio archivo
 * (content/sessions.ts) para que los contadores nunca desentonen con
 * los datos: añadir una sesión actualiza la cabecera sola.
 */
export function SesionesHero() {
  const seriesCount = new Set(SESSIONS.map((s) => s.slug.replace(/-\d+$/, ""))).size;
  const hours = Math.round(SESSIONS.reduce((acc, s) => acc + s.durationMin, 0) / 60);

  return (
    <section style={{ paddingTop: "clamp(140px, 18vh, 180px)" }}>
      <div className="wrap">
        <span className="eyebrow" data-reveal>
          Catálogo
        </span>
        <h1 className="display" data-reveal="char" style={{ marginTop: "var(--s-3)" }}>
          Sesiones
        </h1>
        <p className="lede" data-reveal data-reveal-delay="2" style={{ marginTop: "var(--s-4)" }}>
          Sets grabados en la cabina del estudio, editados con criterio de sello y publicados en
          YouTube y SoundCloud. Cada referencia sale con el audio masterizado, el vídeo montado al
          ritmo del set y una ficha lista para moverse entre salas, productoras y colectivos.
        </p>
        <div
          className="flex flex-wrap gap-x-5 gap-y-2"
          data-reveal
          data-reveal-delay="3"
          style={{ marginTop: "var(--s-5)" }}
        >
          <span className="num">{SESSIONS.length} sesiones</span>
          <span className="num">{seriesCount} series</span>
          <span className="num">{hours} h de cabina</span>
          <span className="num">YouTube · SoundCloud</span>
        </div>
      </div>
    </section>
  );
}
