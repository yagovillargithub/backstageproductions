# Identidad visual TECO + Tweaks Pro ampliado

> Paleta, tipografía, design tokens, contrato de clases CSS y el sistema Tweaks Pro ampliado.
> Última actualización: 2026-06-04.

---

## Resumen

Lenguaje visual **industrial TECO** (contenedores, acero corrugado, hormigón, naranja óxido) **con acentos de glow de club** en CTAs y hero. Tokens en CSS vars (`app/globals.css`), expuestos a Tailwind con `@theme inline`. El panel **Tweaks Pro ampliado** permite "jugar con la paleta en profundidad": 4 paletas + slider de matiz de acento + intensidad + glow + textura + las dimensiones base.

## Estado actual

### Paletas (`[data-palette]`)

| Paleta | Concepto | bg | fg | accent base |
|---|---|---|---|---|
| `teco` (default) | Industrial oscuro, naranja óxido | `#14110d` | `#f2ece1` | `#e8631a` |
| `acero` | Hormigón claro / día de obra | `#ece8e1` | `#16130e` | `#c4521a` |
| `club` | Noche de sala, naranja neón + glow | `#0a0a0c` | `#f4f1ea` | `#ff6a1a` |
| `monolito` | Mono alto contraste | `#0b0b0b` | `#fafafa` | `#ff7a2a` |

Cada paleta define `--accent-h/--accent-s/--accent-l` (HSL) además de los hex, para que el **slider de matiz** funcione encima.

### Tipografía (`[data-font]`)

`editorial` (Instrument Serif display), `modern` (Inter Tight todo), `techno` (JetBrains Mono display). Eyebrow/metadatos siempre en mono.

### Tweaks Pro — dimensiones

Estado en `localStorage` con prefijo **`backstage.`**. Atributos en `<html>`:

| Dimensión | Valores | Cómo se aplica |
|---|---|---|
| Paleta | `teco` `acero` `club` `monolito` | `data-palette` |
| Modo oscuro | bool | `data-theme` |
| **Matiz de acento** (NUEVO) | slider −40°…+40° | inline `--accent-shift` (desplaza el naranja en vivo) |
| Intensidad de acento | `subtle` `normal` `bold` | `data-accent-intensity` |
| **Glow** (NUEVO) | `off` `soft` `strong` | `data-glow` (bloom de club en acentos/CTAs) |
| **Textura** (NUEVO) | `off` `corrugado` `hormigon` `malla` | `data-texture` (overlay industrial) |
| Tipografía | `editorial` `modern` `techno` | `data-font` |
| Hero | `deck` `rejilla` `tipo` | `data-hero` |
| Densidad | `compact` `normal` `spacious` | `data-density` |
| Bordes | `sharp` `soft` `round` | `data-radius` |
| Contraste | `low` `normal` `high` | `data-contrast` |
| Movimiento | `still` `calm` `lively` | `data-motion` |
| Grano | `off` `subtle` `strong` | `data-grain` |

Incluye **presets de fábrica** (p. ej. "Nave", "Día de obra", "Sala", "Monolito"), **plantillas de usuario** persistidas y botón **"Me gusta esta configuración"** (envía la config al desarrollador vía `/api/tweaks-feedback`, fallback no-op sin Resend).

### Contrato de clases CSS (lo que consumen las secciones)

> Fuente de verdad: `app/globals.css`. Los componentes escriben markup contra estas clases; **no** reinventan estilos inline.

- **Globales**: `.wrap`, `.eyebrow`, `.display`, `.section-h`, `.lede`, `.num`, `.mono`, `.rule`, `.btn`, `.btn--accent`, `.btn--solid`.
- **Hero**: `.hero`, `.hero-grid`, `.hero-meta`, `.hero-status`, `.dot-live`, `.hero-visual`, `.hero-scroll`.
- **Nav/Footer**: `.nav`, `.nav-logo`, `.nav-cta`, `.footer`, `.footer-big`.
- **Tarjetas de artista**: `.artist-grid`, `.artist-card`, `.artist-card-media`, `.artist-card-body`, `.artist-tag`.
- **Player de sesión**: `.session-grid`, `.session-card`, `.session-wave`, `.session-play`, `.platform-badge`.
- **Eventos**: `.events-list`, `.event-row`, `.event-date`, `.event-lineup`, `.event-type`.
- **Contacto**: `.ct-grid`, `.ct-form`, `.ct-field`, `.ct-chip`, `.ct-info-row`.
- **Industrial**: `.corrugate`, `.glow`, `.tape` (cinta de obra), `.stencil` (texto plantilla).

(El catálogo completo y comentado vive en `app/globals.css`; este doc es el índice.)

## Decisiones clave documentadas (zonas grises)

- **Slider de matiz como diferenciador**: el cliente pidió "jugar con la paleta en profundidad". El slider `--accent-shift` desplaza el tono del naranja en vivo (ámbar → óxido → rojo-naranja) sin recompilar. Es el control estrella del panel.
- **Glow desacoplado de la paleta**: cualquier paleta puede llevar glow de club. Así "industrial" y "club" no son excluyentes (la estética elegida fue *mezcla*).
- **Hero `deck`** (plato/tornamesa orbital) en lugar del `orbital` genérico de UNLIMITED: aterriza la metáfora en DJ.
- **Claves `backstage.`** (no `unlimited.`): evita colisión de `localStorage` si ambos sitios se abren en el mismo navegador.

## Ficheros clave

| Qué | Dónde |
|---|---|
| Tokens de paleta + variantes + tweaks CSS | `app/globals.css` |
| Estado Tweaks + persistencia + presets + boot script | `components/tweaks/provider.tsx` |
| Panel Tweaks (UI, slider, presets, "me gusta") | `components/tweaks/panel.tsx` |
| Arte SVG industrial | `components/art/*.tsx` |

## Pendiente / no implementado

- Posible exportación de la paleta elegida a un `.css`/JSON para producción final.
- Más presets de fábrica si el cliente pide afinar.

## Referencias cruzadas

- **Branding de referencia (origen del Tweaks Pro)**: [`../../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md`](../../UNLIMITED_AI_BRAIN/compartido/03-imagen-de-marca.md).
- **Arquitectura**: [`01-arquitectura.md`](01-arquitectura.md).
- **Imágenes**: [`../IMAGENES.md`](../IMAGENES.md).
