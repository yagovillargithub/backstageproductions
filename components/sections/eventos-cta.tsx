import Link from "next/link";
import { waLink } from "@/lib/utils";

/** Cierre de /eventos: invitación a salas, colectivos y productoras. */
export function EventosCta() {
  return (
    <section className="bigcta">
      <div className="wrap">
        <p className="num" data-reveal>
          Salas · Colectivos · Productoras
        </p>
        <h2 className="section-h bigcta-h" data-reveal data-reveal-delay="1">
          Organiza algo <em>con nosotros</em>.
        </h2>
        <p className="lede" data-reveal data-reveal-delay="2">
          Si programas una sala, mueves un colectivo o llevas una productora, la
          nave y el equipo de grabación están abiertos a fechas compartidas:
          showcases, b2b y sesiones con público que después circulan en YouTube
          y SoundCloud. Cuéntanos formato, fecha tentativa y tipo de sesión, y
          lo concretamos.
        </p>
        <div className="bigcta-row" data-reveal data-reveal-delay="3">
          <Link href="/contacto" className="btn btn--accent">
            Proponer una fecha <span className="arrow">→</span>
          </Link>
          <a
            href={waLink("Hola Backstage, quiero proponer una fecha para un evento")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Escribir por WhatsApp <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
