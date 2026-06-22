import type { EventItem } from "@/content/events";
import { eventDay } from "@/content/events";
import { shortDate } from "@/lib/utils";
import { EVENT_TYPE_LABELS, Lineup } from "./eventos-shared";

/** Archivo de fechas celebradas: lista compacta y apagada, sin interacción. */
export function EventosArchivo({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;

  return (
    <section>
      <div className="wrap">
        <div className="mb-[var(--s-5)] flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <p className="eyebrow">Archivo</p>
            <h2 className="section-h mt-[var(--s-3)]">Celebrados</h2>
          </div>
          <span className="num">{events.length} fechas</span>
        </div>

        <div className="events-list opacity-75" data-reveal data-reveal-delay="1">
          {events.map((e) => (
            <div
              key={e.slug}
              className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-rule py-4"
            >
              <span className="mono w-[110px] shrink-0 text-faint">
                {shortDate(eventDay(e))} {e.date.slice(0, 4)}
              </span>
              <span className="font-display text-xl text-fg-dim">{e.title}</span>
              <span className="event-type" data-type={e.type}>
                {EVENT_TYPE_LABELS[e.type]}
              </span>
              <span className="event-lineup">
                <Lineup names={e.lineup} />
              </span>
              <span className="mono ml-auto text-faint">{e.venue}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
