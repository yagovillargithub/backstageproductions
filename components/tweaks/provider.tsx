"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Palette = "brecords" | "teco" | "acero" | "club" | "monolito";
export type FontFamily = "editorial" | "modern" | "techno";
/** Presencia y tipo del logo en la barra (data-logo). El cliente lo regula
 *  desde Tweaks: marca = icono + texto, icono = solo el icono puerta-B,
 *  texto = solo el wordmark, lockup = el lockup horizontal completo. */
export type LogoMode = "marca" | "icono" | "texto" | "lockup";
export type HeroVariant = "deck" | "rejilla" | "tipo";
export type Density = "compact" | "normal" | "spacious";
export type Radius = "sharp" | "soft" | "round";
export type AccentIntensity = "subtle" | "normal" | "bold";
export type Contrast = "low" | "normal" | "high";
export type Motion = "still" | "calm" | "lively";
export type Grain = "off" | "subtle" | "strong";
export type Glow = "off" | "soft" | "strong";
export type Texture = "off" | "corrugado" | "hormigon" | "malla";

export interface TweakState {
  palette: Palette;
  logo: LogoMode;
  font: FontFamily;
  dark: boolean;
  heroVariant: HeroVariant;
  density: Density;
  radius: Radius;
  accentIntensity: AccentIntensity;
  contrast: Contrast;
  motion: Motion;
  grain: Grain;
  glow: Glow;
  texture: Texture;
  /** Desplazamiento de matiz del acento en grados, entero −40..40. */
  accentShift: number;
}

export interface SavedPreset {
  /** Unique id (timestamp-based) so we can delete a specific entry. */
  id: string;
  /** Display name — auto-generated if the user didn't type one. */
  name: string;
  /** Snapshot of state at the moment of saving. */
  state: TweakState;
  /** Unix ms — used for ordering. */
  createdAt: number;
}

export const DEFAULTS: TweakState = {
  palette: "brecords",
  logo: "marca",
  font: "editorial",
  dark: true,
  heroVariant: "deck",
  density: "normal",
  radius: "sharp",
  accentIntensity: "normal",
  contrast: "normal",
  motion: "calm",
  grain: "subtle",
  glow: "soft",
  texture: "corrugado",
  accentShift: 0,
};

/**
 * Factory presets — combinaciones curadas para arrancar con criterio.
 * Lo no especificado cae a DEFAULTS.
 */
export const FACTORY_PRESETS: Array<{ id: string; name: string; description: string; state: TweakState }> = [
  {
    id: "factory-nave",
    name: "Nave",
    description: "La identidad de serie — verde Backstage, glow suave, chapa corrugada.",
    state: { ...DEFAULTS },
  },
  {
    id: "factory-oxido",
    name: "Óxido",
    description: "El acento naranja del patrón original, para comparar identidades.",
    state: { ...DEFAULTS, palette: "teco" },
  },
  {
    id: "factory-dia-obra",
    name: "Día de obra",
    description: "Hormigón claro a plena luz, sin glow ni grano. Buena lectura.",
    state: { ...DEFAULTS, palette: "acero", dark: false, glow: "off", texture: "hormigon", grain: "off", radius: "soft" },
  },
  {
    id: "factory-sala",
    name: "Sala",
    description: "Noche de club — neón intenso, malla metálica, movimiento vivo.",
    state: { ...DEFAULTS, palette: "club", glow: "strong", motion: "lively", texture: "malla", density: "compact" },
  },
  {
    id: "factory-monolito",
    name: "Monolito",
    description: "Monocromo de alto contraste, tipografía techno, grano fuerte.",
    state: {
      ...DEFAULTS,
      palette: "monolito",
      font: "techno",
      contrast: "high",
      radius: "sharp",
      texture: "off",
      glow: "off",
      grain: "strong",
    },
  },
];

const STORAGE_KEY = "backstage.tweaks";
const PRESETS_KEY = "backstage.tweaks.presets";

function clampShift(n: unknown): number {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.min(40, Math.max(-40, v)) : 0;
}

/** Normaliza estado venido de localStorage o de presets antiguos. */
function sanitize(s: TweakState): TweakState {
  return { ...s, accentShift: clampShift(s.accentShift) };
}

interface TweaksContextValue {
  state: TweakState;
  setTweak: <K extends keyof TweakState>(key: K, value: TweakState[K]) => void;
  setAll: (next: TweakState) => void;
  reset: () => void;
  presets: SavedPreset[];
  addPreset: (name: string) => SavedPreset;
  removePreset: (id: string) => void;
  applyPreset: (id: string) => void;
}

const TweaksContext = createContext<TweaksContextValue | null>(null);

function applyToHtml(s: TweakState) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.setAttribute("data-palette", s.palette);
  html.setAttribute("data-logo", s.logo);
  html.setAttribute("data-theme", s.dark ? "dark" : "light");
  html.setAttribute("data-font", s.font);
  html.setAttribute("data-hero", s.heroVariant);
  html.setAttribute("data-density", s.density);
  html.setAttribute("data-radius", s.radius);
  html.setAttribute("data-accent-intensity", s.accentIntensity);
  html.setAttribute("data-contrast", s.contrast);
  html.setAttribute("data-motion", s.motion);
  html.setAttribute("data-grain", s.grain);
  html.setAttribute("data-glow", s.glow);
  html.setAttribute("data-texture", s.texture);
  html.style.setProperty("--accent-shift", `${clampShift(s.accentShift)}deg`);
}

function defaultPresetName() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `Mi plantilla · ${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TweaksProvider({ children }: { children: React.ReactNode }) {
  // SSR renders with defaults; the hydration effect replays anything the user
  // previously saved without a flash because both branches share the same
  // data-* keys (just different values).
  const [state, setState] = useState<TweakState>(DEFAULTS);
  const [presets, setPresets] = useState<SavedPreset[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<TweakState>;
        const next = sanitize({ ...DEFAULTS, ...parsed });
        setState(next);
        applyToHtml(next);
      } else {
        applyToHtml(DEFAULTS);
      }
    } catch {
      applyToHtml(DEFAULTS);
    }
    try {
      const rawP = localStorage.getItem(PRESETS_KEY);
      if (rawP) {
        const parsed = JSON.parse(rawP) as SavedPreset[];
        if (Array.isArray(parsed)) setPresets(parsed);
      }
    } catch {
      /* ignore corrupt presets */
    }
  }, []);

  const persistState = useCallback((next: TweakState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* quota exceeded — ignore */
    }
    applyToHtml(next);
  }, []);

  const setTweak = useCallback<TweaksContextValue["setTweak"]>(
    (key, value) => {
      setState((prev) => {
        const next = sanitize({ ...prev, [key]: value });
        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const setAll = useCallback<TweaksContextValue["setAll"]>(
    (next) => {
      const merged = sanitize({ ...DEFAULTS, ...next });
      setState(merged);
      persistState(merged);
    },
    [persistState]
  );

  const reset = useCallback(() => {
    setState(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    applyToHtml(DEFAULTS);
  }, []);

  const persistPresets = useCallback((next: SavedPreset[]) => {
    try {
      localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    } catch {
      /* quota exceeded — drop oldest */
    }
  }, []);

  const addPreset = useCallback<TweaksContextValue["addPreset"]>(
    (name) => {
      const preset: SavedPreset = {
        id: `user-${Date.now().toString(36)}`,
        name: name.trim() || defaultPresetName(),
        state,
        createdAt: Date.now(),
      };
      setPresets((prev) => {
        const next = [preset, ...prev].slice(0, 20); // keep last 20
        persistPresets(next);
        return next;
      });
      return preset;
    },
    [state, persistPresets]
  );

  const removePreset = useCallback<TweaksContextValue["removePreset"]>(
    (id) => {
      setPresets((prev) => {
        const next = prev.filter((p) => p.id !== id);
        persistPresets(next);
        return next;
      });
    },
    [persistPresets]
  );

  const applyPreset = useCallback<TweaksContextValue["applyPreset"]>(
    (id) => {
      const factory = FACTORY_PRESETS.find((p) => p.id === id);
      if (factory) {
        setAll(factory.state);
        return;
      }
      const saved = presets.find((p) => p.id === id);
      if (saved) setAll(saved.state);
    },
    [presets, setAll]
  );

  const value = useMemo<TweaksContextValue>(
    () => ({ state, setTweak, setAll, reset, presets, addPreset, removePreset, applyPreset }),
    [state, setTweak, setAll, reset, presets, addPreset, removePreset, applyPreset]
  );

  return <TweaksContext.Provider value={value}>{children}</TweaksContext.Provider>;
}

export function useTweaks() {
  const ctx = useContext(TweaksContext);
  if (!ctx) throw new Error("useTweaks must be used inside <TweaksProvider>");
  return ctx;
}

/**
 * Pre-hydration script. Runs before React paints so the first frame already
 * has the right palette/theme and there is no FOUC. DEFAULTS se interpola
 * desde la constante real (no se duplica a mano) para que no pueda derivar.
 */
export const TWEAKS_BOOT_SCRIPT = `
(function(){try{var d=${JSON.stringify(DEFAULTS)};var raw=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var s=raw?Object.assign({},d,JSON.parse(raw)):d;var h=document.documentElement;h.setAttribute("data-palette",s.palette);h.setAttribute("data-logo",s.logo);h.setAttribute("data-theme",s.dark?"dark":"light");h.setAttribute("data-font",s.font);h.setAttribute("data-hero",s.heroVariant);h.setAttribute("data-density",s.density);h.setAttribute("data-radius",s.radius);h.setAttribute("data-accent-intensity",s.accentIntensity);h.setAttribute("data-contrast",s.contrast);h.setAttribute("data-motion",s.motion);h.setAttribute("data-grain",s.grain);h.setAttribute("data-glow",s.glow);h.setAttribute("data-texture",s.texture);var n=Math.round(Number(s.accentShift));if(!isFinite(n))n=0;n=Math.min(40,Math.max(-40,n));h.style.setProperty("--accent-shift",n+"deg");}catch(e){}})();
`;
