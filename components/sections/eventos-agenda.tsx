"use client";

import { useState } from "react";
import type { EventItem } from "@/content/events";
import { eventDay } from "@/content/events";
import { cn, shortDate } from "@/lib/utils";
import {
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
  Lineup,
  monthLabel,
} from "./eventos-shared";

type Filter = "todos" | EventItem["type"];

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "todos", label: "Todo" },
  { id: "sesion", label: "Sesiones" },
  { id: "juntada", label: "Juntadas" },
  { id: "b2b", label: "B2B" },
  { id: "showcase", label: "Showcases" },
];

const STATUS_DOT: Record<EventItem["status"], string> = {
  abierto: "bg-accent",
  completo: "bg-steel",
  proximamente: "bg-fg-faint",
  celebrado: "bg-fg-faint",
};

/**
 * Próximas fechas agrupadas por mes, con filtro por tipo. Cliente solo por el
 * estado del filtro; los eventos llegan ya ordenados desde el Server Component
 * de la página. Sin data-reveal en las filas: el observer no re-observa nodos
 * que aparecen al cambiar de filtro y quedarían invisibles.
 */
export function EventosAgenda({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const filtered = filter === "todos" ? events : events.filter((e) => e.type === filter);

  const groups: Array<{ key: string; items: EventItem[] }> = [];
  for (const e of filtered) {
    const key = e.date.slice(0, 7);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.items.push(e);
    else groups.push({ key, items: [e] });
  }

  return (
    <section>
      <div className="wrap">
        <div className="mb-[var(--s-5)] flex flex-wrap items-end justify-between gap-4" data-reveal>
          <h2 className="section-h">
            En <em>agenda</em>
          </h2>
          <span className="num">{events.length} fechas</span>
        </div>

        <div className="filter-bar" role="group" aria-label="Filtrar eventos por tipo" data-reveal>
          {FILTERS.map((f) => {
            const count =
              f.id === "todos" ? events.length : events.filter((e) => e.type === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                className={cn("chip", filter === f.id && "active")}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div data-reveal data-reveal-delay="1">
          {groups.map((g) => (
            <div key={g.key} className="mb-[var(--s-5)]">
              <p className="mono mb-3 uppercase tracking-[0.14em] text-faint">
                {monthLabel(g.key)}
              </p>
              <div className="events-list">
                {g.items.map((e) => (
                  <EventRow key={e.slug} event={e} />
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="mono py-[var(--s-5)] text-faint">
              Sin fechas de este tipo en agenda ahora mismo. Si quieres proponer
              una, escríbenos desde contacto.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function EventRow({ event: e }: { event: EventItem }) {
  const [day, mon] = shortDate(eventDay(e)).split(" ");
  return (
    <article className="event-row">
      <div className="event-date">
        <b>{day}</b>
        <span>{mon}</span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-[length:clamp(22px,2.4vw,32px)]">{e.title}</h3>
          <span className="event-type" data-type={e.type}>
            {EVENT_TYPE_LABELS[e.type]}
          </span>
        </div>
        <p className="mono mt-2 text-faint">
          {e.venue} · {e.city}
        </p>
        <p className="small mt-2 max-w-[62ch] text-fg-dim">{e.description}</p>
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
}
