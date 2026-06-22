import { SITE } from "@/content/site";
import { prettyPhone, waLink } from "@/lib/utils";

/* Las URLs se derivan de los handles de content/site.ts: al llegar los
   datos reales solo cambia ese fichero. */
const SOCIALS = [
  {
    label: "Instagram",
    href: `https://instagram.com/${SITE.social.instagram.replace(/^@/, "")}`,
  },
  {
    label: "SoundCloud",
    href: `https://soundcloud.com/${SITE.social.soundcloud}`,
  },
  {
    label: "YouTube",
    href: `https://youtube.com/${SITE.social.youtube}`,
  },
];

export function ContactoIntro() {
  return (
    <div className="ct-left">
      <p className="eyebrow" data-reveal>
        Contacto
      </p>
      <h1 className="display ct-h" data-reveal data-reveal-delay="1">
        Tu sesión
        <br />
        <em>empieza aquí.</em>
      </h1>
      <p className="lede" data-reveal data-reveal-delay="2" style={{ marginTop: "var(--s-4)" }}>
        Cuéntanos qué quieres grabar: formato de la sesión, plazo que manejas y
        cómo suena tu proyecto. Te respondemos en menos de 24 horas laborables
        con los siguientes pasos.
      </p>

      <div className="ct-info" data-reveal data-reveal-delay="3">
        <div className="ct-info-row">
          <span className="mono text-faint">Email</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <div className="ct-info-row">
          <span className="mono text-faint">WhatsApp</span>
          <a href={waLink()} target="_blank" rel="noopener noreferrer">
            {prettyPhone(SITE.whatsapp)}
          </a>
        </div>
        <div className="ct-info-row">
          <span className="mono text-faint">Estudio</span>
          <span>
            {SITE.address}
            <br />
            <span className="text-faint small">Visitas con cita previa</span>
          </span>
        </div>
        <div className="ct-info-row">
          <span className="mono text-faint">Redes</span>
          <span>
            {SOCIALS.map((s, i) => (
              <span key={s.label}>
                {i > 0 && <span className="text-faint"> · </span>}
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </span>
            ))}
          </span>
        </div>
        <div className="ct-info-row">
          <span className="mono text-faint">Horario</span>
          <span>
            Lun–Vie · 10:00–21:00
            <br />
            <span className="text-faint small">Fines de semana, sesiones con reserva</span>
          </span>
        </div>
      </div>
    </div>
  );
}
