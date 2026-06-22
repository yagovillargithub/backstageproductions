import { MANIFESTO } from "@/content/site";

/** El claim "nexo de unión" de los fundadores: lead grande + cuatro bloques
 *  (Estudio · Sello · Red · Comunidad). Server-rendered, reveal escalonado. */
export function HomeManifesto() {
  return (
    <section>
      <div className="wrap">
        <div className="grid gap-[var(--s-5)] md:grid-cols-[1fr_2fr] md:gap-[var(--s-6)]">
          <span className="eyebrow self-start" data-reveal>
            {MANIFESTO.eyebrow}
          </span>

          <div>
            <p
              className="font-display text-balance"
              style={{
                fontSize: "clamp(26px, 3.2vw, 46px)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: "var(--fg)",
              }}
              data-reveal
            >
              {MANIFESTO.lead}
            </p>

            <div
              className="mt-[var(--s-6)] grid gap-[var(--s-5)] border-t border-[color:var(--rule)] pt-[var(--s-5)] sm:grid-cols-2"
              data-reveal
              data-reveal-delay="1"
            >
              {MANIFESTO.blocks.map((b, i) => (
                <div key={b.title}>
                  <div className="flex items-baseline gap-3">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>{b.title}</h3>
                  </div>
                  <p className="small mt-3 text-fg-dim" style={{ maxWidth: "46ch" }}>
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
