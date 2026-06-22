import { PROCESS_STEPS } from "@/content/site";

/** Vienes → grabamos → editamos → promocionamos. Lista numerada server-side
 *  con los specs en líneas mono; cada paso entra con reveal escalonado. */
export function HomeProceso() {
  return (
    <section>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <span className="eyebrow">Proceso</span>
            <h2 className="section-h mt-3">
              De la toma <em>a la publicación</em>
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: "34ch" }}>
            Cuatro pasos, de la primera llamada a la sesión publicada.
          </p>
        </div>

        <div className="mt-[var(--s-6)] flex flex-col">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className="grid gap-[var(--s-3)] border-t border-[color:var(--rule)] py-[var(--s-5)] md:grid-cols-[auto_1.4fr_1fr] md:gap-[var(--s-5)]"
              data-reveal
              data-reveal-delay={String(Math.min(i + 1, 5))}
            >
              <span className="num self-start">{step.num}</span>

              <div>
                <h3>{step.title}</h3>
                <p className="small mt-3 text-fg-dim" style={{ maxWidth: "48ch" }}>
                  {step.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 self-start">
                {step.specs.map((s) => (
                  <li
                    key={s.k}
                    className="mono flex justify-between gap-4 border-b border-[color:var(--rule)] pb-2"
                  >
                    <span className="uppercase tracking-[0.1em] text-faint">{s.k}</span>
                    <span className="text-right text-fg-dim">{s.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
