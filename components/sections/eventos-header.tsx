import type { EventItem } from "@/content/events";
import { eventDay } from "@/content/events";
import { shortDate } from "@/lib/utils";
import { Poster } from "@/components/art/poster";
import { EVENT_TYPE_LABELS } from "./eventos-shared";

/** Cabecera de /eventos: titular de agenda + póster de la próxima fecha. */
export function EventosHeader({ next }: { next?: EventItem }) {
  return (
    <section className="pt-36 pb-0">
      <div className="wrap">
        <div className="grid items-end gap-[var(--s-6)] lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow" data-reveal>
              Agenda
            </p>
            <h1 className="display mt-[var(--s-4)]" data-reveal="char">
              Eventos
            </h1>
            <p className="lede mt-[var(--s-5)]" data-reveal data-reveal-delay="2">
              Grabaciones con aforo abierto en la nave, juntadas de escucha y
              showcases del sello en salas de Madrid. Es la parte del calendario
              donde la red se ve en persona: artistas, salas, productoras y
              colectivos en el mismo sitio.
            </p>
          </div>

          {next && (
            <div className="w-full max-w-[340px] lg:justify-self-end" data-reveal data-reveal-delay="3">
              <p className="num mb-3">Próxima fecha</p>
              <div className="poster-frame aspect-[4/5]">
                <Poster
                  seed={next.slug}
                  /* Solo la cabecera del título: el cartel SVG recorta líneas largas */
                  title={next.title.split(":")[0]}
                  kind="event"
                  image={next.image}
                />
              </div>
              <p className="small mt-3 text-fg-dim">{next.title}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="mono text-faint">
                  {shortDate(eventDay(next))} · {next.venue}
                </span>
                <span className="event-type" data-type={next.type}>
                  {EVENT_TYPE_LABELS[next.type]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
