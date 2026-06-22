import Link from "next/link";
import { ARTISTS } from "@/content/artists";
import { Poster } from "@/components/art/poster";

/* Tres residentes como adelanto del roster; la ficha completa vive en
   /artistas. Card ligera (sin red ni redes) para no competir con esa página. */
const FEATURED = ARTISTS.filter((a) => a.role === "residente").slice(0, 3);

export function HomeArtistas() {
  return (
    <section>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <span className="eyebrow">Roster</span>
            <h2 className="section-h mt-3">
              Residentes <em>de la casa</em>
            </h2>
          </div>
          <Link href="/artistas" className="btn">
            Conocer el roster <span className="arrow">→</span>
          </Link>
        </div>

        <div className="artist-grid mt-[var(--s-5)]">
          {FEATURED.map((a, i) => (
            <article
              key={a.slug}
              className="artist-card"
              data-reveal
              data-reveal-delay={String((i % 3) + 1)}
            >
              <div className="artist-card-media">
                <Poster seed={a.slug} title={a.name} kind="artist" image={a.image} />
              </div>
              <div className="artist-card-body">
                <span className="artist-card-role">Residente</span>
                <div>
                  <h3>{a.name}</h3>
                  {/* Slot de alias siempre montado para que la chip-row y la bio
                      queden a la misma altura aunque el artista no tenga alias. */}
                  <p
                    className="mono text-faint"
                    style={{ marginTop: 4, minHeight: "1lh" }}
                  >
                    {a.alias ?? " "}
                  </p>
                </div>
                <div className="chip-row">
                  {a.genres.slice(0, 3).map((g) => (
                    <span key={g} className="artist-tag">
                      {g}
                    </span>
                  ))}
                </div>
                <p className="small line-clamp-3" style={{ color: "var(--fg-dim)" }}>
                  {a.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
