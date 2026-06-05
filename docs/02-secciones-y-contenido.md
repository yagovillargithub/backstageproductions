# Secciones de la web y modelo de contenido

> Las 5 secciones públicas y el modelo de datos tipado (`content/*.ts`) que las alimenta.
> Última actualización: 2026-06-04.

---

## Resumen

La web tiene 5 rutas. Todo el contenido vive tipado en `content/*.ts` (nada hardcodeado en componentes). Los datos de esta entrega son **de ejemplo** (artistas, sesiones y eventos ficticios pero creíbles, escena Madrid). Las imágenes usan **póster SVG determinista** por defecto (ver [`IMAGENES.md`](../IMAGENES.md)).

## Estado actual

### Rutas

| Ruta | Sección | Qué contiene |
|---|---|---|
| `/` | **Home** | Hero (estudio/sello + estado "grabando"), manifiesto "nexo de unión", proceso (vienes → grabamos → editamos → promocionamos), stats sin dinero, artistas destacados, sesiones recientes, próximos eventos (teaser), CTA final |
| `/artistas` | **Artistas** | Roster (residentes + invitados), ficha por artista, ángulo "red/nexo": colaboraciones, sellos y salas conectadas |
| `/sesiones` | **Sesiones (previews)** | Catálogo de sets grabados (audio+vídeo) con UI de player, waveform, badges de plataforma (YouTube/SoundCloud), filtro por género/artista |
| `/eventos` | **Eventos** | Agenda/calendario, line-ups, "viene DJ X", juntadas/comunidad, residencias; filtro por mes/tipo |
| `/contacto` | **Contacto** | Form (tipo de sesión, formato, plazo — **sin presupuesto**), info del estudio, WhatsApp, redes |

### Modelo de contenido (`content/*.ts`)

- **`site.ts`** — marca, navegación, datos de contacto, redes, textos globales (manifiesto, proceso, stats).
- **`services.ts`** — los servicios del estudio (grabación audio/vídeo, edición, mezcla/máster, promoción/social, distribución a plataformas de sets) con `formato`/`duración` en vez de precio.
- **`artists.ts`** — `Artist { slug, name, alias, role: "residente"|"invitado", genres, bio, links, sessions[], image? }`.
- **`sessions.ts`** — `Session { slug, title, artistSlug, date, genres, durationMin, formats: ("audio"|"video")[], platforms, links, image? }`.
- **`events.ts`** — `Event { slug, title, date, type: "sesion"|"juntada"|"showcase"|"b2b", venue, city, lineup[], status, image? }`.

> El **contrato de clases CSS** que consumen los componentes de sección está documentado en [`03-identidad-visual-tweaks.md`](03-identidad-visual-tweaks.md). Cada componente de `components/sections/` escribe markup contra esas clases; el CSS es la fuente de verdad del look.

## Decisiones clave documentadas (zonas grises)

- **Sin presupuesto en el form**: se pregunta *tipo de sesión, formato (solo audio / audio+vídeo), plazo deseado*. Coherente con la regla "sin precios".
- **Sesiones ≠ canciones**: se llaman "sets"/"sesiones" y se publican en plataformas de mixes (YouTube/SoundCloud), nunca Spotify.
- **"Juntadas"** como tipo de evento de comunidad (listening, b2b abierto) — refuerza el lado "nexo de unión" pedido por los fundadores.
- **Datos ficticios marcados**: los nombres de DJs/salas son inventados; al pasar a real, sustituir en `content/*.ts` (no tocar componentes).

## Ficheros clave

| Qué | Dónde |
|---|---|
| Páginas | `app/(site)/{page,artistas/page,sesiones/page,eventos/page,contacto/page}.tsx` |
| Componentes de sección | `components/sections/*.tsx` |
| Contenido tipado | `content/{site,services,artists,sessions,events}.ts` |
| Form de contacto (cliente) | `components/sections/contacto-form.tsx` + `app/api/contact/route.ts` |

## Pendiente / no implementado

- Embeds reales de SoundCloud/YouTube (hoy UI de player + enlace).
- Alta de eventos/artistas por el cliente (CMS) — scope futuro (`PLAN.md`).

## Referencias cruzadas

- **Identidad visual / clases CSS**: [`03-identidad-visual-tweaks.md`](03-identidad-visual-tweaks.md).
- **Imágenes**: [`../IMAGENES.md`](../IMAGENES.md).
- **Arquitectura**: [`01-arquitectura.md`](01-arquitectura.md).
