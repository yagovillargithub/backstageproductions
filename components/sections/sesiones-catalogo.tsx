import { SesionesGridFiltrable } from "./sesiones-grid-filtrable";

/** Sección del archivo completo: cabecera server + grid filtrable cliente.
 *  El "use client" vive solo en el grid, no en la sección. */
export function SesionesCatalogo() {
  return (
    <section id="archivo">
      <div className="wrap">
        <span className="eyebrow" data-reveal>
          Archivo
        </span>
        <h2
          className="section-h"
          data-reveal
          data-reveal-delay="1"
          style={{ margin: "var(--s-3) 0 var(--s-5)" }}
        >
          Todas <em>las sesiones</em>
        </h2>
        <SesionesGridFiltrable />
      </div>
    </section>
  );
}
