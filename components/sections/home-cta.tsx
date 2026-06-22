import Link from "next/link";
import { SITE } from "@/content/site";
import { prettyPhone, waLink } from "@/lib/utils";

/** Cierre de la home: la conversión es contactar, no comprar. */
export function HomeCta() {
  return (
    <section className="bigcta">
      <div className="wrap">
        <span className="eyebrow" data-reveal>
          Tu sesión
        </span>
        <h2
          className="display"
          style={{ margin: "var(--s-4) 0 var(--s-6)" }}
          data-reveal
          data-reveal-delay="1"
        >
          Grábala en Backstage <em>como debe ser</em>.
        </h2>

        <div
          className="flex flex-wrap items-center gap-[var(--s-4)] border-t border-[color:var(--rule)] pt-[var(--s-5)]"
          data-reveal
          data-reveal-delay="2"
        >
          <Link href="/contacto" className="btn btn--accent">
            Grabar una sesión <span className="arrow">→</span>
          </Link>
          <a href={`mailto:${SITE.email}`} className="mono transition-colors hover:text-accent">
            {SITE.email}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mono transition-colors hover:text-accent"
          >
            WhatsApp · {prettyPhone()}
          </a>
        </div>
      </div>
    </section>
  );
}
