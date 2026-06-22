# PLAN — Backstage Records · web-preview

> Visión maestra del proyecto, fases y scope futuro. Estado vivo en [`HANDOVER.md`](HANDOVER.md); reglas en [`CLAUDE.md`](CLAUDE.md).
> Última actualización: 2026-06-04.

---

## Visión

**Backstage Records** es un estudio + sello de Madrid que **graba, edita y promociona** sesiones de música electrónica (audio y vídeo) y quiere posicionarse como **nexo de unión** entre DJs, productoras, salas y otros sellos. La web tiene dos trabajos:

1. **Captar DJs** (foco Madrid) para que vengan a grabar al estudio y contraten edición + promoción.
2. **Proyectar autoridad de marca**: que un artista o una sala vean a Backstage como el sitio serio donde pasa la escena.

El producto es un servicio: *"Tú, DJ, vienes a mi estudio a grabar una sesión; la editamos y la promocionamos de forma profesional"* en YouTube, SoundCloud y similares (no Spotify — derechos de mezcla).

**Sin precios públicos**: la conversión es contactar, no comprar en la web.

## Objetivos medibles de la preview (esta entrega)

- Una web que se vea **viva y profesional** con datos e imágenes de ejemplo, lista para enseñar a los fundadores.
- **5 secciones** navegables: Home, Artistas, Sesiones (previews), Eventos, Contacto.
- **Panel Tweaks Pro ampliado** que deje "jugar con la paleta en profundidad" (TECO + slider de matiz + glow + textura).
- Cero dependencias bloqueantes para verla (sin mail real, sin imágenes raster obligatorias, sin DB).

## Fases

| Fase | Objetivo | Entregable | Estado |
|---|---|---|---|
| **S0** | Cimientos | Sistema de memoria + scaffold Next.js rebrandeado | ✅ |
| **S1** | Identidad | Paleta TECO + Tweaks Pro ampliado + primitivas de diseño + arte SVG | ✅ |
| **S2** | Secciones | Home · Artistas · Sesiones · Eventos · Contacto (markup sobre contrato CSS) | ✅ |
| **S3** | Contenido | `content/*.ts` nutrido + pósters SVG + `IMAGENES.md` (pack de prompts) | ✅ |
| **S4** | Pulido | Responsive, accesibilidad, animaciones, validación visual, `build` | ✅ |
| **S5** | Despliegue | systemd + vhost Apache + Let's Encrypt + DNS Cloudflare `brecords` | ✅ |

> S0–S5 cerradas el 2026-06-16: la web está **en vivo** en https://brecords.unlimited-systems.net, completa y validada (tipos, build, visual y despliegue verificado). Detalle en [`HANDOVER.md`](HANDOVER.md), [`docs/04-despliegue.md`](docs/04-despliegue.md) y [`docs/changelog/2026-06-16_web-completa.md`](docs/changelog/2026-06-16_web-completa.md).

## Decisiones de producto ya tomadas (zonas grises)

- **Dos caras de la misma marca**: *Backstage Records* (sello/red que publica y promociona) + *Backstage Productions* (el estudio donde se graba). Refuerza el "nexo de unión". Revisable por el operador.
- **Estética**: industrial TECO (contenedores, acero, naranja óxido) **con acentos de glow de club** en CTAs/hero. El panel Tweaks permite virar entre extremos en vivo.
- **Imágenes**: pósters SVG deterministas como default (preview poblada sin raster) + drop-in para fotos reales. Decidido por el operador (no hay generador raster en la sesión de bootstrap).
- **Mail y DNS diferidos**: el envío real y el despliegue se hacen cuando el operador refresque el token de Cloudflare y decida activar correo.

## Scope futuro (post-preview, no en esta entrega)

- Envío real de formularios (Resend o Stalwart self-hosted).
- Integración real de SoundCloud/YouTube (embeds o API) para las sesiones.
- Posible panel de administración / CMS ligero para que el cliente cargue artistas/sesiones/eventos sin tocar código.
- Calendario de eventos conectado a una fuente real (iCal / formulario de alta).
- SEO + Open Graph con imágenes reales; analítica.
- Multidioma (ES/EN) si el alcance pasa de Madrid.

## Riesgos / notas

- **Equipo cliente sin experiencia digital**: la web debe ser autoexplicativa y el copy, claro. Documentar para que puedan opinar sobre lo imaginado.
- **Derechos de música**: nunca presentar la publicación como "sube tu música a Spotify"; el marco es sesiones/sets en plataformas de mixes.
- **VPS single point of failure**: comparte servidor con el resto de webs del operador (ver `compartido/01`).
