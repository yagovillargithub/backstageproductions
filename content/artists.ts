export type Artist = {
  slug: string;
  /** Nombre artístico — es lo que pinta la UI. */
  name: string;
  /** Nombre civil, cuando el artista lo hace público en su ficha. */
  alias?: string;
  role: "residente" | "invitado";
  genres: string[];
  bio: string;
  links?: { soundcloud?: string; instagram?: string; youtube?: string };
  /** Slugs de content/sessions.ts donde figura como artista principal. */
  sessions: string[];
  /** Ángulo "nexo de unión": sellos, salas y colectivos con los que trabaja. Todos inventados. */
  connections?: { labels?: string[]; venues?: string[]; collabs?: string[] };
  image?: string;
};

/**
 * Roster de ejemplo de la preview. Personas, sellos y salas inventadas;
 * solo los géneros son reales. Residentes primero, invitados después.
 */
export const ARTISTS: Artist[] = [
  {
    slug: "vera-lumen",
    name: "Vera Lumen",
    role: "residente",
    genres: ["melodic techno", "progressive"],
    bio: "Residente del estudio desde la primera tanda de grabaciones. Construye sets largos de melodic techno que crecen sin prisa, con debilidad por los cierres de madrugada. Antes de Backstage pasó tres años pinchando sesiones de día en naves del sur de Madrid.",
    links: {
      soundcloud: "https://soundcloud.com/vera-lumen",
      instagram: "https://instagram.com/veralumen.dj",
      youtube: "https://youtube.com/@veralumen",
    },
    sessions: ["backstage-sessions-014", "backstage-sessions-009"],
    connections: {
      labels: ["Backstage Records", "Vértice Discos"],
      venues: ["Sala Cota Cero"],
      collabs: ["Selva Gris"],
    },
  },
  {
    slug: "kresta",
    name: "KRESTA",
    alias: "Adrián Crespo",
    role: "residente",
    genres: ["hard groove", "techno"],
    bio: "Hard groove directo, percusivo, sin adornos. Empezó montando fiestas con Colectivo Persiana en polígonos de Vallecas y hoy es una de las cabinas más fiables del estudio. Defiende el vinilo cuando el set lo pide.",
    links: {
      soundcloud: "https://soundcloud.com/kresta-dj",
      instagram: "https://instagram.com/kresta.dj",
    },
    sessions: ["cabina-cruzada-001", "backstage-sessions-010"],
    connections: {
      labels: ["Norte Cero"],
      venues: ["Club Turbina", "Sótano Vertical"],
      collabs: ["Lobo Norte", "Colectivo Persiana"],
    },
  },
  {
    slug: "mar-volta",
    name: "Mar Volta",
    role: "residente",
    genres: ["house", "deep house"],
    bio: "House de selección lenta y mano izquierda, aprendido detrás de la barra antes que detrás de los platos. Sus sesiones de tarde en La Tornería le dieron nombre en la escena del centro. Oído de confianza del sello para las referencias de club.",
    links: {
      soundcloud: "https://soundcloud.com/mar-volta",
      instagram: "https://instagram.com/marvolta.music",
    },
    sessions: ["archivo-vivo-001", "nave-abierta-001"],
    connections: {
      labels: ["Cadencia Limitada"],
      venues: ["La Tornería"],
      collabs: ["Txema Roda"],
    },
  },
  {
    slug: "lobo-norte",
    name: "Lobo Norte",
    alias: "Marcos Leal",
    role: "residente",
    genres: ["electro", "breaks"],
    bio: "Electro y breaks con acento de extrarradio. Llegó al estudio como técnico de sonido y acabó quedándose la cabina. Programa además Cabina Cruzada, la serie de b2b de la casa.",
    links: {
      soundcloud: "https://soundcloud.com/lobonorte",
      instagram: "https://instagram.com/lobonorte.dj",
      youtube: "https://youtube.com/@lobonorte",
    },
    sessions: ["backstage-sessions-011"],
    connections: {
      labels: ["Backstage Records"],
      venues: ["Recinto Almagra"],
      collabs: ["KRESTA"],
    },
  },
  {
    slug: "ines-delta",
    name: "Inés Delta",
    role: "invitado",
    genres: ["minimal", "deep house"],
    bio: "Minimal de pulso seco y deep house de después de las cuatro. Pincha poco y elige bien: salas pequeñas, cabinas a ras de pista. Madrid la conoce por sus sesiones de domingo en Sótano Vertical.",
    links: {
      soundcloud: "https://soundcloud.com/ines-delta",
      instagram: "https://instagram.com/inesdelta.dj",
    },
    sessions: ["cabina-cruzada-002", "nave-abierta-002"],
    connections: {
      labels: ["Pleno Sur"],
      venues: ["Sótano Vertical"],
      collabs: ["Nora Eje"],
    },
  },
  {
    slug: "dario-vesta",
    name: "Darío Vesta",
    role: "invitado",
    genres: ["techno", "hard groove"],
    bio: "Techno de pista grande, mezclado rápido y con intención. Lleva quince años entre cabinas de Madrid y aún prepara cada set como si fuera el primero. Debutó en la serie principal del estudio en febrero.",
    links: {
      soundcloud: "https://soundcloud.com/dariovesta",
      instagram: "https://instagram.com/dariovesta",
    },
    sessions: ["backstage-sessions-012"],
    connections: {
      labels: ["Norte Cero"],
      venues: ["Club Turbina", "Recinto Almagra"],
    },
  },
  {
    slug: "rampa-sur",
    name: "Rampa Sur",
    role: "invitado",
    genres: ["breaks", "electro"],
    bio: "Dúo de breaks criado entre tiendas de discos del Rastro. Sus directos alternan cuatro platos y caja de ritmos, más cerca del directo que del DJ set. Grabaron con público la Nave Abierta 004, la primera del estudio en abrir puertas.",
    links: {
      soundcloud: "https://soundcloud.com/rampa-sur",
      instagram: "https://instagram.com/rampasur.duo",
    },
    sessions: ["nave-abierta-004"],
    connections: {
      venues: ["La Tornería"],
      collabs: ["Colectivo Persiana"],
    },
  },
  {
    slug: "selva-gris",
    name: "Selva Gris",
    role: "invitado",
    genres: ["progressive", "melodic techno"],
    bio: "Progressive de paciencia larga, heredera de las sesiones de ocho horas que ya casi nadie programa. Publica en Vértice Discos y comparte cabina habitual con Vera Lumen.",
    links: {
      soundcloud: "https://soundcloud.com/selvagris",
      instagram: "https://instagram.com/selvagris.music",
    },
    sessions: ["nave-abierta-003"],
    connections: {
      labels: ["Vértice Discos"],
      collabs: ["Vera Lumen"],
    },
  },
  {
    slug: "txema-roda",
    name: "Txema Roda",
    alias: "José María Rodal",
    role: "invitado",
    genres: ["house"],
    bio: "Treinta años de cabina y una colección de discos que es patrimonio de la ciudad. Modera las juntadas b2b del estudio y ejerce de puente con la vieja guardia del house madrileño.",
    links: {
      soundcloud: "https://soundcloud.com/txemaroda",
    },
    sessions: ["backstage-sessions-013"],
    connections: {
      venues: ["La Tornería", "Sala Cota Cero"],
      collabs: ["Madrugada MAD", "Mar Volta"],
    },
  },
  {
    slug: "nora-eje",
    name: "Nora Eje",
    alias: "Nora Estévez",
    role: "invitado",
    genres: ["electro", "minimal"],
    bio: "Electro angular y minimal de club pequeño. Viene del circuito de radios online y colectivos autogestionados, donde aprendió a programar tanto como a pinchar. Su Backstage Session 015 fue su primera grabación en vídeo.",
    links: {
      soundcloud: "https://soundcloud.com/nora-eje",
      instagram: "https://instagram.com/noraeje",
    },
    sessions: ["backstage-sessions-015"],
    connections: {
      labels: ["Pleno Sur"],
      collabs: ["Inés Delta", "Colectivo Persiana"],
    },
  },
];

export function getArtist(slug: string): Artist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}
