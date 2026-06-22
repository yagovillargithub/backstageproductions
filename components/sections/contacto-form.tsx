"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactInput,
  FORMAT_LABELS,
  TIMELINE_LABELS,
} from "@/lib/schemas";
import { cn, waLink } from "@/lib/utils";

/* Opciones de interés — espejo de content/services.ts en versión corta de
   chip, más el caso "evento" que no es un servicio de catálogo. El valor
   viaja tal cual al email del estudio, por eso es la frase completa. */
const INTEREST_OPTIONS = [
  "Grabar sesión solo audio",
  "Grabar audio y vídeo",
  "Edición y post",
  "Mezcla y máster",
  "Promoción y publicación",
  "Colaboración o residencia",
  "Organizar un evento",
];

type FormatValue = NonNullable<ContactInput["format"]>;
type TimelineValue = NonNullable<ContactInput["timeline"]>;

const FORMATS = Object.entries(FORMAT_LABELS) as Array<[FormatValue, string]>;
const TIMELINES = Object.entries(TIMELINE_LABELS) as Array<[TimelineValue, string]>;

type Stage = "idle" | "submitting" | "success" | "error";

const WaIconSm = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: "inline-block", verticalAlign: "-2px" }}
  >
    <path d="M17.6 6.3a8 8 0 0 0-12.6 9.6L4 20l4.2-1.1a8 8 0 0 0 11.5-7.1 8 8 0 0 0-2.1-5.5Zm-5.6 12.3a6.6 6.6 0 0 1-3.4-.9l-.2-.1-2.5.7.7-2.4-.2-.3a6.6 6.6 0 1 1 5.6 3Zm3.6-5c-.2-.1-1.2-.6-1.4-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.2-.4.1a5.4 5.4 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.3a.7.7 0 0 0-.5.2 2 2 0 0 0-.6 1.5c0 .9.6 1.7.7 1.8.1.2 1.3 2 3.2 2.7l1 .4a3 3 0 0 0 1.4-.1c.4-.1 1.2-.5 1.4-1l.1-.9c0-.1-.1-.2-.3-.2Z" />
  </svg>
);

export function ContactoForm() {
  const [stage, setStage] = useState<Stage>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [ref, setRef] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      project: "",
      interest: [],
      format: undefined,
      message: "",
      timeline: undefined,
      website: "",
    },
  });

  const watched = watch();

  // Barra de completitud — cuenta solo los 4 campos obligatorios del schema.
  const progress = useMemo(() => {
    const filled = [
      (watched.name ?? "").trim().length >= 2,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((watched.email ?? "").trim()),
      (watched.interest ?? []).length > 0,
      (watched.message ?? "").trim().length >= 20,
    ].filter(Boolean).length;
    return { n: filled, pct: (filled / 4) * 100 };
  }, [watched.name, watched.email, watched.interest, watched.message]);

  const messageLen = (watched.message ?? "").length;

  const onSubmit = async (data: ContactInput) => {
    setStage("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { ok?: boolean; ref?: string; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "No hemos podido enviar el mensaje. Inténtalo de nuevo.");
        setStage("error");
        return;
      }
      setRef(json.ref ?? "");
      setStage("success");
    } catch {
      setServerError("Problema de red. Inténtalo de nuevo en un momento.");
      setStage("error");
    }
  };

  if (stage === "success") {
    return (
      /* Wrapper neutro: mantiene el éxito en la celda derecha del .ct-grid
         (el grid-column de .ct-success lo mandaría a una fila propia). */
      <div>
        <div className="ct-success">
          <div className="ct-success-mark">
            <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
              <circle cx="30" cy="30" r="29" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M18 31 l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="section-h" style={{ margin: "24px 0 12px" }}>
            Mensaje enviado.
          </h2>
          <p className="lede" style={{ textWrap: "balance" }}>
            Hemos recibido tu consulta. Te respondemos en menos de 24 horas
            laborables con los siguientes pasos y fechas disponibles.
          </p>
          {ref && (
            <p className="mono text-faint small" style={{ marginTop: 24 }}>
              Ref: <span>{ref}</span>
            </p>
          )}
          <Link href="/sesiones" className="btn" style={{ marginTop: 32 }}>
            Ver sesiones del catálogo <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="ct-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      data-reveal
      data-reveal-delay="2"
    >
      {/* Honeypot — oculto para humanos, input real para bots */}
      <div className="ct-honeypot" aria-hidden="true">
        <label htmlFor="ctWebsite">Website</label>
        <input id="ctWebsite" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="ct-progress">
        <div
          className="ct-progress-bar"
          style={{ ["--p" as string]: `${progress.pct}%` } as React.CSSProperties}
        />
        <div className="ct-progress-label mono">
          <span>{progress.n}</span>
          <span className="text-faint"> / 4 completos</span>
        </div>
      </div>

      <Field
        id="ctName"
        label="Nombre o alias"
        num="01"
        error={touchedFields.name ? errors.name?.message : undefined}
      >
        <input id="ctName" type="text" autoComplete="name" required {...register("name")} />
      </Field>

      <Field
        id="ctEmail"
        label="Tu email"
        num="02"
        error={touchedFields.email ? errors.email?.message : undefined}
      >
        <input id="ctEmail" type="email" autoComplete="email" required {...register("email")} />
      </Field>

      <Field
        id="ctProject"
        label="Proyecto, alias artístico o sala"
        num="03"
        hint="opcional"
        error={touchedFields.project ? errors.project?.message : undefined}
      >
        <input id="ctProject" type="text" autoComplete="organization" {...register("project")} />
      </Field>

      <Controller
        control={control}
        name="interest"
        render={({ field }) => (
          <Field id="ctInterest" label="Qué quieres hacer" num="04" error={errors.interest?.message}>
            <div id="ctInterest" className="ct-chips" role="group" aria-label="Tipo de proyecto">
              {INTEREST_OPTIONS.map((opt) => {
                const on = field.value.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={cn("ct-chip", on && "active")}
                    aria-pressed={on}
                    onClick={() => {
                      const next = on
                        ? field.value.filter((v) => v !== opt)
                        : [...field.value, opt];
                      field.onChange(next);
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="format"
        render={({ field }) => (
          <Field id="ctFormat" label="Formato de la sesión" num="05" hint="opcional">
            <div id="ctFormat" className="ct-chips" role="radiogroup" aria-label="Formato de la sesión">
              {FORMATS.map(([val, label]) => {
                const on = field.value === val;
                return (
                  <button
                    key={val}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className={cn("ct-chip", on && "active")}
                    onClick={() => field.onChange(on ? undefined : val)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="timeline"
        render={({ field }) => (
          <Field id="ctTimeline" label="Qué plazo manejas" num="06" hint="opcional">
            <div id="ctTimeline" className="ct-chips" role="radiogroup" aria-label="Plazo deseado">
              {TIMELINES.map(([val, label]) => {
                const on = field.value === val;
                return (
                  <button
                    key={val}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className={cn("ct-chip", on && "active")}
                    onClick={() => field.onChange(on ? undefined : val)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Field>
        )}
      />

      <Field
        id="ctMessage"
        label="Cuéntanos la sesión"
        num="07"
        error={touchedFields.message ? errors.message?.message : undefined}
      >
        <textarea
          id="ctMessage"
          rows={5}
          required
          maxLength={1000}
          placeholder="Estilo del set, duración, referencias de sesiones que te gustan, fechas que tienes en mente..."
          {...register("message")}
        />
        <span className="ct-count mono">
          <span>{messageLen}</span> / 1.000 caracteres
        </span>
      </Field>

      <div className="ct-actions">
        <button type="submit" className="btn btn--accent" disabled={stage === "submitting"}>
          {stage === "submitting" ? "Enviando…" : "Enviar mensaje"}
          {stage !== "submitting" && <span className="arrow">→</span>}
        </button>
        <a
          href={waLink("Hola Backstage, vengo del formulario de la web")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <WaIconSm />
          WhatsApp
        </a>
      </div>

      {serverError && (
        <p role="alert" className="mono small" style={{ color: "var(--err)" }}>
          {serverError}
        </p>
      )}

      <p className="mono text-faint small ct-disclaimer">
        Usamos tus datos únicamente para responder a esta consulta. Sin listas
        de correo ni cesión a terceros.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  num: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, num, hint, error, children }: FieldProps) {
  return (
    <div className={cn("ct-field", error && "has-error")}>
      <label htmlFor={id}>
        <span className="mono">{num}</span> {label}
        {hint && <span className="mono">({hint})</span>}
      </label>
      {children}
      <span className="ct-err" role={error ? "alert" : undefined} data-for={id}>
        {error ?? ""}
      </span>
    </div>
  );
}
