import { featuredSessions } from "@/content/sessions";
import { SesionCard } from "./sesiones-card";

/** Banda de sesiones destacadas: las marcadas featured en content/sessions.ts,
 *  en cards grandes con descripción. Server-rendered: aquí sí hay reveal. */
export function SesionesDestacadas() {
  const featured = featuredSessions();
  if (featured.length === 0) return null;

  return (
    <section>
      <div className="wrap">
        <span className="eyebrow" data-reveal>
          Selección del sello
        </span>
        <h2
          className="section-h"
          data-reveal
          data-reveal-delay="1"
          style={{ margin: "var(--s-3) 0 var(--s-5)" }}
        >
          En <em>portada</em>
        </h2>
        <div className="session-grid">
          {featured.map((s, i) => (
            <SesionCard key={s.slug} session={s} featured reveal={(i % 2) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
