/** Nota fija sobre las juntadas: el lado comunidad del calendario. */
export function EventosJuntadas() {
  return (
    <section className="pt-0">
      <div className="wrap">
        <div
          className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-bg-2"
          data-reveal
        >
          <div className="tape">
            <span>Juntadas</span>
            <b>Cabina abierta</b>
          </div>
          <div className="grid gap-[var(--s-5)] p-[var(--s-5)] lg:grid-cols-2">
            <div>
              <p className="eyebrow">Comunidad</p>
              <h3 className="mt-4">Qué es una juntada</h3>
              <p className="mt-4 max-w-[55ch] text-fg-dim">
                Las juntadas son la cara informal del calendario: escuchamos los
                másters recién terminados, abrimos la cabina por turnos para b2b
                improvisados y dejamos que la tarde se alargue. No hay cartel
                cerrado ni cabeza de cartel; hay discos, USB y gente de la
                escena conociéndose en persona.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-[var(--s-3)]">
              <div className="chip-row">
                <span className="chip">Listening de másters</span>
                <span className="chip">B2B abierto por turnos</span>
                <span className="chip">Cabina libre</span>
              </div>
              <p className="small max-w-[48ch] text-faint">
                El aforo lo marca el tamaño de la nave, así que las plazas se
                anuncian en Instagram y se reservan por WhatsApp. Basta con
                avisar de que vienes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
