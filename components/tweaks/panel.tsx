"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  FACTORY_PRESETS,
  useTweaks,
  type AccentIntensity,
  type Contrast,
  type Density,
  type FontFamily,
  type Glow,
  type Grain,
  type HeroVariant,
  type LogoMode,
  type Motion,
  type Palette,
  type Radius,
  type SavedPreset,
  type Texture,
} from "./provider";

const PALETTES: Array<{ value: Palette; label: string; hero: string; rest: string[] }> = [
  { value: "brecords", label: "Brecords", hero: "#14110d", rest: ["#f2ece1", "#a3cc33"] },
  { value: "teco",     label: "Teco",     hero: "#14110d", rest: ["#f2ece1", "#e8631a"] },
  { value: "acero",    label: "Acero",    hero: "#ece8e1", rest: ["#16130e", "#c4521a"] },
  { value: "club",     label: "Club",     hero: "#0a0a0c", rest: ["#f4f1ea", "#ff6a1a"] },
  { value: "monolito", label: "Monolito", hero: "#0b0b0b", rest: ["#fafafa", "#ff7a2a"] },
];

const LOGOS: Array<{ value: LogoMode; label: string }> = [
  { value: "marca",  label: "Marca" },
  { value: "icono",  label: "Icono" },
  { value: "texto",  label: "Texto" },
  { value: "lockup", label: "Lockup" },
];

const FONTS: Array<{ value: FontFamily; label: string }> = [
  { value: "editorial", label: "Editorial" },
  { value: "modern",    label: "Moderna" },
  { value: "techno",    label: "Techno" },
];

const HEROES: Array<{ value: HeroVariant; label: string }> = [
  { value: "deck",    label: "Deck" },
  { value: "rejilla", label: "Rejilla" },
  { value: "tipo",    label: "Tipo" },
];

const DENSITIES: Array<{ value: Density; label: string }> = [
  { value: "compact",  label: "Compacto" },
  { value: "normal",   label: "Normal" },
  { value: "spacious", label: "Amplio" },
];

const RADIUSES: Array<{ value: Radius; label: string }> = [
  { value: "sharp", label: "Recto" },
  { value: "soft",  label: "Suave" },
  { value: "round", label: "Redondo" },
];

const ACCENT_INTENSITIES: Array<{ value: AccentIntensity; label: string }> = [
  { value: "subtle", label: "Sutil" },
  { value: "normal", label: "Normal" },
  { value: "bold",   label: "Fuerte" },
];

const CONTRASTS: Array<{ value: Contrast; label: string }> = [
  { value: "low",    label: "Bajo" },
  { value: "normal", label: "Normal" },
  { value: "high",   label: "Alto" },
];

const MOTIONS: Array<{ value: Motion; label: string }> = [
  { value: "still",  label: "Quieto" },
  { value: "calm",   label: "Calmo" },
  { value: "lively", label: "Vivo" },
];

const GRAINS: Array<{ value: Grain; label: string }> = [
  { value: "off",    label: "Off" },
  { value: "subtle", label: "Sutil" },
  { value: "strong", label: "Fuerte" },
];

const GLOWS: Array<{ value: Glow; label: string }> = [
  { value: "off",    label: "Off" },
  { value: "soft",   label: "Suave" },
  { value: "strong", label: "Fuerte" },
];

const TEXTURES: Array<{ value: Texture; label: string }> = [
  { value: "off",       label: "Off" },
  { value: "corrugado", label: "Corrugado" },
  { value: "hormigon",  label: "Hormigón" },
  { value: "malla",     label: "Malla" },
];

type SubmitStage = "idle" | "submitting" | "success" | "error";

/** Floating Tweaks panel — FAB + tarjeta con todos los ajustes en vivo.
 * Incluye plantillas (fábrica + usuario) y envío de la configuración
 * favorita al equipo. Se abre cerrado en cada carga, por diseño. */
export function TweaksPanel() {
  const { state, setTweak, reset, presets, addPreset, removePreset, applyPreset } = useTweaks();
  const [open, setOpen] = useState(false);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [stage, setStage] = useState<SubmitStage>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fbName, setFbName] = useState("");
  const [fbNote, setFbNote] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (cardRef.current?.contains(target)) return;
      if (fabRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open]);

  // Reset the submit state when the user changes any tweak — a tweak change
  // invalidates "this is the configuration I liked".
  useEffect(() => {
    if (stage === "success" || stage === "error") setStage("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  async function submitFeedback() {
    setStage("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/tweaks-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state,
          url: typeof window !== "undefined" ? window.location.href : "",
          name: fbName.trim() || undefined,
          note: fbNote.trim() || undefined,
          website: "",
        }),
      });
      const json: { ok?: boolean; ref?: string; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStage("error");
        setErrorMsg(json.error ?? "No se ha podido enviar la configuración.");
        return;
      }
      // Persist locally too — appears in the dropdown immediately.
      addPreset(fbName);
      setFbName("");
      setFbNote("");
      setStage("success");
    } catch {
      setStage("error");
      setErrorMsg("Problema de red. Inténtelo de nuevo.");
    }
  }

  return (
    <>
      <style>{TWEAK_STYLES}</style>
      <button
        ref={fabRef}
        type="button"
        className="twk-fab"
        aria-label="Abrir panel de personalización"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="twk-fab-dot" />
        <span className="twk-fab-lbl mono">Tweaks</span>
      </button>

      {open && (
        <div ref={cardRef} className="twk-panel" role="dialog" aria-label="Panel de tweaks de Backstage">
          <div className="twk-hd">
            <b>Backstage · Tweaks</b>
            <button
              type="button"
              className="twk-x"
              aria-label="Cerrar panel"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="twk-body">
            {/* ── Plantillas (presets) ─────────────────────────────────── */}
            <PresetsDropdown
              open={presetsOpen}
              onOpenChange={setPresetsOpen}
              factory={FACTORY_PRESETS}
              user={presets}
              onApply={(id) => {
                applyPreset(id);
                setPresetsOpen(false);
              }}
              onRemove={removePreset}
            />

            {/* ── Paleta ────────────────────────────────────────────────── */}
            <div className="twk-sect">Paleta</div>
            <div className="twk-chips" role="group" aria-label="Paleta">
              {PALETTES.map((p) => {
                const on = state.palette === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    aria-pressed={on}
                    aria-label={p.label}
                    title={p.label}
                    className={cn("twk-chip", on && "is-on")}
                    style={{ background: p.hero }}
                    onClick={() => setTweak("palette", p.value)}
                  >
                    <span>
                      {p.rest.map((c) => (
                        <i key={c} style={{ background: c }} />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="twk-row twk-row-h">
              <span className="twk-lbl">Modo oscuro</span>
              <button
                type="button"
                role="switch"
                aria-checked={state.dark}
                aria-label="Alternar modo oscuro"
                className={cn("twk-toggle", state.dark && "is-on")}
                onClick={() => setTweak("dark", !state.dark)}
              >
                <i />
              </button>
            </div>

            {/* ── Marca: presencia y tipo del logo en la barra ─────────── */}
            <div className="twk-sect">Marca</div>
            <SegmentedRadio
              label="Logo"
              value={state.logo}
              options={LOGOS}
              onChange={(v) => setTweak("logo", v)}
              compact
            />

            {/* ── Color: matiz en vivo + intensidad + contraste + glow ──── */}
            <div className="twk-sect">Color</div>
            <HueShift value={state.accentShift} onChange={(n) => setTweak("accentShift", n)} />
            <SegmentedRadio
              label="Intensidad"
              value={state.accentIntensity}
              options={ACCENT_INTENSITIES}
              onChange={(v) => setTweak("accentIntensity", v)}
            />
            <SegmentedRadio
              label="Contraste"
              value={state.contrast}
              options={CONTRASTS}
              onChange={(v) => setTweak("contrast", v)}
            />
            <SegmentedRadio
              label="Glow"
              value={state.glow}
              options={GLOWS}
              onChange={(v) => setTweak("glow", v)}
            />

            {/* ── Tipografía + Hero ────────────────────────────────────── */}
            <div className="twk-sect">Tipografía</div>
            <SegmentedRadio
              label="Familia"
              value={state.font}
              options={FONTS}
              onChange={(v) => setTweak("font", v)}
            />

            <div className="twk-sect">Hero</div>
            <SegmentedRadio
              label="Variante"
              value={state.heroVariant}
              options={HEROES}
              onChange={(v) => setTweak("heroVariant", v)}
            />

            {/* ── Layout fino ──────────────────────────────────────────── */}
            <div className="twk-sect">Layout</div>
            <SegmentedRadio
              label="Densidad"
              value={state.density}
              options={DENSITIES}
              onChange={(v) => setTweak("density", v)}
            />
            <SegmentedRadio
              label="Bordes"
              value={state.radius}
              options={RADIUSES}
              onChange={(v) => setTweak("radius", v)}
            />

            {/* ── Materia y sensación ──────────────────────────────────── */}
            <div className="twk-sect">Sensación</div>
            <SegmentedRadio
              label="Textura"
              value={state.texture}
              options={TEXTURES}
              onChange={(v) => setTweak("texture", v)}
              compact
            />
            <SegmentedRadio
              label="Grano"
              value={state.grain}
              options={GRAINS}
              onChange={(v) => setTweak("grain", v)}
            />
            <SegmentedRadio
              label="Movimiento"
              value={state.motion}
              options={MOTIONS}
              onChange={(v) => setTweak("motion", v)}
            />

            {/* ── Acciones inferiores ──────────────────────────────────── */}
            <div className="twk-actions">
              <input
                type="text"
                className="twk-input"
                maxLength={80}
                placeholder="Nombre de la plantilla (opcional)"
                aria-label="Nombre de la plantilla"
                value={fbName}
                onChange={(e) => setFbName(e.target.value)}
              />
              <textarea
                className="twk-input twk-input--area"
                maxLength={500}
                placeholder="Nota para el equipo (opcional)"
                aria-label="Nota para el equipo"
                value={fbNote}
                onChange={(e) => setFbNote(e.target.value)}
              />
              <button
                type="button"
                className={cn(
                  "twk-btn-primary",
                  stage === "submitting" && "is-loading",
                  stage === "success" && "is-success",
                  stage === "error" && "is-error"
                )}
                onClick={submitFeedback}
                disabled={stage === "submitting"}
                aria-live="polite"
              >
                {stage === "idle" && (
                  <>
                    <span className="twk-heart" aria-hidden="true">♥</span>
                    Me gusta esta configuración
                  </>
                )}
                {stage === "submitting" && (
                  <>
                    <span className="twk-spin" aria-hidden="true" />
                    Enviando…
                  </>
                )}
                {stage === "success" && (
                  <>
                    <span aria-hidden="true">✓</span>
                    Guardada y enviada
                  </>
                )}
                {stage === "error" && (
                  <>
                    <span aria-hidden="true">!</span>
                    Reintentar
                  </>
                )}
              </button>
              <p className="twk-help">
                Se envía al equipo y queda guardada como plantilla aquí mismo.
              </p>
              {stage === "error" && errorMsg && (
                <p className="twk-err" role="alert">
                  {errorMsg}
                </p>
              )}
              <button type="button" className="twk-btn-secondary" onClick={reset}>
                Restablecer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Slider de matiz del acento (−40..40 grados) con vista previa en vivo:
 * el swatch reproduce la misma fórmula hsl(calc(...)) que --accent-core,
 * así que se actualiza solo cuando el provider escribe --accent-shift. */
function HueShift({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="twk-row">
      <div className="twk-hue-head">
        <label className="twk-lbl" htmlFor="twk-hue">Matiz del acento</label>
        <span className="twk-hue-val">{value > 0 ? `+${value}` : value}°</span>
      </div>
      <div className="twk-hue">
        <span
          className="twk-hue-swatch"
          aria-hidden="true"
          style={{
            background:
              "hsl(calc(var(--accent-h) + var(--accent-shift, 0deg)) var(--accent-s) var(--accent-l))",
          }}
        />
        <input
          id="twk-hue"
          className="twk-hue-range"
          type="range"
          min={-40}
          max={40}
          step={1}
          value={value}
          aria-valuetext={`${value} grados`}
          onChange={(e) => {
            const n = Math.round(e.target.valueAsNumber);
            onChange(Number.isFinite(n) ? Math.min(40, Math.max(-40, n)) : 0);
          }}
        />
        <button
          type="button"
          className="twk-hue-reset"
          aria-label="Volver al matiz original"
          title="Volver al matiz original"
          disabled={value === 0}
          onClick={() => onChange(0)}
        >
          ↺
        </button>
      </div>
    </div>
  );
}

function PresetsDropdown({
  open,
  onOpenChange,
  factory,
  user,
  onApply,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  factory: typeof FACTORY_PRESETS;
  user: SavedPreset[];
  onApply: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      onOpenChange(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onOpenChange]);

  return (
    <div className="twk-presets" ref={ref}>
      <button
        type="button"
        className="twk-presets-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        <span className="twk-presets-icon" aria-hidden="true">▦</span>
        <span>Plantillas</span>
        <span className="twk-presets-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="twk-presets-menu" role="listbox">
          <div className="twk-presets-group">De fábrica</div>
          {factory.map((p) => (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected="false"
              className="twk-presets-item"
              onClick={() => onApply(p.id)}
              title={p.description}
            >
              <span>{p.name}</span>
              <span className="twk-presets-desc">{p.description}</span>
            </button>
          ))}
          {user.length > 0 && (
            <>
              <div className="twk-presets-group">Mis plantillas</div>
              {user.map((p) => (
                <div key={p.id} className="twk-presets-item-row">
                  <button
                    type="button"
                    className="twk-presets-item twk-presets-item--row"
                    onClick={() => onApply(p.id)}
                  >
                    <span>{p.name}</span>
                  </button>
                  <button
                    type="button"
                    className="twk-presets-del"
                    aria-label={`Eliminar ${p.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(p.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </>
          )}
          {user.length === 0 && (
            <div className="twk-presets-empty">
              Pulse <b>Me gusta esta configuración</b> para guardar la actual aquí.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SegmentedRadio<T extends string>({
  label,
  value,
  options,
  onChange,
  compact,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
  /** Reduce el cuerpo de letra — para grupos de 4 opciones largas. */
  compact?: boolean;
}) {
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <div className="twk-row">
      <span className="twk-lbl">{label}</span>
      <div className={cn("twk-seg", compact && "twk-seg--sm")} role="group" aria-label={label}>
        <span
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${options.length})`,
            width: `calc((100% - 4px) / ${options.length})`,
          }}
        />
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const TWEAK_STYLES = `
.twk-fab{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:8px;
  padding:10px 14px;border:1px solid var(--rule);background:rgba(20,17,13,.8);color:var(--fg);
  border-radius:999px;backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);
  cursor:pointer;transition:transform .25s var(--easing),background .25s}
.twk-fab:hover{transform:translateY(-1px)}
.twk-fab-dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}
.twk-fab-lbl{font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase}
[data-theme="light"] .twk-fab{background:rgba(236,232,225,.85)}

.twk-panel{position:fixed;right:18px;bottom:64px;z-index:61;width:300px;max-height:calc(100vh - 100px);
  display:flex;flex-direction:column;background:rgba(20,17,13,.92);color:var(--fg);
  -webkit-backdrop-filter:blur(20px) saturate(160%);backdrop-filter:blur(20px) saturate(160%);
  border:1px solid var(--rule);border-radius:14px;
  box-shadow:0 12px 40px rgba(0,0,0,.4);font:11.5px/1.4 var(--f-sans);overflow:hidden;
  animation:twkIn .25s var(--easing)}
@keyframes twkIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
[data-theme="light"] .twk-panel{background:rgba(240,237,231,.94);color:#1b1712}

.twk-panel button:focus-visible,.twk-fab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}

.twk-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 10px 12px 14px;
  border-bottom:1px solid var(--rule)}
.twk-hd b{font-size:12px;font-weight:600;letter-spacing:.02em;font-family:var(--f-mono);text-transform:uppercase}
.twk-x{appearance:none;border:0;background:transparent;color:var(--fg-faint);width:22px;height:22px;
  border-radius:6px;cursor:pointer;font-size:13px;line-height:1}
.twk-x:hover{background:rgba(255,255,255,.05);color:var(--fg)}

.twk-body{padding:10px 14px 14px;display:flex;flex-direction:column;gap:9px;overflow-y:auto;min-height:0}
.twk-sect{font-family:var(--f-mono);font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:var(--fg-faint);padding:8px 0 0;display:flex;align-items:center;gap:8px}
.twk-sect::after{content:"";flex:1;height:1px;background:var(--rule)}
.twk-sect:first-child{padding-top:0}

/* Presets dropdown */
.twk-presets{position:relative}
.twk-presets-trigger{appearance:none;display:flex;align-items:center;gap:8px;width:100%;
  padding:9px 12px;border:1px solid var(--rule);border-radius:9px;background:rgba(255,255,255,.04);
  color:var(--fg);font:inherit;font-family:var(--f-mono);font-size:11px;letter-spacing:.04em;
  cursor:pointer;transition:background .2s,border-color .2s,transform .15s}
[data-theme="light"] .twk-presets-trigger{background:rgba(0,0,0,.04)}
.twk-presets-trigger:hover{border-color:var(--fg-dim)}
.twk-presets-trigger:active{transform:scale(.99)}
.twk-presets-icon{color:var(--accent);font-size:13px;line-height:1}
.twk-presets-trigger>span:nth-child(2){flex:1;text-align:left;text-transform:uppercase}
.twk-presets-caret{color:var(--fg-faint);font-size:10px;transition:transform .2s}
.twk-presets-trigger[aria-expanded="true"] .twk-presets-caret{transform:rotate(180deg)}
.twk-presets-menu{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:5;
  background:rgba(20,17,13,.98);border:1px solid var(--rule);border-radius:10px;
  max-height:280px;overflow-y:auto;padding:6px;
  box-shadow:0 12px 32px rgba(0,0,0,.5);animation:twkIn .18s var(--easing)}
[data-theme="light"] .twk-presets-menu{background:rgba(240,237,231,.98)}
.twk-presets-group{font-family:var(--f-mono);font-size:9.5px;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;color:var(--fg-faint);padding:8px 8px 4px}
.twk-presets-item{appearance:none;display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%;
  padding:7px 8px;border:0;background:transparent;color:var(--fg);font:inherit;font-size:11.5px;
  text-align:left;cursor:pointer;border-radius:6px;transition:background .12s}
.twk-presets-item:hover{background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}
.twk-presets-item>span:first-child{font-weight:500}
.twk-presets-desc{font-family:var(--f-mono);font-size:9.5px;color:var(--fg-faint);letter-spacing:.02em}
.twk-presets-item-row{display:flex;align-items:center}
.twk-presets-item--row{flex:1}
.twk-presets-del{appearance:none;border:0;background:transparent;color:var(--fg-faint);width:24px;height:24px;
  border-radius:6px;cursor:pointer;font-size:11px;line-height:1;margin-right:4px}
.twk-presets-del:hover{background:rgba(255,80,80,.12);color:#ff7e6b}
.twk-presets-empty{padding:10px 10px 8px;font-family:var(--f-mono);font-size:10px;color:var(--fg-faint);line-height:1.5}
.twk-presets-empty b{color:var(--accent);font-weight:600}

.twk-row{display:flex;flex-direction:column;gap:6px}
.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
.twk-lbl{font-size:11.5px;color:var(--fg-dim)}

.twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;background:rgba(255,255,255,.06);user-select:none}
[data-theme="light"] .twk-seg{background:rgba(0,0,0,.06)}
.twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;background:var(--fg);
  transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
.twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;background:transparent;
  color:var(--fg-dim);font:inherit;font-weight:500;min-height:24px;border-radius:6px;cursor:pointer;
  padding:4px 6px;line-height:1.2;font-size:11px}
.twk-seg button[aria-pressed="true"]{color:var(--bg)}
.twk-seg--sm button{font-size:9.5px;padding:4px 2px;letter-spacing:0}

.twk-toggle{position:relative;width:34px;height:20px;border:0;border-radius:999px;background:rgba(255,255,255,.15);
  transition:background .15s;cursor:pointer;padding:0}
[data-theme="light"] .twk-toggle{background:rgba(0,0,0,.15)}
.twk-toggle.is-on{background:var(--accent)}
.twk-toggle i{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;
  box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
.twk-toggle.is-on i{transform:translateX(14px)}

.twk-chips{display:flex;gap:6px}
.twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;padding:0;border:0;border-radius:6px;
  overflow:hidden;cursor:pointer;box-shadow:0 0 0 .5px rgba(0,0,0,.2),0 1px 2px rgba(0,0,0,.06);
  transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
.twk-chip:hover{transform:translateY(-1px)}
.twk-chip.is-on{box-shadow:0 0 0 1.5px var(--accent),0 2px 6px rgba(0,0,0,.15)}
.twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;display:flex;flex-direction:column;
  box-shadow:-1px 0 0 rgba(0,0,0,.2)}
.twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.2)}
.twk-chip>span>i:first-child{box-shadow:none}

/* Matiz del acento — slider con vista previa */
.twk-hue-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.twk-hue-val{font-family:var(--f-mono);font-size:10px;color:var(--fg-faint);letter-spacing:.02em}
.twk-hue{display:flex;align-items:center;gap:8px}
.twk-hue-swatch{flex:none;width:22px;height:22px;border-radius:6px;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.15),0 1px 2px rgba(0,0,0,.2)}
[data-theme="light"] .twk-hue-swatch{box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.08)}
.twk-hue-range{flex:1;-webkit-appearance:none;appearance:none;height:8px;border-radius:999px;cursor:pointer;
  background:linear-gradient(90deg,
    hsl(calc(var(--accent-h) - 40deg) var(--accent-s) var(--accent-l)),
    hsl(var(--accent-h) var(--accent-s) var(--accent-l)),
    hsl(calc(var(--accent-h) + 40deg) var(--accent-s) var(--accent-l)))}
.twk-hue-range::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;
  background:var(--fg);border:2px solid var(--bg);box-shadow:0 1px 3px rgba(0,0,0,.4)}
.twk-hue-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
  background:var(--fg);border:2px solid var(--bg);box-shadow:0 1px 3px rgba(0,0,0,.4)}
.twk-hue-range:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.twk-hue-reset{appearance:none;flex:none;width:24px;height:24px;border:1px solid var(--rule);border-radius:6px;
  background:transparent;color:var(--fg-dim);font-size:12px;line-height:1;cursor:pointer;
  transition:color .2s,border-color .2s}
.twk-hue-reset:hover:not(:disabled){color:var(--fg);border-color:var(--fg-dim)}
.twk-hue-reset:disabled{opacity:.35;cursor:default}

/* Bottom actions */
.twk-actions{display:flex;flex-direction:column;gap:8px;padding-top:6px;margin-top:4px;
  border-top:1px solid var(--rule)}
.twk-input{appearance:none;width:100%;padding:8px 10px;border:1px solid var(--rule);border-radius:8px;
  background:rgba(255,255,255,.04);color:var(--fg);font:inherit;font-size:11.5px}
[data-theme="light"] .twk-input{background:rgba(0,0,0,.04)}
.twk-input::placeholder{color:var(--fg-faint)}
.twk-input:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.twk-input--area{min-height:52px;resize:vertical;line-height:1.4}
.twk-btn-primary{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:36px;padding:0 14px;border:0;border-radius:9px;background:var(--accent);color:#16110b;
  font:inherit;font-family:var(--f-mono);font-size:11px;letter-spacing:.04em;text-transform:uppercase;
  font-weight:600;cursor:pointer;transition:background .25s var(--easing),transform .15s,box-shadow .25s;
  box-shadow:0 6px 18px color-mix(in srgb,var(--accent) 22%,transparent)}
.twk-btn-primary:hover{transform:translateY(-1px);box-shadow:0 10px 22px color-mix(in srgb,var(--accent) 32%,transparent)}
.twk-btn-primary:active{transform:translateY(0)}
.twk-btn-primary[disabled]{opacity:.85;cursor:wait}
.twk-btn-primary.is-success{background:#7da66a;color:#0d0d0b;animation:twkPop .4s var(--easing)}
.twk-btn-primary.is-error{background:#d4654a;color:#fff}
@keyframes twkPop{
  0%{transform:scale(1)}
  50%{transform:scale(1.04)}
  100%{transform:scale(1)}
}
.twk-heart{display:inline-block;font-size:13px;line-height:1;color:#16110b}
.twk-btn-primary:hover .twk-heart{animation:twkHeartBeat .8s ease-in-out infinite}
@keyframes twkHeartBeat{
  0%,100%{transform:scale(1)}
  35%{transform:scale(1.25)}
  60%{transform:scale(.96)}
}
.twk-spin{display:inline-block;width:12px;height:12px;border-radius:50%;
  border:1.5px solid currentColor;border-top-color:transparent;animation:twkSpin .7s linear infinite}
@keyframes twkSpin{to{transform:rotate(360deg)}}

.twk-help{font-family:var(--f-mono);font-size:9.5px;color:var(--fg-faint);text-align:center;line-height:1.4;
  letter-spacing:.02em;margin:0}
.twk-err{color:#d4654a;font-family:var(--f-mono);font-size:10px;text-align:center;margin:0}

.twk-btn-secondary{appearance:none;height:28px;padding:0 14px;border:1px solid var(--rule);border-radius:7px;
  background:transparent;color:var(--fg-dim);font:inherit;font-family:var(--f-mono);font-size:11px;
  letter-spacing:.04em;cursor:pointer;transition:color .2s,border-color .2s;width:100%}
.twk-btn-secondary:hover{color:var(--fg);border-color:var(--fg-dim)}
`;
