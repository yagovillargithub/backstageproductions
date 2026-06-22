import Link from "next/link";
import { featuredSessions } from "@/content/sessions";
import { SesionCard } from "./sesiones-card";

/* Tres sesiones destacadas del catálogo, con la misma card que /sesiones. */
const FEATURED = featuredSessions().slice(0, 3);

export function HomeSesiones() {
  return (
    <section>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <span className="eyebrow">Catálogo</span>
            <h2 className="section-h mt-3">
              Sesiones <em>recientes</em>
            </h2>
          </div>
          <Link href="/sesiones" className="btn">
            Ver todas <span className="arrow">→</span>
          </Link>
        </div>

        <div className="session-grid mt-[var(--s-5)]">
          {FEATURED.map((s, i) => (
            <SesionCard key={s.slug} session={s} reveal={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
