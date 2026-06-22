import { ARTISTS } from "@/content/artists";

const pad = (n: number) => String(n).padStart(2, "0");

export function ArtistasHeader() {
  const residentes = ARTISTS.filter((a) => a.role === "residente").length;
  const invitados = ARTISTS.length - residentes;

  return (
    <section style={{ paddingTop: 140, paddingBottom: "var(--s-5)" }}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          Roster
        </p>
        <h1 className="display" data-reveal data-reveal-delay="1" style={{ marginTop: "var(--s-3)" }}>
          Artistas
        </h1>
        <p className="lede" data-reveal data-reveal-delay="2" style={{ marginTop: "var(--s-4)" }}>
          Residentes que graban en casa, invitados que pasan por la cabina y,
          detrás de cada nombre, la red de sellos, salas y colectivos con la
          que circulan las sesiones.
        </p>
        <div
          data-reveal
          data-reveal-delay="3"
          style={{ marginTop: "var(--s-4)", display: "flex", gap: 18, flexWrap: "wrap" }}
        >
          <span className="num">{pad(residentes)} residentes</span>
          <span className="num">{pad(invitados)} invitados</span>
          <span className="num">Madrid</span>
        </div>
      </div>
    </section>
  );
}
