import Link from "next/link";
import { HERO } from "@/content/site";

/* El nexo orbitando la sesión: destinos de publicación y red del sello. */
const ORBIT_NODES = ["YouTube", "SoundCloud", "Salas", "Productoras", "Sellos"];

export function HomeHero() {
  return (
    <section id="hero" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-meta">
          <span className="eyebrow">{HERO.eyebrow}</span>
          <span className="hero-status mono text-faint">
            <span className="dot-live" /> GRABANDO — Backstage Sessions
          </span>
          <span className="mono text-faint max-sm:hidden">40.4168 N · 3.7038 O — MAD / 2026</span>
        </div>

        <h1 className="display hero-h" data-reveal="char">
          {HERO.title.pre}
          <br />
          <em>{HERO.title.em}</em>
          {HERO.title.post}
        </h1>

        <div className="hero-side" data-reveal data-reveal-delay="2">
          <p className="lede">{HERO.sub}</p>
          <div className="hero-cta">
            <Link className="btn btn--accent" href="/contacto">
              Grabar una sesión <span className="arrow">→</span>
            </Link>
            <Link className="btn" href="/sesiones">
              Ver sesiones
            </Link>
          </div>
        </div>

        {/* Deck en markup CSS (contrato documentado en globals.css) en lugar de
            <DeckVisual/>: las animaciones de .deck-platter/.deck-arm y las
            variantes rejilla/tipo del panel Tweaks están escritas contra estos
            spans; montar el SVG rompería plato y brazo (transform-origin de
            view-box) sin poder corregirse desde utilidades (capas CSS). */}
        <div className="hero-visual" aria-hidden="true">
          <div className="deck">
            <span className="deck-ring r3" />
            <span className="deck-ring r2" />
            <span className="deck-ring r1" />
            <span className="deck-platter" />
            <span className="deck-pulse" />
            <span className="deck-core" />
            <span className="deck-arm" />
            {ORBIT_NODES.map((label, i) => (
              <span key={label} className={`orbit-node n${i + 1}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-scroll mono text-faint">
          <span>Desplázate</span>
          <span className="hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}
