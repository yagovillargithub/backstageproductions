# 2026-06-16 — Web-preview completa y validada (S1–S4)

> Sesión de construcción de la web sobre el scaffold del bootstrap (2026-06-04).
> Se levanta el sitio entero con orquestación multi-agente y se valida de punta
> a punta (tipos, build y visual real).

---

## Qué se entregó

La web-preview de Backstage Records, completa y navegable en las 5 rutas, con
datos de ejemplo nutridos, póster SVG de marca y el panel Tweaks Pro ampliado.

### Orquestación

Se construyó con un workflow de 13 subagentes en dos olas sobre un **contrato de
interfaces congelado** (CSS vars, atributos `data-*`, `TweakState`, claves
`backstage.*`, shapes de `content/*.ts`):

- **Fundación (7 agentes)**: `app/layout` + route group `(site)` + API
  contact/tweaks-feedback · `app/globals.css` (design system TECO completo:
  4 paletas con acento HSL vivo, glow, textura, hero deck, contrato de clases) ·
  Tweaks Pro (provider + panel: slider de matiz −40/+40°, glow, textura,
  presets Nave/Día de obra/Sala/Monolito) · primitivas (nav, footer, reveal,
  marquee, lenis, cursor, WhatsApp) · arte SVG determinista (Poster, Waveform,
  DeckVisual, Mesh, Corrugate) · `content/site.ts`+`services.ts` · dataset
  relacional (10 artistas, 14 sesiones, 12 eventos cruzados por slug).
- **Secciones (6 agentes)**: Artistas, Sesiones, Eventos, Contacto e `IMAGENES.md`.

Dos agentes (home y artistas) cayeron por límite de tokens de sesión; artistas
había escrito ya sus ficheros (se validó completo). La **home** se completó
a mano en una sesión posterior: `app/(site)/page.tsx` + 8 componentes
`home-*` (hero ya existía), reutilizando `SesionCard` y los helpers de eventos.

### Validación (S4)

- `npm run typecheck`: verde a la primera (contrato respetado por los 13 agentes).
- `npm run build`: 10/10 rutas; home estática (161 B), contacto la más pesada
  (27.8 kB por el formulario cliente).
- **Visual real**: capturas de las 5 páginas (1440px) + home móvil (390px) +
  panel Tweaks abierto + swap de paleta a `acero` en vivo. Protocolo y aprendizajes
  en [`docs/10-protocolo-pruebas.md`](../10-protocolo-pruebas.md).

### Pulido de copy (revisión visual)

- Proceso (home): "De la cabina a la plataforma" → "De la toma a la publicación"
  (evita el eco con el hero "De la cabina a la escena").
- Sesiones destacadas: "Cabecera de catálogo" → "En portada".

---

## Decisiones en zonas grises

- **Hero deck en markup CSS, no `<DeckVisual/>`**: las animaciones
  `.deck-platter`/`.deck-arm` y las variantes rejilla/tipo del panel están
  escritas contra spans con `transform-origin` de viewport; montar el SVG las
  rompería. El SVG de `components/art/deck.tsx` queda disponible pero el hero usa
  el contrato de clases (documentado en `globals.css` y en `home-hero.tsx`).
- **Bug de auto-referencia evitado**: las intensidades de acento mezclan sobre
  `--accent-core` (intermedia), nunca sobre `--accent` — el repo base
  `UNLIMITED_Web` tiene ahí un ciclo CSS latente.
- **`shortDate()` no acepta fechas con hora**: los eventos llevan ISO con hora y
  offset; se usa el helper `eventDay()` antes de `shortDate()`.
- **Visual-check sin dependencia nueva**: se reutiliza el Playwright de
  `UNLIMITED_Web` y el Chromium cacheado en vez de añadir Playwright al repo.

---

## Despliegue (S5) — mismo día

El operador refrescó el token de Cloudflare y pidió la URL en producción. Se
desplegó la web completa en el VPS Contabo:

- **DNS**: registro A `brecords` → `185.213.25.188` (DNS-only) vía API de Cloudflare.
- **App**: tarball de fuente (~180 KB) por scp + `npm ci && npm run build` **en el
  VPS** (no se sube el build; ADSL lenta). En `/opt/backstage-web/`.
- **systemd**: `backstage-web.service` (`next start`, :3001, www-data), clonado de
  `unlimited-web.service`.
- **Apache**: vhost reverse-proxy a `127.0.0.1:3001`, con guarda `configtest`
  (revierte el sitio sin tocar las otras 7 webs si falla).
- **TLS**: `certbot --apache --redirect`, cert hasta 2026-09-14, auto-renovación.
- **Verificado**: HTTPS 200 externo + HTTP→HTTPS 301 + captura de la URL pública +
  smoke test de las 7 webs hermanas (siguen sirviendo). Detalle y receta de
  redeploy en [`docs/04-despliegue.md`](../04-despliegue.md).

> ⚠️ **Acción de seguridad pendiente**: el token de Cloudflare se compartió en
> texto plano en el chat. El operador debe revocarlo/rotarlo en Cloudflare.

## Estado tras la sesión

- **S0–S5 cerradas. La web está en vivo en https://brecords.unlimited-systems.net**,
  lista para enseñar a los fundadores.
- **Pendiente**: datos reales (handles, dirección, fotos), activar email real
  (añadir vars al `.env.production.local` del VPS + restart). Revocar token CF.

## Ficheros tocados (resumen)

```
app/(site)/page.tsx + components/sections/home-{manifesto,proceso,stats,artistas,sesiones,eventos,cta}.tsx
components/sections/{home-proceso,sesiones-destacadas}.tsx  (copy)
docs/10-protocolo-pruebas.md  (nuevo)
scripts/shoot.mjs, scripts/shoot-tweaks.mjs  (herramienta de validación)
.gitignore  (ignora scripts/shots/)
```
