import Link from "next/link";

/** Cierre del catálogo: la siguiente referencia es la del visitante.
 *  Se pide formato y tipo de sesión, nunca presupuesto. */
export function SesionesCta() {
  return (
    <section className="bigcta">
      <div className="wrap">
        <span className="num" data-reveal>
          Siguiente referencia
        </span>
        <h2 className="section-h bigcta-h" data-reveal data-reveal-delay="1">
          Tu set, <em>el siguiente</em>.
        </h2>
        <p className="lede" data-reveal data-reveal-delay="2" style={{ marginBottom: "var(--s-5)" }}>
          Cuéntanos el formato, la duración y el tipo de sesión que tienes en la cabeza. Nosotros
          ponemos la cabina, la edición y la red donde publicarla.
        </p>
        <div className="bigcta-row" data-reveal data-reveal-delay="3">
          <Link href="/contacto" className="btn btn--accent">
            Grabar sesión <span className="arrow">→</span>
          </Link>
          <Link href="/artistas" className="btn">
            Conocer el roster
          </Link>
        </div>
      </div>
    </section>
  );
}
