import Link from "next/link";
import { prettyPhone, waLink } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/content/site";

const SOCIAL_URL = {
  instagram: (h: string) => `https://instagram.com/${h}`,
  soundcloud: (h: string) => `https://soundcloud.com/${h}`,
  youtube: (h: string) => `https://youtube.com/@${h}`,
} as const;

/** SITE.social values may arrive as handles or full URLs — normalize either way. */
function socialHref(kind: keyof typeof SOCIAL_URL, value: string) {
  return value.startsWith("http") ? value : SOCIAL_URL[kind](value.replace(/^@/, ""));
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid">
          <div>
            {/* Marca a color (el footer no lleva mix-blend-mode, el verde
                del icono se ve fiel). Respeta el modo "texto" de Tweaks. */}
            <img
              className="footer-mark"
              src="/img/brand/icon-mark.png"
              alt="Backstage Records"
              width={43}
              height={46}
            />
            <h4>{SITE.name}</h4>
            <p className="text-faint" style={{ maxWidth: "34ch" }}>
              Grabación, edición y promoción de sesiones de música electrónica.
              Nexo de unión entre artistas, productoras y salas.
            </p>
          </div>
          <div>
            <h4>Estudio</h4>
            <ul>
              <li>{SITE.studioName}</li>
              <li>{SITE.address}</li>
              <li>{SITE.city} · ES</li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  {prettyPhone()}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Navegación</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Redes</h4>
            <ul>
              <li>
                <a
                  href={socialHref("instagram", SITE.social.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={socialHref("soundcloud", SITE.social.soundcloud)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SoundCloud
                </a>
              </li>
              <li>
                <a
                  href={socialHref("youtube", SITE.social.youtube)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-big" aria-hidden="true">BACKSTAGE</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Web por Unlimited Systems</span>
        </div>
      </div>
    </footer>
  );
}
