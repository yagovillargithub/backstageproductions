export type Session = {
  slug: string;
  title: string;
  /** Debe existir en content/artists.ts. En b2b figura el artista principal; el otro va en título y descripción. */
  artistSlug: string;
  /** ISO YYYY-MM-DD (fecha de publicación). */
  date: string;
  genres: string[];
  durationMin: number;
  formats: ("audio" | "video")[];
  platforms: ("youtube" | "soundcloud")[];
  /** URLs ficticias bien formadas — la preview no enlaza a contenido real. */
  links: { youtube?: string; soundcloud?: string };
  description: string;
  featured?: boolean;
  image?: string;
};

/**
 * Archivo de sesiones de ejemplo, de más reciente a más antigua.
 * Series: Backstage Sessions (principal), Nave Abierta (cabina del estudio),
 * Cabina Cruzada (b2b) y Archivo Vivo (formato largo, solo audio).
 */
export const SESSIONS: Session[] = [
  {
    slug: "nave-abierta-004",
    title: "Nave Abierta 004 — Rampa Sur",
    artistSlug: "rampa-sur",
    date: "2026-06-05",
    genres: ["breaks", "electro"],
    durationMin: 105,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-na004",
      soundcloud: "https://soundcloud.com/backstage-records/nave-abierta-004",
    },
    description:
      "Primera Nave Abierta grabada con público en el estudio. Cuatro platos y caja de ritmos, más cerca del directo que del set.",
  },
  {
    slug: "backstage-sessions-015",
    title: "Backstage Sessions 015 — Nora Eje",
    artistSlug: "nora-eje",
    date: "2026-05-22",
    genres: ["electro", "minimal"],
    durationMin: 78,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0015",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-015",
    },
    description:
      "Electro angular grabado a primera toma. La primera sesión en vídeo de Nora Eje.",
  },
  {
    slug: "cabina-cruzada-002",
    title: "Cabina Cruzada 002 — Inés Delta b2b Nora Eje",
    artistSlug: "ines-delta",
    date: "2026-05-08",
    genres: ["minimal", "electro"],
    durationMin: 118,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-cc002",
      soundcloud: "https://soundcloud.com/backstage-records/cabina-cruzada-002",
    },
    description:
      "Inés Delta y Nora Eje, dos horas a cuatro manos grabadas ante un grupo reducido de invitados.",
  },
  {
    slug: "backstage-sessions-014",
    title: "Backstage Sessions 014 — Vera Lumen",
    artistSlug: "vera-lumen",
    date: "2026-04-24",
    genres: ["melodic techno", "progressive"],
    durationMin: 96,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0014",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-014",
    },
    description:
      "El cierre de temporada de la serie principal. Noventa minutos de subida continua, pensados para escucharse de una sentada.",
    featured: true,
  },
  {
    slug: "archivo-vivo-001",
    title: "Archivo Vivo 001 — Mar Volta",
    artistSlug: "mar-volta",
    date: "2026-04-10",
    genres: ["deep house", "house"],
    durationMin: 178,
    formats: ["audio"],
    platforms: ["soundcloud"],
    links: {
      soundcloud: "https://soundcloud.com/backstage-records/archivo-vivo-001",
    },
    description:
      "Tres horas de deep house de selección lenta, solo audio. Primera entrega de la serie de formato largo del estudio.",
  },
  {
    slug: "backstage-sessions-013",
    title: "Backstage Sessions 013 — Txema Roda",
    artistSlug: "txema-roda",
    date: "2026-03-27",
    genres: ["house"],
    durationMin: 84,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0013",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-013",
    },
    description:
      "House clásico tocado de memoria. Txema Roda repasa tres décadas de pista madrileña sin mirar el reloj.",
  },
  {
    slug: "nave-abierta-003",
    title: "Nave Abierta 003 — Selva Gris",
    artistSlug: "selva-gris",
    date: "2026-03-13",
    genres: ["progressive", "melodic techno"],
    durationMin: 132,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-na003",
      soundcloud: "https://soundcloud.com/backstage-records/nave-abierta-003",
    },
    description:
      "Progressive de paciencia larga en la franja de tarde del estudio. Más de dos horas que crecen sin un solo golpe de efecto.",
    featured: true,
  },
  {
    slug: "cabina-cruzada-001",
    title: "Cabina Cruzada 001 — KRESTA b2b Lobo Norte",
    artistSlug: "kresta",
    date: "2026-02-27",
    genres: ["hard groove", "electro"],
    durationMin: 124,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-cc001",
      soundcloud: "https://soundcloud.com/backstage-records/cabina-cruzada-001",
    },
    description:
      "KRESTA y Lobo Norte estrenan la serie de b2b de la casa. Hard groove contra electro, mezclado a cuatro manos.",
  },
  {
    slug: "backstage-sessions-012",
    title: "Backstage Sessions 012 — Darío Vesta",
    artistSlug: "dario-vesta",
    date: "2026-02-13",
    genres: ["techno", "hard groove"],
    durationMin: 95,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0012",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-012",
    },
    description:
      "Techno de pista grande mezclado rápido y con intención. Darío Vesta debuta en la serie principal.",
  },
  {
    slug: "nave-abierta-002",
    title: "Nave Abierta 002 — Inés Delta",
    artistSlug: "ines-delta",
    date: "2026-01-30",
    genres: ["minimal", "deep house"],
    durationMin: 110,
    formats: ["audio"],
    platforms: ["soundcloud"],
    links: {
      soundcloud: "https://soundcloud.com/backstage-records/nave-abierta-002",
    },
    description:
      "Minimal de pulso seco para la franja de después de las cuatro. Solo audio, grabado en una toma.",
  },
  {
    slug: "backstage-sessions-011",
    title: "Backstage Sessions 011 — Lobo Norte",
    artistSlug: "lobo-norte",
    date: "2026-01-16",
    genres: ["electro", "breaks"],
    durationMin: 88,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0011",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-011",
    },
    description:
      "Electro y breaks con acento de extrarradio. La sesión que consolidó la cabina del residente más técnico de la casa.",
    featured: true,
  },
  {
    slug: "nave-abierta-001",
    title: "Nave Abierta 001 — Mar Volta",
    artistSlug: "mar-volta",
    date: "2025-12-19",
    genres: ["house", "deep house"],
    durationMin: 120,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-na001",
      soundcloud: "https://soundcloud.com/backstage-records/nave-abierta-001",
    },
    description:
      "El estreno de Nave Abierta: la cabina del estudio con la persiana levantada y dos horas de house de tarde.",
  },
  {
    slug: "backstage-sessions-010",
    title: "Backstage Sessions 010 — KRESTA",
    artistSlug: "kresta",
    date: "2025-12-05",
    genres: ["hard groove", "techno"],
    durationMin: 75,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0010",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-010",
    },
    description:
      "Hard groove directo y percusivo, sin adornos. Setenta y cinco minutos pensados para club.",
  },
  {
    slug: "backstage-sessions-009",
    title: "Backstage Sessions 009 — Vera Lumen",
    artistSlug: "vera-lumen",
    date: "2025-11-14",
    genres: ["melodic techno"],
    durationMin: 92,
    formats: ["audio", "video"],
    platforms: ["youtube", "soundcloud"],
    links: {
      youtube: "https://youtube.com/watch?v=bsr-0009",
      soundcloud: "https://soundcloud.com/backstage-records/backstage-sessions-009",
    },
    description:
      "La sesión que abrió la temporada del estudio. Melodic techno de cierre de madrugada, publicado en vídeo y audio.",
    featured: true,
  },
];

export function getSession(slug: string): Session | undefined {
  return SESSIONS.find((s) => s.slug === slug);
}

/** Sesiones donde el artista figura como principal, en orden de publicación descendente. */
export function sessionsByArtist(artistSlug: string): Session[] {
  return SESSIONS.filter((s) => s.artistSlug === artistSlug);
}

export function featuredSessions(): Session[] {
  return SESSIONS.filter((s) => s.featured);
}
