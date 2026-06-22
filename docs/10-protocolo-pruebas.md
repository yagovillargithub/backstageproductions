# Protocolo de pruebas

> Cómo se valida una tarea antes de cerrarla. Referenciado desde `CLAUDE.md`.
> Última actualización: 2026-06-16.

---

## Regla

Ninguna tarea que toque UI se cierra con "build OK". El cierre exige tres
puertas en verde **y** ver la pantalla:

1. **Tipos**: `npm run typecheck` (tsc --noEmit) sin errores.
2. **Build**: `npm run build` genera las 10 rutas sin fallos de lint ni de tipos.
3. **Validación visual real**: arrancar `npm run dev`, navegar las páginas
   tocadas y capturar. Comparar contra lo esperado, no suponer.

## Validación visual (capturas automatizadas)

El repo no trae Playwright como dependencia (no se quiere inflar la preview).
Se reutiliza el Playwright + Chromium ya instalados en `C:\GitHub\UNLIMITED_Web`.
El script `scripts/shoot.mjs` recorre las 5 páginas en escritorio (1440px) y la
home en móvil (390px), y `scripts/shoot-tweaks.mjs` abre el panel Tweaks y prueba
el re-tematizado en vivo. Las capturas caen en `scripts/shots/` (ignorada por git).

```powershell
npm run dev            # en una shell aparte (deja :3000 levantado)
node scripts/shoot.mjs
node scripts/shoot-tweaks.mjs
```

### Cosas a saber (aprendidas en S4)

- **Rutas hardcodeadas**: ambos scripts importan Playwright vía
  `file:///C:/GitHub/UNLIMITED_Web/node_modules/playwright/index.js` y lanzan el
  Chromium cacheado en `…/ms-playwright/chromium-1148/chrome-win/chrome.exe`. Si
  el build de Chromium cacheado cambia, ajustar `executablePath` (buscar con
  `Get-ChildItem $env:USERPROFILE\AppData\Local\ms-playwright -Recurse -Include chrome.exe`).
- **El reveal engaña a las capturas `fullPage`**: las secciones entran con
  `data-reveal` (opacity 0 hasta que el `IntersectionObserver` las cruza). Una
  captura `fullPage` directa deja todo lo que está bajo el pliegue en negro
  aunque el DOM esté completo. `shoot.mjs` recorre la página en pasos de viewport
  (`revealAll`) para disparar los observers antes de capturar. No es un bug: un
  usuario real ve cada sección aparecer al hacer scroll.
- **Elementos fijos se duplican por tile**: en páginas muy altas (la home móvil
  pasa de 20.000px) el botón flotante de WhatsApp y el FAB de Tweaks aparecen
  repetidos en la captura `fullPage`. Es un artefacto de teselado de Playwright,
  no duplicación de markup. Para confirmar, contar atributos exactos en el HTML
  servido (`class="hero"`, etc.) debe dar 1.
- **Lock de `.next`**: si `npm run dev` sigue vivo, `npm run build` falla con
  `EPERM … .next\trace`. Parar el dev server (o el proceso node del repo) antes de
  construir.

## Checklist de marca (además de lo técnico)

- [ ] Cero precios en cualquier forma (ni "desde", ni rangos).
- [ ] Cero Spotify / streaming musical; solo YouTube · SoundCloud.
- [ ] Copy serio: sin emojis ni exclamaciones en contenido público.
- [ ] Panel Tweaks: cambio de paleta y slider de matiz repintan el sitio en vivo.
- [ ] Sin 404 de imágenes con `public/img/` vacío (póster SVG de fallback).
