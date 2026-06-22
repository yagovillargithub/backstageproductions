import Link from "next/link";
import { Poster } from "@/components/art/poster";
import { Waveform } from "@/components/art/waveform";
import { getArtist } from "@/content/artists";
import type { Session } from "@/content/sessions";
import { cn, shortDate } from "@/lib/utils";

const PLATFORM_LABEL: Record<Session["platforms"][number], string> = {
  youtube: "YouTube",
  soundcloud: "SoundCloud",
};

const FORMAT_LABEL: Record<Session["formats"][number], string> = {
  audio: "audio",
  video: "vídeo",
};

/**
 * Tarjeta de sesión compartida por la banda destacada (póster más panorámico
 * y descripción) y el grid filtrable. Sin estado: server-safe, el grid
 * cliente la importa sin coste extra. El play es decorativo — la preview es
 * UI, no hay audio real — por eso es un span aria-hidden y no un button.
 * Los tamaños de título van inline: los h3 de globals.css son unlayered y
 * ganan a cualquier utilidad Tailwind.
 */
export function SesionCard({
  session,
  featured = false,
  reveal,
}: {
  session: Session;
  featured?: boolean;
  /** Si se define, la card entra con data-reveal (1..5 = delay escalonado). */
  reveal?: number;
}) {
  const artist = getArtist(session.artistSlug);
  const revealProps =
    reveal === undefined
      ? {}
      : {
          "data-reveal": "",
          ...(reveal > 0 ? { "data-reveal-delay": String(Math.min(reveal, 5)) } : {}),
        };

  return (
    <article className="session-card group" {...revealProps}>
      <div className={cn("poster-frame", featured ? "aspect-video" : "aspect-[16/10]")}>
        <Poster seed={session.slug} title={session.title} kind="session" image={session.image} />
      </div>

      <div className="session-card-head">
        <div className="flex flex-col gap-1.5">
          <h3 style={{ fontSize: featured ? "clamp(24px, 2.2vw, 32px)" : "clamp(20px, 1.8vw, 26px)" }}>
            {session.title}
          </h3>
          {artist && (
            <Link
              href={`/artistas#${artist.slug}`}
              className="mono text-fg-faint transition-colors hover:text-accent"
            >
              {artist.name}
            </Link>
          )}
        </div>
        <span className="session-play" aria-hidden="true" />
      </div>

      {featured && (
        <p className="small text-fg-dim" style={{ maxWidth: "58ch" }}>
          {session.description}
        </p>
      )}

      <div className="session-meta">
        <span>
          {shortDate(session.date)} {session.date.slice(0, 4)}
        </span>
        <span>{session.durationMin} min</span>
        <span>{session.genres.join(" · ")}</span>
        {session.formats.map((f) => (
          <span key={f} className="badge">
            {FORMAT_LABEL[f]}
          </span>
        ))}
      </div>

      <div className="session-wave">
        <Waveform
          seed={session.slug}
          className="h-full w-full text-[color:var(--steel)] transition-colors duration-300 group-hover:text-accent"
        />
      </div>

      <div className="chip-row">
        {session.platforms.map((p) => {
          const href = session.links[p];
          if (!href) return null;
          return (
            <a
              key={p}
              className="platform-badge"
              data-platform={p}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {PLATFORM_LABEL[p]}
            </a>
          );
        })}
      </div>
    </article>
  );
}
