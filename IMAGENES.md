# IMAGENES.md — estrategia de imágenes y pack de prompts

Documento operativo para sustituir los pósters SVG generados por fotografías
reales o generadas por IA. Está pensado para usarse tal cual: cada prompt de
las tablas se puede pegar directamente en un generador (Midjourney, Flux,
SDXL, Ideogram...) sin retocar.

---

## 1. Cómo funciona la estrategia

La web se ve completa **sin una sola imagen raster**. Cada tarjeta de artista,
sesión o evento pinta un **póster SVG determinista** generado por
`components/art/poster.tsx`:

- El componente `Poster` recibe `seed` (el slug del dato), `title`, `kind`
  (`"artist" | "session" | "event"`) y opcionalmente `image`.
- **Sin `image`**: genera un SVG industrial cuya composición deriva al 100 %
  de `seededHash(seed)` — mismo slug, mismo arte, en servidor y cliente. Los
  colores son CSS vars (`--accent`, `--fg`, `--bg-2`...), así que el panel
  Tweaks lo repinta en vivo al cambiar de paleta.
- **Con `image`**: renderiza un `<img>` plano con `object-fit: cover` que
  llena la misma caja 4:5 del contenedor. La foto sustituye al SVG sin tocar
  ningún componente.

El interruptor vive en los datos, no en el código. Los tres tipos de
contenido ya declaran el campo opcional:

| Fichero | Campo |
|---|---|
| `content/artists.ts` | `image?: string` (tipo `Artist`) |
| `content/sessions.ts` | `image?: string` (tipo `Session`) |
| `content/events.ts` | `image?: string` (tipo `EventItem`) |

**Regla de oro**: `Poster` no comprueba si el fichero existe. El campo
`image` solo se añade **después** de haber copiado el fichero a `public/img/`.
Un campo `image` apuntando a un fichero inexistente produce una imagen rota
(404), que es exactamente lo que esta estrategia prohíbe. En sentido inverso,
quitar el campo `image` devuelve el póster SVG al instante: es la vía de
rollback si una foto no convence.

Nota sobre el panel Tweaks: las fotos no se repintan al cambiar de paleta
(el SVG sí). Por eso la dirección de arte de la sección 3 fija una gama
cálida-neutra (óxido, hormigón, acero) que asienta bien sobre las cuatro
paletas (teco, acero, club, monolito).

---

## 2. Convención de rutas y especificaciones

Las subcarpetas no existen aún (`public/img/` solo contiene un `.gitkeep`):
créalas al depositar el primer fichero.

| Categoría | Ruta | Formato | Tamaño mínimo | Caja en la UI |
|---|---|---|---|---|
| Artistas | `/img/artistas/<slug>.jpg` | 4:5 vertical | 800 × 1000 px | tarjeta 4:5, `cover` |
| Sesiones | `/img/sesiones/<slug>.jpg` | 4:5 vertical | 800 × 1000 px | tarjeta 4:5, `cover` |
| Eventos | `/img/eventos/<slug>.jpg` | 4:5 vertical | 800 × 1000 px | tarjeta 4:5, `cover` |
| Estudio | `/img/estudio/<nombre>.jpg` | libre (recomendado 16:9) | 1600 px de ancho | reserva para hero/secciones |

Especificaciones comunes:

- **`<slug>` debe coincidir exactamente** con el `slug` del dato en
  `content/*.ts` (kebab-case, sin acentos).
- **Formatos admitidos**: `.jpg` o `.webp`. El campo `image` apunta al
  fichero real con su extensión (`image: "/img/artistas/kresta.webp"` si el
  fichero es webp). Preferencia: webp para web, jpg si el flujo de trabajo lo
  pide.
- **Resolución de exportación recomendada**: 1200 × 1500 px para las cajas
  4:5 (el doble del mínimo cubre pantallas retina sin disparar el peso).
- **Peso objetivo**: ≤ 300 KB por imagen 4:5 (jpg calidad ~80 o webp calidad
  ~75); ≤ 500 KB para las panorámicas de estudio. Los originales sin
  comprimir no se suben al repo: en `public/img/` solo entran derivados
  optimizados.
- **Recorte**: la caja es 4:5 con `object-fit: cover`. Entregar ya en 4:5
  para controlar el encuadre; cualquier otra proporción se recortará por el
  centro.
- El `alt` lo pone el componente a partir del título/nombre del dato; no hay
  que gestionarlo a mano.

---

## 3. Pack de prompts IA

### Dirección de arte común

Identidad **industrial TECO**: nave y contenedores, acero corrugado, hormigón
visto, luz tungsteno naranja-óxido cálida con acentos puntuales de neón de
club, fotografía documental seria. Reglas fijas para todos los prompts:

- **Sin texto, sin logos, sin marcas de agua** dentro de la imagen (la
  tipografía la pone la web).
- **Sin caras reconocibles**: sujetos anónimos, rostros girados, en sombra o
  fuera de encuadre. Nunca generar parecidos con personas reales o famosos.
- **Sin salas ni marcas reales**: los espacios se describen físicamente
  (nave, sótano, taller), nunca por nombre.
- Gama cromática: naranjas óxido + grises acero + negros cálidos. Evitar
  saturación de postal y evitar el cliché EDM (láseres verdes, confeti).
- Registro documental, no publicitario: grano de película 35 mm, luz
  motivada, nada posado.

Cada prompt de las tablas ya es **autónomo y completo** (escena + cola de
estilo común). Parámetros de proporción según generador: Midjourney
`--ar 4:5`, SDXL/Flux `896×1120` o `1024×1280`, estudio en `16:9`.

Prompt negativo recomendado (donde el generador lo admita):
`text, watermark, logo, signage, celebrity, recognizable face, extra fingers, deformed hands, oversaturated, lens flare kitsch, confetti, green lasers`

### 3.1 Artistas — retratos (9 + 1 dúo)

Retrato coherente con la bio y los géneros de cada ficha de
`content/artists.ts`. Contexto en es-ES, prompt en inglés.

| Slug | Ruta destino | Contexto (es) | Prompt (en) |
|---|---|---|---|
| `vera-lumen` | `/img/artistas/vera-lumen.jpg` | Residente, melodic techno y progressive; cierres de madrugada. | Portrait of a female DJ at the end of a long overnight set, eyes closed, head tilted down over the mixer, first pale daylight entering through a warehouse skylight and mixing with fading amber and violet stage light, thin haze, anonymous subject with face half in shadow. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `kresta` | `/img/artistas/kresta.jpg` | Residente, hard groove y techno; defiende el vinilo, criado en polígonos. | Portrait of a male DJ in his thirties pulling a vinyl record from a road case beside two turntables, tense focused posture, harsh single tungsten bulb overhead, raw concrete wall and corrugated shutter behind, anonymous subject with face turned down into shadow. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `mar-volta` | `/img/artistas/mar-volta.jpg` | Residente, house y deep house de tarde; mano izquierda, pasado de barra. | Relaxed portrait of a DJ leaning on the booth during a late-afternoon session, golden sunlight pouring through a half-open roller shutter, record bag on the counter, unhurried posture, anonymous subject seen from a three-quarter back angle. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `lobo-norte` | `/img/artistas/lobo-norte.jpg` | Residente, electro y breaks; ex técnico de sonido, el más técnico de la casa. | Portrait of a male DJ who is also a sound engineer, adjusting a patchbay in a rack full of routed cables beside the decks, methodical technical mood, cool steel shadows cut by a warm orange key light, anonymous subject with face obscured by the rack. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `ines-delta` | `/img/artistas/ines-delta.jpg` | Invitada, minimal y deep house; salas pequeñas, cabinas a ras de pista. | Portrait of a female DJ in a tiny low-ceiling basement booth at floor level, sparse minimal setup, dim room with a single thin neon line on the back wall, restrained precise posture, anonymous subject with face in half shadow. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `dario-vesta` | `/img/artistas/dario-vesta.jpg` | Invitado, techno de pista grande; quince años de cabina. | Low-angle portrait of a veteran male DJ commanding a large club booth, strong silhouette against dense backlit haze, one wide orange beam from behind, decisive gesture over the mixer, anonymous subject with face hidden in contrast. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `rampa-sur` | `/img/artistas/rampa-sur.jpg` | Invitados, dúo de breaks; cuatro platos y caja de ritmos, tiendas de discos. | Portrait of a duo of two DJs working over a cluttered booth with four turntables and a drum machine, both pairs of hands mid-movement, crates of records stacked around, energetic but serious, anonymous subjects with faces turned toward the gear. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `selva-gris` | `/img/artistas/selva-gris.jpg` | Invitada, progressive y melodic techno; sesiones de paciencia larga. | Portrait of a female DJ holding a long patient gesture over the mixer, long-exposure light trails of amber and violet curving behind her, deep haze, sense of stretched time, anonymous subject with face softened in shadow. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `txema-roda` | `/img/artistas/txema-roda.jpg` | Invitado, house; treinta años de cabina, colección de discos histórica. | Portrait of an older male DJ's weathered hands holding a worn vinyl sleeve in front of a floor-to-ceiling wall of records, warm tungsten light like a private archive, dust in the air, heritage and calm, subject's face out of frame. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nora-eje` | `/img/artistas/nora-eje.jpg` | Invitada, electro angular y minimal; circuito de radios online. | Portrait of a young female DJ wearing headphones in a corner booth styled like an online radio studio, broadcast microphone arm in frame, angular hard shadows on corrugated steel, thin neon edge light, anonymous subject with face partly hidden by the microphone. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |

### 3.2 Sesiones — stills de cabina (14)

Un still por sesión de `content/sessions.ts`, con el mood del género y del
formato (las de solo audio no muestran cámaras; las de vídeo pueden
enseñarlas).

| Slug | Ruta destino | Contexto (es) | Prompt (en) |
|---|---|---|---|
| `nave-abierta-004` | `/img/sesiones/nave-abierta-004.jpg` | Breaks y electro; dúo con público, cuatro platos y caja de ritmos. | Wide still of a duo performing on four turntables and a drum machine inside a warehouse studio with the roller shutter open behind them, small standing audience silhouetted in the foreground, breakbeat energy, warm amber wash with haze. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-015` | `/img/sesiones/backstage-sessions-015.jpg` | Electro angular y minimal, grabado a primera toma en vídeo. | Clean still of a solo electro session in a studio booth, angular machine setup with sequencer and mixer, hard geometric shadows on corrugated steel, restrained contrast between cool shadow and warm key light, video camera rig visible at the edge of frame. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `cabina-cruzada-002` | `/img/sesiones/cabina-cruzada-002.jpg` | B2b minimal y electro a cuatro manos, con invitados reducidos. | Close still of four hands from two DJs working a single mixer during a back-to-back session, dim intimate studio light, a handful of blurred guests in the deep background, minimal techno tension, shallow depth of field. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-014` | `/img/sesiones/backstage-sessions-014.jpg` | Melodic techno, cierre de temporada; subida continua. | Atmospheric wide still of a melodic techno session at its emotional peak, lone DJ small in frame, one vertical beam of warm light rising through dense haze inside the warehouse studio, monumental and unhurried. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `archivo-vivo-001` | `/img/sesiones/archivo-vivo-001.jpg` | Deep house de tres horas, solo audio, formato largo. | Intimate audio-only recording still, close-up of a turntable spinning next to an open reel-to-reel tape machine, no cameras, warm dim tungsten light, records leaning against the booth, three-hour deep listening mood. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-013` | `/img/sesiones/backstage-sessions-013.jpg` | House clásico tocado de memoria por un veterano. | Still of a veteran house session played on vinyl only, weathered hands cueing a record on the turntable, warm nostalgic tungsten glow, dust floating in the light, classic mixer with rotary knobs. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nave-abierta-003` | `/img/sesiones/nave-abierta-003.jpg` | Progressive de tarde, más de dos horas sin golpes de efecto. | Still of a long progressive afternoon session, soft natural daylight falling through high industrial windows onto the booth, patient solitary DJ mid-blend, calm wide composition with generous negative space. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `cabina-cruzada-001` | `/img/sesiones/cabina-cruzada-001.jpg` | B2b inaugural: hard groove contra electro, a cuatro manos. | Still of two DJs in a charged back-to-back, one reaching across the other over the mixer, hard groove percussion energy, strobe-frozen haze, harsh contrast between deep shadow and orange light. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-012` | `/img/sesiones/backstage-sessions-012.jpg` | Techno de pista grande, mezclado rápido y con intención. | Dynamic still of a big-room techno session, motion blur on fast-mixing hands across multiple players, dense haze cut by a single powerful orange beam, dark monumental booth. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nave-abierta-002` | `/img/sesiones/nave-abierta-002.jpg` | Minimal de pulso seco, solo audio, grabado en una toma. | Sparse still of a one-take minimal session recorded audio-only, near-empty booth with one player and a mixer, large dim negative space, a single work lamp as the only light source. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-011` | `/img/sesiones/backstage-sessions-011.jpg` | Electro y breaks del residente más técnico; cableado denso, vídeo. | Still of a technically dense electro and breaks session, booth crowded with drum machine, decks and neatly routed cables, two video cameras on tripods framing the artist, precise cool light with a warm accent. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nave-abierta-001` | `/img/sesiones/nave-abierta-001.jpg` | Estreno de la serie: persiana levantada, house de tarde. | Still of the first open-booth house session, roller shutter half raised with late daylight flooding the warehouse floor, welcoming warm tones, relaxed DJ behind the studio booth, sense of a beginning. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-010` | `/img/sesiones/backstage-sessions-010.jpg` | Hard groove directo y percusivo, pensado para club. | Tight still on hands slamming a fader during a hard groove session, drum-tight tension, harsh single-source light, dark background of corrugated steel, club-ready aggression without chaos. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `backstage-sessions-009` | `/img/sesiones/backstage-sessions-009.jpg` | Melodic techno de cierre de madrugada; apertura de temporada. | Wide still of a season-opening melodic techno session, cold blue pre-dawn tones bleeding into warm orange stage light, lone DJ under a slow halo of haze, emotional and restrained. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |

### 3.3 Eventos — ambiente de sala o juntada (12)

Una imagen de ambiente por evento de `content/events.ts`, según su `type`
(sesión con público, juntada, b2b, showcase). Para los eventos futuros la
imagen es de ambiente o de preparación, nunca un falso "ya celebrado".

| Slug | Ruta destino | Contexto (es) | Prompt (en) |
|---|---|---|---|
| `juntada-escucha-febrero-2026` | `/img/eventos/juntada-escucha-febrero-2026.jpg` | Juntada de escucha de invierno en sala pequeña, cabina abierta al cierre. | Documentary shot of a winter listening session in a small workshop-like venue, people in coats seated on benches and crates around a pair of large speakers, warm low light, attentive figures with faces in shadow, communal and quiet. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `cabina-cruzada-002-directo` | `/img/eventos/cabina-cruzada-002-directo.jpg` | Grabación b2b en directo con aforo reducido en el estudio. | Documentary shot of a live back-to-back recording inside a warehouse studio with a reduced invited audience standing close to the booth, a camera operator silhouetted at the edge of frame, intimate amber light. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nave-abierta-004-con-publico` | `/img/eventos/nave-abierta-004-con-publico.jpg` | Primera sesión grabada con público en la nave. | Documentary crowd shot from behind the audience inside a warehouse studio, duo performing on turntables and a drum machine under warm light, open roller shutter glowing at the back, first public session energy. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `juntada-escucha-junio-2026` | `/img/eventos/juntada-escucha-junio-2026.jpg` | Escucha del máster con la artista presente; aforo del estudio completo. | Documentary shot of a summer evening listening gathering inside a studio nave, small crowd seated on the floor and on flight cases around studio monitors, warm dim light, people listening with eyes closed, communal respect. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `grabacion-selva-gris-junio-2026` | `/img/eventos/grabacion-selva-gris-junio-2026.jpg` | Grabación de la serie principal vista desde la pecera. | Shot through the control-room glass toward a lit recording booth where a session is being captured, reflections of observers on the glass, mixing console bokeh in the foreground, focused studio atmosphere. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `cabina-cruzada-003-julio-2026` | `/img/eventos/cabina-cruzada-003-julio-2026.jpg` | B2b de noche de verano en la nave, invitados contados. | Documentary shot of two DJs sharing one booth during a summer-night back-to-back inside a warehouse studio, four hands near the mixer, sparse invited guests, warm air and light haze, sense of anticipation. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `showcase-backstage-001` | `/img/eventos/showcase-backstage-001.jpg` | Primera salida del sello a una sala: noche de club completa. | Documentary shot of a packed club night taken from the dance floor, dense crowd facing an elevated booth, strobes frozen mid-flash, orange and violet neon over concrete walls, label showcase energy, faces blurred by motion. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `grabacion-rita-umbral-julio-2026` | `/img/eventos/grabacion-rita-umbral-julio-2026.jpg` | Primera grabación en vídeo de una invitada; estudio en preparación. | Shot of a studio being prepared for a first video session, camera rigs and light stands half set around an empty waiting booth, open flight cases on the floor, technician silhouettes, calm before recording. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `juntada-b2b-abierta-agosto-2026` | `/img/eventos/juntada-b2b-abierta-agosto-2026.jpg` | Cabina abierta por turnos; vale traer discos o USB. | Documentary shot of an open-decks afternoon gathering, people queueing with record bags and USB sticks beside the booth, relaxed summer light through the open shutter, someone mid-turn at the decks, friendly and unposed. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `grabacion-lobo-norte-agosto-2026` | `/img/eventos/grabacion-lobo-norte-agosto-2026.jpg` | Grabación de electro y breaks del residente técnico. | Documentary shot of an electro session being recorded in a warehouse studio, resident DJ between drum machine and decks, video cameras and cable runs visible, methodical late-summer working atmosphere. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `cabina-cruzada-004-septiembre-2026` | `/img/eventos/cabina-cruzada-004-septiembre-2026.jpg` | B2b de hard groove en un sótano de techo bajo, fuera del estudio. | Documentary shot of a low-ceiling basement club during a hard groove back-to-back, two DJs at a booth level with the floor, dense crowd pressed close, single red-orange wash, raw and physical. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |
| `nave-abierta-005-septiembre-2026` | `/img/eventos/nave-abierta-005-septiembre-2026.jpg` | House de tarde para cerrar el ciclo de cabina abierta. | Documentary shot of a warm September afternoon house session in the studio nave, soft golden light across the floor, small relaxed audience, DJ closing the season with an easy gesture, quiet celebration. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, vertical 4:5. |

### 3.4 Estudio — material de reserva (4)

Sin caja fija en la UI actual: material para hero, manifiesto, contacto o
futuras secciones. Formato libre, recomendado 16:9 horizontal. Ningún
componente las referencia hoy, así que depositarlas no puede romper nada.

| Nombre | Ruta destino | Contexto (es) | Prompt (en) |
|---|---|---|---|
| `cabina` | `/img/estudio/cabina.jpg` | Plano principal de la cabina del estudio, vacía y lista. | Hero shot of an empty professional DJ booth in a warehouse studio, mixer and turntables ready, warm orange key light and a thin neon accent on corrugated steel, cables routed cleanly, monumental quiet. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, wide horizontal 16:9. |
| `nave` | `/img/estudio/nave.jpg` | Plano general de la nave: paredes corrugadas, rig de luz y cámaras. | Wide shot of a full warehouse studio space, corrugated steel walls and raw concrete floor, lighting rig and camera tripods at rest, booth in the distance, atmospheric haze in warm tungsten light. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, wide horizontal 16:9. |
| `control` | `/img/estudio/control.jpg` | La pecera: mesa, monitores y cristal hacia la cabina. | Shot of a studio control room with a large mixing console and monitor speakers, window onto the recording booth, glowing screens angled away from camera, warm focused work light. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, wide horizontal 16:9. |
| `exterior` | `/img/estudio/exterior.jpg` | Exterior de la nave en un polígono de Madrid, al anochecer. | Dusk exterior of an industrial unit in a Madrid business park, corrugated roller shutter half open spilling warm orange light onto wet asphalt, sodium street lamps, parked van, quiet anticipation. Industrial warehouse aesthetic, corrugated steel and raw concrete, warm rust-orange tungsten light, serious documentary photography, 35mm film grain, no text, no logos, no watermarks, wide horizontal 16:9. |

---

## 4. Checklist de integración

Para cada imagen, en este orden:

1. **Generar o seleccionar** la imagen con el prompt de la tabla. Revisar:
   sin texto incrustado, sin caras reconocibles, manos correctas, gama
   cálida-neutra.
2. **Recortar a 4:5 y optimizar**: exportar a 1200 × 1500 px, jpg calidad ~80
   o webp ~75, peso ≤ 300 KB.
3. **Copiar a `public/img/<categoria>/<slug>.jpg`** creando la subcarpeta si
   no existe. El nombre de fichero debe coincidir con el slug del dato.
4. **Añadir el campo `image`** en la entrada correspondiente — siempre
   después de copiar el fichero, nunca antes:
   - Artistas → `content/artists.ts`, dentro del objeto del artista:
     ```ts
     { slug: "vera-lumen", ..., image: "/img/artistas/vera-lumen.jpg" }
     ```
   - Sesiones → `content/sessions.ts`:
     ```ts
     { slug: "backstage-sessions-014", ..., image: "/img/sesiones/backstage-sessions-014.jpg" }
     ```
   - Eventos → `content/events.ts`:
     ```ts
     { slug: "showcase-backstage-001", ..., image: "/img/eventos/showcase-backstage-001.jpg" }
     ```
   Los tres tipos ya declaran `image?: string`; no hay que tocar tipos ni
   componentes. Las secciones propagan el campo a `Poster` automáticamente.
5. **Validar en local**: `npm run dev`, navegar a la página afectada
   (`/artistas`, `/sesiones`, `/eventos`, portada) y comprobar que la foto
   carga, que el recorte 4:5 funciona y que no aparece ningún 404 en la
   pestaña Network.
6. **Probar las cuatro paletas** desde el panel Tweaks (teco, acero, club,
   monolito): la foto debe asentar bien sobre todas. Si desentona, ajustar
   el etalonaje hacia la gama óxido-acero o descartar.
7. **Rollback**: si una imagen no convence, eliminar el campo `image` de la
   entrada (y opcionalmente el fichero) devuelve el póster SVG determinista.

Notas:

- No subir originales pesados al repo; en `public/img/` solo derivados
  optimizados.
- Las imágenes de `/img/estudio/` no tienen campo en `content/*.ts`: se
  referencian a mano donde se necesiten cuando exista la sección que las
  consuma.
- Si llegan fotos reales del estudio o de los DJs (ver CLAUDE.md → Bloqueos),
  sustituyen a las generadas siguiendo exactamente esta misma convención.
