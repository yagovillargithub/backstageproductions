import Link from "next/link";
import { ARTISTS } from "@/content/artists";
import { SITE } from "@/content/site";

/* Muro agregado de connections: entidades externas con las que el roster ya
   trabaja. Fuera el propio sello (sería listarse a sí mismo) y fuera los
   collabs que son artistas del roster (ya tienen su tarjeta arriba). */
const collect = (pick: (a: (typeof ARTISTS)[number]) => string[] | undefined) =>
  [...new Set(ARTISTS.flatMap((a) => pick(a) ?? []))].sort((a, b) => a.localeCompare(b, "es"));

const ARTIST_NAMES = new Set(ARTISTS.map((a) => a.name));

const GROUPS = [
  {
    title: "Sellos",
    names: collect((a) => a.connections?.labels).filter((n) => n !== SITE.name),
  },
  {
    title: "Salas",
    names: collect((a) => a.connections?.venues),
  },
  {
    title: "Colectivos",
    names: collect((a) => a.connections?.collabs).filter((n) => !ARTIST_NAMES.has(n)),
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ArtistasRed() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          La red
        </p>
        <h2 className="section-h" data-reveal data-reveal-delay="1" style={{ marginTop: "var(--s-3)" }}>
          El roster es <em>la mitad de la historia.</em>
        </h2>
        <p className="lede" data-reveal data-reveal-delay="2" style={{ marginTop: "var(--s-4)" }}>
          Backstage conecta artistas, productoras, salas y sellos. Cada sesión
          que sale del estudio circula por los mismos sitios donde se programa,
          se publica y se contrata; estos son los nombres que ya se cruzan en
          nuestra cabina.
        </p>

        <div data-reveal data-reveal-delay="3" style={{ marginTop: "var(--s-6)", borderTop: "1px solid var(--rule)" }}>
          <div className="grid gap-[var(--s-5)] md:grid-cols-3" style={{ paddingTop: "var(--s-5)" }}>
            {GROUPS.map((g) => (
              <div key={g.title}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <h3 className="stencil" style={{ fontSize: "clamp(22px, 2.4vw, 36px)" }}>
                    {g.title}
                  </h3>
                  <span className="num">{pad(g.names.length)}</span>
                </div>
                <ul className="mono" style={{ listStyle: "none", marginTop: 16 }}>
                  {g.names.map((n, i) => (
                    <li
                      key={n}
                      style={{
                        display: "flex",
                        gap: 14,
                        padding: "10px 0",
                        borderBottom: "1px solid var(--rule)",
                        color: "var(--fg-dim)",
                      }}
                    >
                      <span className="text-faint">{pad(i + 1)}</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-faint" data-reveal style={{ marginTop: "var(--s-5)", maxWidth: "52ch" }}>
          Si pinchas, programas una sala o llevas un colectivo y quieres entrar
          en el circuito, escríbenos y te contamos cómo trabajar con el estudio.
        </p>
        <div className="bigcta-row" data-reveal data-reveal-delay="1" style={{ marginTop: "var(--s-4)" }}>
          <Link href="/contacto" className="btn btn--accent">
            Forma parte <span className="arrow">→</span>
          </Link>
          <Link href="/sesiones" className="btn">
            Ver las sesiones
          </Link>
        </div>
      </div>
    </section>
  );
}
