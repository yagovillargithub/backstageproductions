import Link from "next/link";
import { upcomingEvents, eventDay } from "@/content/events";
import { cn, shortDate } from "@/lib/utils";
import { EVENT_STATUS_LABELS, EVENT_TYPE_LABELS, Lineup } from "./eventos-shared";

/* Teaser de las tres próximas fechas; la agenda completa con filtros vive en
   /eventos. Server-rendered (sin filtro), así que aquí sí va data-reveal. */
const NEXT = upcomingEvents().slice(0, 3);

const STATUS_DOT: Record<(typeof NEXT)[number]["status"], string> = {
  abierto: "bg-accent",
  completo: "bg-steel",
  proximamente: "bg-fg-faint",
  celebrado: "bg-fg-faint",
};

export function HomeEventos() {
  if (NEXT.length === 0) return null;

  return (
    <section>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <span className="eyebrow">Agenda</span>
            <h2 className="section-h mt-3">
              Próximas <em>fechas</em>
            </h2>
          </div>
          <Link href="/eventos" className="btn">
            Ver agenda <span className="arrow">→</span>
          </Link>
        </div>

        <div className="events-list mt-[var(--s-5)]" data-reveal data-reveal-delay="1">
          {NEXT.map((e) => {
            const [day, mon] = shortDate(eventDay(e)).split(" ");
            return (
              <article key={e.slug} className="event-row">
                <div className="event-date">
                  <b>{day}</b>
                  <span>{mon}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-[length:clamp(20px,2vw,28px)]">{e.title}</h3>
                    <span className="event-type" data-type={e.type}>
                      {EVENT_TYPE_LABELS[e.type]}
                    </span>
                  </div>
                  <p className="mono mt-2 text-faint">
                    {e.venue} · {e.city}
                  </p>
                </div>

                <div className="event-lineup">
                  <Lineup names={e.lineup} link />
                </div>

                <span className="chip justify-self-end whitespace-nowrap">
                  <span
                    className={cn("inline-block size-1.5 rounded-full", STATUS_DOT[e.status])}
                    aria-hidden="true"
                  />
                  {EVENT_STATUS_LABELS[e.status]}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
