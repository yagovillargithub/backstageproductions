# 2026-06-04 — Bootstrap del proyecto Backstage Records

> Sesión de arranque de 2026-06-04. Integración de un cliente nuevo (Backstage Records, fundadores Sergio y Willy) en el ecosistema Unlimited Systems: alta en el sistema de memoria + scaffold de la web-preview.

---

## Cambios entregados

### 1. Sistema de memoria (`UNLIMITED_AI_BRAIN`)

Alta del repo siguiendo `SISTEMA.md §6`: `CLAUDE.md` (con bloque FILOSOFIA embebido byte-idéntico), `HANDOVER.md`, `PLAN.md`, `docs/01..04`, este changelog. Ficha en `repos-propios/backstageproductions.md` + fila en la tabla maestra §1 y en el mapa de despliegues §4 de `repos-propios/README.md` (13 → 14 repos propios catalogados).

**Ficheros tocados**: `backstageproductions/{CLAUDE,HANDOVER,PLAN}.md`, `backstageproductions/docs/*`, `UNLIMITED_AI_BRAIN/repos-propios/{backstageproductions.md,README.md}`.

### 2. Scaffold web Next.js (fork de `UNLIMITED_Web`)

Base Next.js 15 + React 19 + TS strict + Tailwind v4, rebrandeada a Backstage Records: configs, layout, lib, hooks, Tweaks Pro con claves `backstage.`.

### 3. Identidad TECO + Tweaks Pro ampliado

Paleta industrial TECO + glow de club, design tokens en `globals.css`, y panel Tweaks ampliado con **slider de matiz de acento**, **glow** y **textura industrial** además de las 10 dimensiones base.

### 4. Secciones, contenido y arte

Home, Artistas, Sesiones (previews), Eventos, Contacto. Contenido de ejemplo tipado en `content/*.ts`. Arte SVG industrial + estrategia de póster (`IMAGENES.md`).

---

## Decisiones tomadas en zonas grises

- **Stack Next.js** (no Blazor): elegido por el operador — fork directo del Tweaks Pro de UNLIMITED, ideal para una preview rica.
- **Estética mezcla industrial TECO + glow de club**: elegida por el operador; el panel Tweaks permite virar entre extremos.
- **Imágenes por póster SVG** + pack de prompts (no hay generador raster en la sesión).
- **Dos caras de marca**: Backstage Records (sello) + Backstage Productions (estudio).
- **Sin precios · sin Spotify · mail y DNS diferidos**: reglas fijadas por la reunión + `compartido/03`.

---

## Ficheros tocados (resumen)

```
backstageproductions/CLAUDE.md, HANDOVER.md, PLAN.md, IMAGENES.md
backstageproductions/docs/01-arquitectura.md ... 04-despliegue.md
backstageproductions/docs/changelog/2026-06-04_bootstrap.md
backstageproductions/{app,components,content,lib,hooks,public}/...
backstageproductions/{package.json,tsconfig.json,next.config.ts,postcss.config.mjs,.gitignore,.env.example}
UNLIMITED_AI_BRAIN/repos-propios/backstageproductions.md, README.md
```

---

## Pendiente tras esta sesión

- Validación visual real (arrancar `npm run dev`, capturar).
- Despliegue + DNS `brecords` (gated: token Cloudflare).
- Sustituir placeholders (redes, dirección, fotos) por datos reales del cliente.

---

## Referencias

- Docs de dominio: [`docs/01-arquitectura.md`](../01-arquitectura.md) … [`04-despliegue.md`](../04-despliegue.md).
- Branding de referencia: `UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md`.
