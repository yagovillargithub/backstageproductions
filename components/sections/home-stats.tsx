import { STATS } from "@/content/site";

/** Métricas de actividad, nunca dinero (regla de marca). */
export function HomeStats() {
  return (
    <section>
      <div className="wrap">
        <div className="stats-grid" data-reveal>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
