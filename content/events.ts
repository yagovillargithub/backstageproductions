export type EventItem = {
  slug: string;
  title: string;
  /** ISO con hora y offset de Madrid. Para shortDate() de lib/utils usar eventDay(). */
  date: string;
  type: "sesion" | "juntada" | "showcase" | "b2b";
  /** Salas y espacios inventados. "Nave Backstage" es el propio estudio. */
  venue: string;
  city: "Madrid";
  /**
   * Mezcla slugs de content/artists.ts y nombres externos: cada entrada se
   * resuelve contra ARTISTS cuando el slug existe; si no, se pinta tal cual.
   */
  lineup: string[];
  status: "proximamente" | "abierto" | "completo" | "celebrado";
  description: string;
  image?: string;
};

/** Agenda de ejemplo en orden cronológico ascendente (pasados incluidos como archivo). */
export const EVENTS: EventItem[] = [
  {
    slug: "juntada-escucha-febrero-2026",
    title: "Juntada de escucha: archivo de invierno",
    date: "2026-02-20T19:30:00+01:00",
    type: "juntada",
    venue: "La Tornería",
    city: "Madrid",
    lineup: ["mar-volta", "txema-roda", "Colectivo Persiana"],
    status: "celebrado",
    description:
      "Escucha en sala de las primeras referencias del archivo, con cabina abierta al cierre. La primera juntada fuera del estudio.",
  },
  {
    slug: "cabina-cruzada-002-directo",
    title: "Cabina Cruzada 002: Inés Delta b2b Nora Eje",
    date: "2026-05-08T20:00:00+02:00",
    type: "b2b",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["ines-delta", "nora-eje"],
    status: "celebrado",
    description:
      "Grabación en directo con aforo reducido de invitados. La sesión ya está publicada en YouTube y SoundCloud.",
  },
  {
    slug: "nave-abierta-004-con-publico",
    title: "Nave Abierta 004: Rampa Sur",
    date: "2026-06-05T20:00:00+02:00",
    type: "sesion",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["rampa-sur"],
    status: "celebrado",
    description:
      "Primera Nave Abierta grabada con público. Rampa Sur alternó platos y caja de ritmos durante casi dos horas.",
  },
  {
    slug: "juntada-escucha-junio-2026",
    title: "Juntada de escucha: Backstage Sessions 015",
    date: "2026-06-18T19:30:00+02:00",
    type: "juntada",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["nora-eje", "lobo-norte"],
    status: "completo",
    description:
      "Escucha del máster con Nora Eje presente, seguida de cabina abierta. Aforo del estudio completo.",
  },
  {
    slug: "grabacion-selva-gris-junio-2026",
    title: "Backstage Sessions 016: Selva Gris",
    date: "2026-06-26T20:00:00+02:00",
    type: "sesion",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["selva-gris"],
    status: "abierto",
    description:
      "Grabación de la próxima entrega de la serie principal, con aforo reducido para asistir desde la pecera.",
  },
  {
    slug: "cabina-cruzada-003-julio-2026",
    title: "Cabina Cruzada 003: Inés Delta b2b Ada Cantera",
    date: "2026-07-03T20:00:00+02:00",
    type: "b2b",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["ines-delta", "Ada Cantera"],
    status: "abierto",
    description:
      "Tercera entrega de la serie b2b: Inés Delta recibe a Ada Cantera, habitual del circuito de radios online.",
  },
  {
    slug: "showcase-backstage-001",
    title: "Backstage Records Showcase 001",
    date: "2026-07-17T23:00:00+02:00",
    type: "showcase",
    venue: "Sala Cota Cero",
    city: "Madrid",
    lineup: ["vera-lumen", "kresta", "mar-volta", "Otto Falla"],
    status: "abierto",
    description:
      "Primera salida del sello a una sala: tres residentes y un invitado de Vértice Discos. Se grabará para el archivo.",
  },
  {
    slug: "grabacion-rita-umbral-julio-2026",
    title: "Rita Umbral en el estudio",
    date: "2026-07-24T19:00:00+02:00",
    type: "sesion",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["Rita Umbral"],
    status: "proximamente",
    description:
      "Rita Umbral viene a grabar su primera sesión en vídeo. Fecha de publicación por confirmar.",
  },
  {
    slug: "juntada-b2b-abierta-agosto-2026",
    title: "Juntada b2b abierta",
    date: "2026-08-07T18:00:00+02:00",
    type: "juntada",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["txema-roda"],
    status: "abierto",
    description:
      "Cabina abierta por turnos de veinte minutos, modera Txema Roda. Vale traer discos o USB.",
  },
  {
    slug: "grabacion-lobo-norte-agosto-2026",
    title: "Backstage Sessions 017: Lobo Norte",
    date: "2026-08-21T20:00:00+02:00",
    type: "sesion",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["lobo-norte"],
    status: "proximamente",
    description:
      "El residente más técnico de la casa vuelve a la serie principal con material nuevo de electro y breaks.",
  },
  {
    slug: "cabina-cruzada-004-septiembre-2026",
    title: "Cabina Cruzada 004: KRESTA b2b Roque Salina",
    date: "2026-09-11T22:00:00+02:00",
    type: "b2b",
    venue: "Sótano Vertical",
    city: "Madrid",
    lineup: ["kresta", "Roque Salina"],
    status: "proximamente",
    description:
      "La serie b2b sale del estudio por primera vez, en colaboración con la sala. Hard groove a cuatro manos.",
  },
  {
    slug: "nave-abierta-005-septiembre-2026",
    title: "Nave Abierta 005: Mar Volta",
    date: "2026-09-25T20:00:00+02:00",
    type: "sesion",
    venue: "Nave Backstage",
    city: "Madrid",
    lineup: ["mar-volta"],
    status: "proximamente",
    description:
      "Mar Volta cierra el ciclo de cabina abierta de la temporada con una sesión de house de tarde.",
  },
];

/** Parte YYYY-MM-DD del evento, compatible con shortDate() de lib/utils. */
export function eventDay(event: EventItem): string {
  return event.date.slice(0, 10);
}

export function getEvent(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

/** Eventos a partir de `now`, ordenados del más próximo al más lejano. */
export function upcomingEvents(now: Date = new Date()): EventItem[] {
  return EVENTS.filter((e) => new Date(e.date).getTime() >= now.getTime()).sort(
    (a, b) => a.date.localeCompare(b.date),
  );
}

/** Eventos ya celebrados, del más reciente al más antiguo (archivo). */
export function pastEvents(now: Date = new Date()): EventItem[] {
  return EVENTS.filter((e) => new Date(e.date).getTime() < now.getTime()).sort(
    (a, b) => b.date.localeCompare(a.date),
  );
}
