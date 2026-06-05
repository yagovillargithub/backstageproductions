# CLAUDE.md — backstage-records (Backstage Records / Backstage Productions)

> Reglas innegociables, identidad del proyecto y mapa del repo. Este fichero se carga **automáticamente** en cada sesión de Claude Code. Cualquier cambio en el código debe respetar este documento.
> Detalle por dominio en [HANDOVER.md](HANDOVER.md) (índice maestro) y `docs/0X-*.md` (referencia por tema). La organización global del sistema de memoria vive en `C:\GitHub\UNLIMITED_AI_BRAIN\SISTEMA.md`.

---

<!-- FILOSOFIA:BEGIN -->
## Filosofía de trabajo

Trabajamos este código con **profesionalidad y cariño**. Eso significa:

- **Causa raíz, no síntoma**: cuando algo falla, diagnostica el porqué antes
  de parchear. Silenciar un test, saltarse una validación o bypasear una
  comprobación "para que pase" es deuda futura que pagaremos con intereses.
- **Consume los recursos que la calidad pida**, no los que la prisa permita.
  Lanza agentes en paralelo, captura visualmente antes de hipotetizar, lee
  archivos enteros si el contexto lo merece. Tokens, tiempo y herramientas
  están para usarse: el coste de hacerlo bien es siempre menor que el de
  rehacerlo.
- **Si dudas, pregunta**. Una pregunta clara al operador es más barata que
  una decisión equivocada que arrastra tres tareas.
- **Cuida lo que ya funciona**. Lee antes de tocar; preserva lo que está
  estable; los cambios destructivos requieren justificación, no son default.
- **Termina lo que empiezas**. Una tarea no está cerrada hasta haberla
  validado según el protocolo de pruebas del repo. "Build OK" sin validar
  visualmente o sin ejercer el flujo no es terminar — es esperar a que el
  operador encuentre el bug.
- **Echa imaginación**. Cuando el problema admite varias soluciones, elige
  la que más respete el código existente, la que más simplifica el sistema
  o la que abre la puerta a futuras mejoras sin cerrarte caminos. No la más
  rápida.
- **Avisa sobre la marcha, con mesura**. Si detectas mejoras adyacentes,
  riesgos no obvios, deuda visible o atajos prometedores mientras trabajas,
  menciónaselos al operador en lugar de guardártelos. Pero **sin saturar**:
  un aviso claro y bien dosificado vale más que tres notas dispersas. Filtra
  por relevancia y agrupa.

Estas siete actitudes sostienen todas las reglas operativas que siguen.
<!-- FILOSOFIA:END -->

---

## Identidad del proyecto

**Cliente / dueño**: **Backstage Records** — marca creada por **Sergio y Willy**. Equipo joven, sin recorrido previo en el mundo empresarial / digital / publicitario, por lo que el operador (Unlimited Systems) **completa e imagina** los aspectos no fijados en las reuniones iniciales, documentándolos como decisiones en zonas grises.

**Alcance**: Estudio de **grabación, edición y promoción profesional de sesiones de música electrónica** (audio **y** vídeo) en Madrid. El producto: un DJ viene al estudio, graba una sesión, nosotros la editamos y la publicitamos/promocionamos en plataformas tipo **YouTube y SoundCloud** (NO Spotify/streaming musical — son sesiones de DJ que mezclan derechos de terceros). La marca quiere actuar además como **nexo de unión** entre artistas, productoras y salas. Esta primera entrega es una **web-preview muy nutrida** (datos e imágenes de ejemplo) para enseñar a los fundadores cómo puede quedar.

**⚠️ Restricciones críticas**:
- **Sin precios en ningún sitio público** (regla comercial heredada de `compartido/03-imagen-de-marca.md`): ni euros, ni rangos, ni "desde X". Se pide *formato / plazo / tipo de sesión*, nunca presupuesto.
- **No incluir Spotify ni plataformas de streaming musical** como destino de publicación: solo YouTube, SoundCloud y similares de sesiones/mixes.
- **Servidor de mail y envío real: aplazado** (decisión del operador). El form de contacto y el endpoint de tweaks funcionan en modo "acepta + loguea" sin `RESEND_API_KEY` (igual patrón que `UNLIMITED_Web`).

## Stack

- **Next.js 15** (App Router, React Server Components) + **React 19** + **TypeScript strict**.
- **Tailwind v4** con `@theme inline` sobre **CSS vars** en `app/globals.css` (sin `tailwind.config.js` — requisito del panel Tweaks Pro, que reasigna variables en vivo).
- **next/font** (Instrument Serif display · Inter Tight sans · JetBrains Mono mono/eyebrow).
- **framer-motion** + **lenis** (smooth scroll), `react-hook-form` + `zod` (formularios), **Resend** (email transaccional, diferido con fallback no-op), **@upstash/ratelimit** (no-op limpio sin envs).
- **Tweaks Pro ampliado**: panel flotante con paletas TECO + **slider de matiz de acento**, glow de club, textura industrial, además de las 10 dimensiones base. Claves `localStorage` con prefijo **`backstage.`** (NO `unlimited.`).
- **Imágenes**: estrategia *SVG generado on-brand* (póster determinista por slug) + carpeta drop-in `public/img/` + pack de prompts en `IMAGENES.md`. No hay dependencia de ficheros raster para que la preview se vea poblada desde el primer build.
- Path alias `@/*`. Server Components por defecto. Contenido tipado en `content/*.ts`. Comentarios mínimos (solo el "porqué").

## Cómo arrancar la app

```powershell
cd C:\GitHub\backstageproductions
npm install
npm run dev      # http://localhost:3000
```

URLs y credenciales dev:
- **URL local**: http://localhost:3000
- **Login**: no aplica (web pública sin auth).

## Reglas de operación con el operador (innegociables locales)

> La filosofía universal está arriba. Estas son **reglas específicas de este repo**.

1. **Cero precios públicos** y **cero Spotify** (ver Restricciones críticas). Si un agente añade un "desde X €" o un enlace a Spotify, está rompiendo una regla deliberada.
2. **Tokens de paleta en CSS vars, no en `tailwind.config.js`**: el panel Tweaks reasigna `--accent`, `--accent-shift`, etc. en vivo. Volver a un `tailwind.config.js` clásico rompe el panel.
3. **Claves `localStorage` con prefijo `backstage.`** (`backstage.tweaks`, `backstage.tweaks.presets`) — tanto en `provider.tsx` como en `TWEAKS_BOOT_SCRIPT`. Drift entre ambos = FOUC.
4. **Copy serio, sin emojis ni exclamaciones** en el contenido público. Registro de marca, no decoración. Verbos de actividad (grabar, editar, mezclar, masterizar, promocionar, publicar), no jerga técnica gratuita.
5. **Imágenes raster son opcionales**: el sitio debe verse completo sin ellas (póster SVG de fallback). No introducir 404 de imágenes en datos de ejemplo.
6. **PWA / service worker deshabilitado** por defecto (regla `compartido/03` — el SW da problemas en deploys frecuentes).
7. **Antes de elegir entre propuestas no triviales de diseño/copy/arquitectura, preguntar al operador** (le gusta opinar y suele tener preferencia no obvia). Decisiones triviales/reversibles, tirar para adelante.

## Protocolo de pruebas obligatorio

Antes de cerrar una tarea que toque UI: `npm run typecheck` + `npm run build` en verde, y **validación visual real** (arrancar `npm run dev`, navegar la página tocada, capturar). "Build OK" sin ver la pantalla no es terminar. Detalle en [`docs/10-protocolo-pruebas.md`](docs/10-protocolo-pruebas.md) (si existe).

## Convenciones de código

- Server Components por defecto; `"use client"` solo donde haga falta estado/efectos (tweaks, formularios, controladores de scroll/reveal).
- Estilos: **clases CSS del design system en `globals.css`** (las secciones consumen un *contrato de clases* documentado en `docs/03`), Tailwind utilitario solo para layout puntual. Evitar CSS-in-JS salvo el bloque `<style>` del panel Tweaks (heredado del patrón UNLIMITED).
- Contenido y datos de ejemplo: en `content/*.ts`, tipado. Nada de datos hardcodeados dentro de los componentes.
- Nombres de fichero de componente kebab-case; rutas en español (`/artistas`, `/sesiones`, `/eventos`, `/contacto`).
- Comentarios solo donde el "porqué" no sea obvio.

## Mapa del repo (cómo leer)

| Para entender / tocar... | Lee... |
|---|---|
| Arquitectura, rutas, scaffold Next.js | [`docs/01-arquitectura.md`](docs/01-arquitectura.md) |
| Secciones de la web + modelo de contenido (`content/*.ts`) | [`docs/02-secciones-y-contenido.md`](docs/02-secciones-y-contenido.md) |
| Identidad visual TECO + sistema Tweaks Pro ampliado | [`docs/03-identidad-visual-tweaks.md`](docs/03-identidad-visual-tweaks.md) |
| Imágenes (estrategia SVG + pack de prompts IA + drop-in) | [`IMAGENES.md`](IMAGENES.md) + [`docs/02-secciones-y-contenido.md`](docs/02-secciones-y-contenido.md) |
| Despliegue VPS + DNS Cloudflare `brecords` | [`docs/04-despliegue.md`](docs/04-despliegue.md) |
| Historia cronológica | [`docs/changelog/`](docs/changelog/) |
| Visión maestra, fases y scope futuro | [`PLAN.md`](PLAN.md) |

## Referencias a UNLIMITED_AI_BRAIN

Conocimiento compartido entre repos. Cross-refs relativos desde este repo:

- **Imagen de marca / branding / Tweaks Pro de referencia**: [`../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md`](../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md) — `C:\GitHub\UNLIMITED_AI_BRAIN\compartido\03-imagen-de-marca.md`
- **Infraestructura VPS, Apache, Let's Encrypt, Cloudflare, despliegue**: [`../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md) — `C:\GitHub\UNLIMITED_AI_BRAIN\compartido\01-infraestructura-vps.md`
- **Mail server Stalwart** (cuando se active envío real, diferido): [`../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md`](../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md) — `C:\GitHub\UNLIMITED_AI_BRAIN\compartido\02-mail-server-stalwart.md`
- **Sistema global de memoria**: [`../UNLIMITED_AI_BRAIN/SISTEMA.md`](../UNLIMITED_AI_BRAIN/SISTEMA.md)
- **Filosofía** (fuente del bloque embebido arriba): [`../UNLIMITED_AI_BRAIN/FILOSOFIA.md`](../UNLIMITED_AI_BRAIN/FILOSOFIA.md)
- **Repo base del que se forkeó la web** (Next.js + Tweaks Pro): `C:\GitHub\UNLIMITED_Web\`

## Bloqueos / decisiones pendientes del operador

- [ ] **Token de Cloudflare**: necesario para crear el registro DNS `brecords.unlimited-systems.net` en la fase de despliegue (S5). El operador lo refrescará bajo demanda.
- [ ] **Handles reales** de Instagram / SoundCloud / YouTube / WhatsApp y datos del estudio (dirección Madrid). Mientras tanto, placeholders coherentes en `content/site.ts`.
- [ ] **Logo definitivo / fotos reales** del estudio y DJs: si llegan, sustituyen al póster SVG vía `IMAGENES.md`.
- [ ] **Activar envío de email real** (Resend o Stalwart) cuando el operador lo decida — hoy diferido.

## Identidades, URLs y comandos rápidos

**URLs**:
- Dev local: http://localhost:3000
- Producción / staging: https://brecords.unlimited-systems.net (objetivo; no desplegado aún)
- IP servidor: `185.213.25.188` (VPS Contabo compartido — ver `compartido/01`)
- Puerto interno previsto en el VPS: `127.0.0.1:3001` (libre; 3000=unlimited-web, 3100=demogurru-api)

**Git**: branch principal `main`. Operador: `yagogurru77@gmail.com`.

**Comandos más usados**:

```powershell
# Dev
npm run dev

# Calidad antes de cerrar tarea
npm run typecheck
npm run build

# Lint
npm run lint
```

## Glosario rápido

- **Sesión / set**: grabación de un DJ mezclando, en audio y vídeo, producto central del estudio.
- **Nexo de unión**: posicionamiento de marca — Backstage actúa de puente entre DJs, productoras, salas y sellos.
- **Juntada**: evento informal/comunidad (listening, b2b, sesión abierta) además de los eventos con line-up.
- **Residente**: artista recurrente del sello/estudio.
- **Tweaks Pro**: panel flotante de personalización visual en vivo (paleta TECO + slider de matiz + glow + textura + 10 dimensiones base).
