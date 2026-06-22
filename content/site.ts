import { WA_NUMBER } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 * Marca y datos globales. Todo lo que aquí es placeholder está
 * marcado: al llegar los datos reales se sustituye en este
 * fichero, nunca en componentes.
 * ───────────────────────────────────────────────────────────── */

export type SiteInfo = {
  name: string;
  studioName: string;
  tagline: string;
  description: string;
  email: string;
  city: string;
  address: string;
  social: {
    instagram: string;
    soundcloud: string;
    youtube: string;
  };
  whatsapp: string;
};

export const SITE: SiteInfo = {
  name: "Backstage Records",
  studioName: "Backstage Productions",
  tagline: "Sesiones de música electrónica grabadas, editadas y en circulación.",
  description:
    "Estudio de grabación y sello en Madrid. Grabamos sesiones de música electrónica en audio y vídeo, las editamos y las promocionamos en YouTube y SoundCloud, conectando artistas, salas y productoras.",
  email: "hola@backstagerecords.es",
  city: "Madrid",
  // Placeholder — dirección real pendiente del operador (ver CLAUDE.md → Bloqueos).
  address: "Nave 7 · Polígono Julián Camarillo, Madrid",
  social: {
    instagram: "@backstagerecords.es",
    soundcloud: "backstage-records-madrid",
    youtube: "@BackstageRecordsMadrid",
  },
  whatsapp: WA_NUMBER,
};

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/artistas", label: "Artistas" },
  { href: "/sesiones", label: "Sesiones" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contacto", label: "Contacto" },
];

/* ─────────────────────────────────────────────────────────────
 * Hero — el título se renderiza {pre}<em>{em}</em>{post}.
 * Los claims alimentan el marquee: verbos de actividad y géneros.
 * ───────────────────────────────────────────────────────────── */

export type Hero = {
  eyebrow: string;
  title: { pre: string; em: string; post: string };
  sub: string;
  claims: string[];
};

export const HERO: Hero = {
  eyebrow: "Estudio · Sello · Madrid",
  title: { pre: "De la cabina ", em: "a la escena", post: "." },
  sub: "Backstage graba tu sesión en audio y vídeo, la edita con criterio de sello y la pone a circular en YouTube, SoundCloud y la red de salas, productoras y colectivos que trabajan con nosotros.",
  claims: [
    "Grabar",
    "Techno",
    "Editar",
    "House",
    "Mezclar",
    "Melodic techno",
    "Masterizar",
    "Hard groove",
    "Promocionar",
    "Breaks",
    "Publicar",
    "Progressive",
  ],
};

/* ─────────────────────────────────────────────────────────────
 * Manifiesto — el claim "nexo de unión" de los fundadores.
 * ───────────────────────────────────────────────────────────── */

export type ManifestoBlock = { title: string; body: string };

export type Manifesto = {
  eyebrow: string;
  lead: string;
  blocks: ManifestoBlock[];
};

export const MANIFESTO: Manifesto = {
  eyebrow: "Nexo de unión",
  lead: "Una sesión bien grabada vale más que cualquier promesa. Backstage existe para que el trabajo de cabina no se quede en la sala: lo grabamos, lo editamos y lo ponemos delante de la gente que programa, publica y contrata. Somos el punto donde se cruzan artistas, productoras, salas y sellos.",
  blocks: [
    {
      title: "Estudio",
      body: "Backstage Productions es la parte que graba: cabina preparada, audio multipista y vídeo multicámara para que el set quede registrado tal y como sonó.",
    },
    {
      title: "Sello",
      body: "Backstage Records firma el catálogo: cada sesión sale con identidad propia, editada con criterio y publicada en YouTube y SoundCloud.",
    },
    {
      title: "Red",
      body: "Conocemos a quien programa y a quien contrata. Movemos cada sesión entre salas, productoras y colectivos para abrir bolos, residencias y b2b.",
    },
    {
      title: "Comunidad",
      body: "Las juntadas son la otra mitad: listenings, cabinas abiertas y sesiones compartidas donde la escena se conoce en persona.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
 * Proceso — vienes → grabamos → editamos → promocionamos.
 * Los specs son las líneas mono de cada paso.
 * ───────────────────────────────────────────────────────────── */

export type ProcessStep = {
  id: string;
  num: string;
  title: string;
  description: string;
  specs: Array<{ k: string; v: string }>;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "vienes",
    num: "01",
    title: "Vienes",
    description:
      "Hablamos antes de que pises la cabina: formato, duración del set y enfoque de la sesión. Llegas, conectas tu equipo o usas el del estudio, y probamos hasta que todo suena como debe.",
    specs: [
      { k: "cabina", v: "insonorizada · monitorización" },
      { k: "setup", v: "tu equipo o el del estudio" },
      { k: "brief", v: "formato y plazo cerrados" },
    ],
  },
  {
    id: "grabamos",
    num: "02",
    title: "Grabamos",
    description:
      "Capturamos el set entero en una pasada, con margen para repetir si hace falta. Audio multipista directo de mesa y vídeo multicámara con luz de club.",
    specs: [
      { k: "audio", v: "multipista · 48 kHz" },
      { k: "vídeo", v: "3 cámaras · 4K" },
      { k: "luz", v: "escena de club" },
    ],
  },
  {
    id: "editamos",
    num: "03",
    title: "Editamos",
    description:
      "Montamos el vídeo al ritmo del set y corregimos el color para que la sesión tenga la estética del sello. El audio pasa por mezcla y máster pensados para plataforma.",
    specs: [
      { k: "montaje", v: "corte a ritmo" },
      { k: "color", v: "etalonaje por sesión" },
      { k: "máster", v: "loudness apto para plataforma" },
    ],
  },
  {
    id: "promocionamos",
    num: "04",
    title: "Promocionamos",
    description:
      "Publicamos la sesión en YouTube y SoundCloud con su artwork, metadatos y plan de difusión. Después la movemos por la red: salas, productoras y colectivos que buscan cartel.",
    specs: [
      { k: "publicación", v: "YouTube · SoundCloud" },
      { k: "piezas", v: "clips verticales · artwork" },
      { k: "difusión", v: "red de salas y colectivos" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
 * Stats — métricas de actividad, nunca dinero. Datos de ejemplo
 * creíbles para un estudio joven; sustituir al llegar los reales.
 * ───────────────────────────────────────────────────────────── */

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "47", label: "sesiones grabadas" },
  { value: "38", label: "artistas por el estudio" },
  { value: "12", label: "salas y colectivos conectados" },
  { value: "620", label: "horas de estudio" },
];
