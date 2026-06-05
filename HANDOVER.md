# HANDOVER — backstage-records

> Índice maestro del proyecto. **Carga obligatoria al inicio de cualquier sesión nueva**. Mapa "para hacer X, lee Y" + estado actual + changelog cronológico + referencias externas.
> Diseñado para que un agente IA retome el desarrollo con la mínima fricción cargando solo lo necesario.
> Última actualización: 2026-06-04.

---

## Estado actual del proyecto (resumen ejecutivo)

**Cliente / dueño**: Backstage Records (Sergio y Willy). Integración nueva de Unlimited Systems.

**Stack**: Next.js 15 · React 19 · TS strict · Tailwind v4 (CSS vars) · framer-motion · lenis · Tweaks Pro ampliado · Resend (diferido).

**Producción**: objetivo `https://brecords.unlimited-systems.net` (VPS Contabo, no desplegado aún).

**Naturaleza de la entrega**: **web-preview nutrida** con datos e imágenes de ejemplo (estrategia SVG + pack de prompts IA). Sin precios. Sin Spotify. Mail diferido.

### Fases cerradas

| Fase | Módulo | Estado |
|---|---|---|
| S0 | Bootstrap sistema de memoria + scaffold Next.js rebrandeado | ⏳ En curso |
| S1 | Identidad TECO + Tweaks Pro ampliado + primitivas de diseño | ⏭ Pendiente |
| S2 | Secciones (Home · Artistas · Sesiones · Eventos · Contacto) | ⏭ Pendiente |
| S3 | Datos de ejemplo + imágenes (SVG + prompts) | ⏭ Pendiente |
| S4 | Pulido, responsive, validación visual, build | ⏭ Pendiente |
| S5 | Despliegue VPS + DNS Cloudflare `brecords` | ⏭ Pendiente (gated: token CF) |

### Lo que se está cocinando / próximos hitos

- Cerrar S0 (memoria + base técnica) y S1 (design system TECO + Tweaks).
- Orquestar S2 con varios subagentes en paralelo (una sección por agente) sobre el contrato de clases CSS.
- Poblar contenido de ejemplo creíble (artistas, sesiones, eventos) y generar pósters SVG.

### Datos / decisiones pendientes del operador

- [ ] Token de Cloudflare (DNS `brecords`) — S5.
- [ ] Handles reales (IG / SoundCloud / YouTube / WhatsApp) + dirección del estudio.
- [ ] Logo y fotos reales (si llegan, sustituyen pósters SVG).
- [ ] Activar email real (Resend/Stalwart) — hoy diferido.

---

## Tabla de contenidos de la documentación

| Doc | Cubre |
|---|---|
| [`docs/01-arquitectura.md`](docs/01-arquitectura.md) | Scaffold Next.js, rutas, layout, montaje de providers, configs |
| [`docs/02-secciones-y-contenido.md`](docs/02-secciones-y-contenido.md) | Las 5 secciones + modelo de contenido tipado (`content/*.ts`) |
| [`docs/03-identidad-visual-tweaks.md`](docs/03-identidad-visual-tweaks.md) | Paleta TECO, tipografía, design tokens, contrato de clases CSS, Tweaks Pro ampliado |
| [`docs/04-despliegue.md`](docs/04-despliegue.md) | systemd + vhost Apache + Let's Encrypt + DNS Cloudflare `brecords` |
| [`IMAGENES.md`](IMAGENES.md) | Estrategia de imágenes: póster SVG + carpeta drop-in + pack de prompts IA |
| [`docs/changelog/`](docs/changelog/) | Historia cronológica |

---

## Por dónde empezar según tu tarea

### Si vas a tocar...

- **Arrancar / entender el proyecto**: [`CLAUDE.md`](CLAUDE.md) (carga automática) + [`docs/01-arquitectura.md`](docs/01-arquitectura.md).
- **Una sección de la web** (Home/Artistas/Sesiones/Eventos/Contacto): [`docs/02-secciones-y-contenido.md`](docs/02-secciones-y-contenido.md) + el `content/<dominio>.ts` correspondiente.
- **Colores / paleta / Tweaks / animaciones**: [`docs/03-identidad-visual-tweaks.md`](docs/03-identidad-visual-tweaks.md) + [`app/globals.css`](app/globals.css).
- **Imágenes / reemplazar pósters por fotos reales**: [`IMAGENES.md`](IMAGENES.md).
- **Desplegar**: [`docs/04-despliegue.md`](docs/04-despliegue.md) + [`../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).
- **Reglas innegociables y filosofía**: [`CLAUDE.md`](CLAUDE.md) (carga automática).

### Si vas a investigar un cambio histórico

- [`docs/changelog/2026-06-04_bootstrap.md`](docs/changelog/2026-06-04_bootstrap.md) — arranque del proyecto.

---

## Histórico (changelog cronológico)

| Fecha | Hito | Detalle |
|---|---|---|
| 2026-06-04 | Bootstrap | Alta del repo en el sistema de memoria + scaffold Next.js + identidad TECO. [Ver](docs/changelog/2026-06-04_bootstrap.md) |

---

## Sistema de memoria del proyecto

Organización descrita en `C:\GitHub\UNLIMITED_AI_BRAIN\SISTEMA.md`:

- **CLAUDE.md** (raíz, carga automática): filosofía embebida + reglas innegociables locales + identidad + mapa rápido.
- **HANDOVER.md** (este fichero, índice maestro): se carga al inicio de cada sesión.
- **docs/0X-*.md**: dominio, bajo demanda.
- **docs/changelog/**: historia cronológica.

---

## Referencias externas

- **Imagen de marca / branding / Tweaks Pro de referencia**: [`../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md`](../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md).
- **Infraestructura compartida (VPS, Apache, Cloudflare, Let's Encrypt)**: [`../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).
- **Mail server (Stalwart, cuando se active envío real)**: [`../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md`](../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md).
- **Sistema global de memoria**: [`../UNLIMITED_AI_BRAIN/SISTEMA.md`](../UNLIMITED_AI_BRAIN/SISTEMA.md).
- **Plan maestro del proyecto**: [`PLAN.md`](PLAN.md).
- **Repo base forkeado** (Next.js + Tweaks Pro): `C:\GitHub\UNLIMITED_Web\`.
- **Ficha en el índice maestro**: `../UNLIMITED_AI_BRAIN/repos-propios/backstageproductions.md`.

---

## Identidades, URLs y comandos rápidos

**URLs**:
- Dev local: http://localhost:3000
- Producción / staging: https://brecords.unlimited-systems.net (no desplegado)
- IP servidor: `185.213.25.188` · puerto interno previsto `127.0.0.1:3001`

**Git**: branch principal `main`. Operador: `yagogurru77@gmail.com`.

**Comandos más usados**:

```powershell
npm run dev
npm run typecheck
npm run build
```
