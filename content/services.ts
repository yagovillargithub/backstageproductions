/* ─────────────────────────────────────────────────────────────
 * Servicios del estudio. Sin precio en ningún campo (regla de
 * marca): el alcance se expresa en formato, duración y entregables.
 * ───────────────────────────────────────────────────────────── */

export type Service = {
  slug: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  meta: {
    format: string;
    duration: string;
    deliverables: string;
  };
};

export const SERVICES: Service[] = [
  {
    slug: "grabacion-audio",
    num: "01",
    title: "Grabación de sesión en audio",
    description:
      "Tu set, grabado en multipista directamente de la mesa, en una cabina pensada para mezclar a gusto. Sales del estudio con la sesión registrada tal y como la tocaste, lista para entrar en postproducción.",
    tags: ["multipista", "cabina insonorizada", "take íntegro"],
    meta: {
      format: "Sesión en estudio",
      duration: "Medio día",
      deliverables: "Máster WAV + versión para SoundCloud",
    },
  },
  {
    slug: "grabacion-audio-video",
    num: "02",
    title: "Grabación audio y vídeo multicámara",
    description:
      "La sesión completa en imagen y sonido: tres cámaras, luz de club y audio multipista sincronizado. El formato con el que trabajan los canales de sesiones que importan.",
    tags: ["3 cámaras", "4K", "luz de escena", "audio sincronizado"],
    meta: {
      format: "Sesión en estudio",
      duration: "Un día",
      deliverables: "Máster de audio + bruto de vídeo sincronizado",
    },
  },
  {
    slug: "edicion-video",
    num: "03",
    title: "Edición y postproducción de vídeo",
    description:
      "Montamos el material al ritmo del set, corregimos el color y aplicamos la gráfica del sello. De cada sesión salen la pieza principal y los cortes pensados para redes.",
    tags: ["montaje a ritmo", "etalonaje", "gráfica del sello", "clips verticales"],
    meta: {
      format: "Postproducción",
      duration: "1-2 semanas",
      deliverables: "Pieza principal + clips verticales",
    },
  },
  {
    slug: "mezcla-master",
    num: "04",
    title: "Mezcla y máster del set",
    description:
      "Limpiamos la grabación, equilibramos niveles y ajustamos el loudness para que el set suene bien en cualquier plataforma y en cualquier equipo. Respetamos la mezcla del artista: corregimos, no maquillamos.",
    tags: ["limpieza", "niveles", "loudness para plataforma"],
    meta: {
      format: "Postproducción",
      duration: "3-5 días",
      deliverables: "Máster WAV + versiones por plataforma",
    },
  },
  {
    slug: "promocion",
    num: "05",
    title: "Promoción y publicación",
    description:
      "Preparamos el lanzamiento de la sesión: artwork, metadatos, descripción y calendario de publicación en YouTube y SoundCloud. Acompañamos la salida con piezas para redes y difusión en la comunidad del sello.",
    tags: ["YouTube", "SoundCloud", "artwork", "plan de lanzamiento"],
    meta: {
      format: "Campaña por sesión",
      duration: "2-4 semanas",
      deliverables: "Publicación + piezas de difusión",
    },
  },
  {
    slug: "red",
    num: "06",
    title: "Conexión y red",
    description:
      "El sello como nexo: movemos tu sesión entre las salas, productoras y colectivos con los que trabajamos. Buscamos bolos, residencias y b2b que encajen con tu sonido, no con cualquier cartel.",
    tags: ["bolos", "residencias", "b2b", "salas y productoras"],
    meta: {
      format: "Acompañamiento",
      duration: "Continuo",
      deliverables: "Presentación a salas y colectivos",
    },
  },
];
