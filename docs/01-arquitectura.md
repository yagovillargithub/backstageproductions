# Arquitectura y scaffold

> Estructura técnica del proyecto: Next.js 15 App Router, montaje de providers, rutas y configuración. Forkeado de `C:\GitHub\UNLIMITED_Web\`.
> Última actualización: 2026-06-04.

---

## Resumen

Web estática + API ligera en **Next.js 15 (App Router, React Server Components)**. Server Components por defecto; los `"use client"` se limitan a Tweaks Pro, formularios y controladores de scroll/reveal. Estilo via **Tailwind v4 con `@theme inline` sobre CSS vars** (sin `tailwind.config.js`). Contenido tipado en `content/*.ts`. Imágenes con estrategia de póster SVG (sin dependencia raster).

## Estado actual

### Árbol del proyecto

```
backstageproductions/
├── app/
│   ├── layout.tsx                 # Root: fuentes next/font, metadata, TWEAKS_BOOT_SCRIPT, TweaksProvider
│   ├── globals.css                # Design system completo (tokens TECO + contrato de clases por sección)
│   ├── sitemap.ts · robots.ts
│   ├── (site)/                    # Route group con nav/footer/tweaks/cursor/smooth-scroll
│   │   ├── layout.tsx             # Monta Nav, Footer, CursorBlob, SmoothScroll, RevealController, TweaksPanel, WaFloat
│   │   ├── page.tsx               # Home
│   │   ├── artistas/page.tsx
│   │   ├── sesiones/page.tsx
│   │   ├── eventos/page.tsx
│   │   └── contacto/page.tsx
│   └── api/
│       ├── contact/route.ts       # Form de contacto (Resend diferido + Upstash no-op + honeypot)
│       └── tweaks-feedback/route.ts
├── components/
│   ├── nav.tsx · footer.tsx · cursor-blob.tsx · smooth-scroll.tsx · reveal.tsx · wa-float.tsx · marquee.tsx
│   ├── tweaks/{provider,panel}.tsx
│   ├── art/                       # Arte SVG industrial (corrugación, waveform, deck, mesh, poster)
│   └── sections/                  # Componentes por sección (home-*, artistas-*, sesiones-*, eventos-*, contacto-*)
├── content/                       # Datos tipados: site, services, artists, sessions, events
├── hooks/use-reduced-motion.ts
├── lib/{utils,schemas,rate-limit}.ts
├── public/img/                    # Carpeta drop-in para fotos reales (ver IMAGENES.md)
├── next.config.ts · tsconfig.json · postcss.config.mjs · package.json
└── .env.example
```

### Montaje de providers (orden importante)

1. `app/layout.tsx` (Server): declara las 3 fuentes `next/font` como `--font-*`, inyecta `TWEAKS_BOOT_SCRIPT` en `<head>` (pre-paint, evita FOUC), envuelve `children` en `<TweaksProvider>`. `<html suppressHydrationWarning>` es **obligatorio** (el boot script muta `data-*` antes de hidratar).
2. `app/(site)/layout.tsx` (Server): monta `SmoothScroll`, `CursorBlob`, `Nav`, `<main>`, `Footer`, `RevealController`, `TweaksPanel`, `WaFloat`.

### Decisiones clave documentadas (zonas grises)

- **Route group `(site)`** en vez de `(marketing)`: el nombre describe mejor un sitio de marca de una sola pieza. Sin impacto en URLs (los grupos no aparecen en la ruta).
- **`@theme inline` sobre CSS vars** (no `tailwind.config.js`): imprescindible para que Tweaks Pro reasigne `--accent`, `--accent-shift`, etc. en vivo. Romper esto rompe el panel.
- **Sin Vercel Analytics/SpeedInsights** por defecto (el repo base los traía): se despliega en VPS propio, no en Vercel. Se pueden añadir si el operador lo pide.
- **Puerto interno 3001** en el VPS (3000 lo ocupa `unlimited-web`).

## Modelo / Endpoints / API

| Verbo | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/contact` | Form de contacto. Zod + honeypot + rate-limit. Sin `RESEND_API_KEY` → acepta + loguea (dev). | Honeypot + rate limit |
| POST | `/api/tweaks-feedback` | "Me gusta esta configuración" del panel Tweaks. Igual patrón de fallback. | Honeypot + rate limit |

## Ficheros clave

| Qué | Dónde |
|---|---|
| Root layout + fuentes + boot script | `app/layout.tsx` |
| Layout de sitio (monta primitivas) | `app/(site)/layout.tsx` |
| Design system + contrato de clases | `app/globals.css` |
| Tweaks (estado, persistencia, presets, boot) | `components/tweaks/provider.tsx` |
| Tweaks (panel UI) | `components/tweaks/panel.tsx` |
| Utilidades (`cn`, `SITE_URL`, `waLink`) | `lib/utils.ts` |
| Schemas Zod (contacto + tweaks) | `lib/schemas.ts` |
| Rate limit (no-op sin envs) | `lib/rate-limit.ts` |

## Pendiente / no implementado

- Tests E2E (Playwright) — opcional, replicar de `UNLIMITED_Web` si el proyecto crece.
- Integración real SoundCloud/YouTube (hoy enlaces/UI de player).

## Referencias cruzadas

- **Secciones y contenido**: [`02-secciones-y-contenido.md`](02-secciones-y-contenido.md).
- **Identidad visual y Tweaks**: [`03-identidad-visual-tweaks.md`](03-identidad-visual-tweaks.md).
- **Despliegue**: [`04-despliegue.md`](04-despliegue.md).
- **Repo base**: `C:\GitHub\UNLIMITED_Web\` (CLAUDE.md + docs).
