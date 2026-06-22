import { cn, seededHash } from "@/lib/utils";

/**
 * Póster determinista on-brand. Si `image` existe la usa como cover (drop-in
 * de `public/img/`); si no, genera un SVG industrial cuya composición deriva
 * íntegramente de `seededHash(seed)` — mismo seed, mismo arte, en servidor y
 * cliente. Los colores son CSS vars para que el panel Tweaks lo repinte vivo.
 * El contenedor padre define la caja (aspect-ratio 4/5); el póster la llena.
 */
export function Poster({
  seed,
  title,
  kind = "session",
  image,
  className,
}: {
  seed: string;
  title?: string;
  kind?: "artist" | "session" | "event";
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- raster drop-in opcional de dimensiones desconocidas; next/image exigiría width/height
      <img
        src={image}
        alt={title ?? ""}
        loading="lazy"
        className={cn(className)}
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  const r = (salt: string) => seededHash(`${seed}:${salt}`);
  const round = (n: number) => Math.round(n * 10) / 10;
  const uid = `bsr-${seed.replace(/[^a-zA-Z0-9]/g, "") || Math.floor(r("uid") * 1e6)}`;
  const serial = `BSR-${100 + Math.floor(r("serial") * 900)}`;
  const t = title?.toUpperCase();

  const a11y = title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);

  // Banda corrugada decorativa: 16 lamas inclinadas, una "caliente" en accent.
  const bandTop = r("bandside") > 0.45;
  const bandY = bandTop ? 48 : 760;
  const hotRidge = Math.floor(r("hot") * 16);
  const ridges = Array.from({ length: 16 }, (_, i) => (
    <path
      key={i}
      d={`M${24 + i * 47} ${bandY} h22 l-12 84 h-22 Z`}
      fill={i === hotRidge ? "var(--accent)" : "var(--fg-faint)"}
      opacity={i === hotRidge ? 0.9 : 0.22}
    />
  ));

  return (
    <svg
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn(className)}
      style={{ display: "block", width: "100%", height: "100%" }}
      {...a11y}
    >
      <defs>
        <pattern id={`${uid}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="var(--rule)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="1000" fill="var(--bg-2)" />
      <rect width="800" height="1000" fill={`url(#${uid}-grid)`} opacity="0.5" />
      <rect x="16" y="16" width="768" height="968" fill="none" stroke="var(--rule)" strokeWidth="2" />

      {ridges}

      {kind === "session" && <SessionArt r={r} round={round} />}
      {kind === "artist" && <ArtistArt r={r} round={round} uid={uid} />}
      {kind === "event" && <EventArt r={r} title={t} />}

      {/* Marginalia común: serie, marca vertical, tick de registro */}
      <text
        x="760"
        y="966"
        textAnchor="end"
        fontFamily="var(--f-mono)"
        fontSize="20"
        letterSpacing="4"
        fill="var(--fg-faint)"
      >
        {serial}
      </text>
      <text
        transform="rotate(-90 44 500)"
        x="44"
        y="500"
        textAnchor="middle"
        fontFamily="var(--f-mono)"
        fontSize="15"
        letterSpacing="7"
        fill="var(--fg-faint)"
      >
        BACKSTAGE PRODUCTIONS — MADRID
      </text>
      <path d="M740 40 h20 M750 30 v20" stroke="var(--accent)" strokeWidth="2" />

      {t && kind !== "event" && (
        <text
          x="64"
          y="924"
          fontFamily="var(--f-display)"
          fontSize={Math.max(34, Math.min(76, Math.floor(860 / Math.max(7, t.length))))}
          letterSpacing="2"
          fill="var(--fg)"
        >
          {t}
        </text>
      )}
    </svg>
  );
}

/** Vinilo con surcos + tira de onda: arte para sesiones. */
function SessionArt({
  r,
  round,
}: {
  r: (salt: string) => number;
  round: (n: number) => number;
}) {
  const cx = round(400 + (r("cx") - 0.5) * 140);
  const cy = round(400 + (r("cy") - 0.5) * 110);
  const rad = round(230 + r("rad") * 70);
  const grooveStep = (rad - 80) / 8;
  const arcStart = round(r("arc") * 360);
  const circ = round(2 * Math.PI * rad);

  return (
    <g>
      <circle cx={cx} cy={cy} r={rad} fill="var(--bg)" stroke="var(--fg-dim)" strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={round(rad - 16 - i * grooveStep)}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1.5"
          opacity={0.4 + r(`g${i}`) * 0.5}
        />
      ))}
      {/* Segmento de surco "iluminado" en accent, posición por seed */}
      <circle
        cx={cx}
        cy={cy}
        r={rad}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeDasharray={`${round(circ * 0.16)} ${circ}`}
        transform={`rotate(${arcStart} ${cx} ${cy})`}
      />
      <circle cx={cx} cy={cy} r="58" fill="var(--accent)" />
      <circle cx={cx} cy={cy} r="7" fill="var(--bg-2)" />

      {/* Tira de onda al pie del disco */}
      <g>
        {Array.from({ length: 30 }, (_, i) => {
          const h = round(14 + r(`w${i}`) * 80);
          return (
            <rect
              key={i}
              x={120 + i * 19}
              y={round(792 - h / 2)}
              width="9"
              height={h}
              rx="2"
              fill={r(`wa${i}`) > 0.82 ? "var(--accent)" : "var(--fg-dim)"}
              opacity={r(`wa${i}`) > 0.82 ? 1 : 0.7}
            />
          );
        })}
      </g>
    </g>
  );
}

/** Retrato abstracto geométrico: arte para artistas. */
function ArtistArt({
  r,
  round,
  uid,
}: {
  r: (salt: string) => number;
  round: (n: number) => number;
  uid: string;
}) {
  const cx = round(400 + (r("cx") - 0.5) * 120);
  const cy = round(380 + (r("cy") - 0.5) * 80);
  const headR = round(140 + r("head") * 60);
  const eyeA = round(r("eye") * 360);
  const lines = 1 + Math.floor(r("lines") * 3);

  return (
    <g>
      <clipPath id={`${uid}-head`}>
        <circle cx={cx} cy={cy} r={headR} />
      </clipPath>

      {/* Torso trapezoidal en acero, bajo la cabeza */}
      <path
        d={`M${cx - headR - 40} 880 L${cx - 90} ${cy + headR - 24} h180 L${cx + headR + 40} 880 Z`}
        fill="var(--steel)"
        opacity="0.55"
      />

      <circle cx={cx} cy={cy} r={headR} fill="var(--bg)" stroke="var(--fg-dim)" strokeWidth="2" />
      <g clipPath={`url(#${uid}-head)`}>
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={cx - headR}
            y1={round(cy - headR + 14 + i * ((headR * 2 - 20) / 12))}
            x2={cx + headR}
            y2={round(cy - headR + 14 + i * ((headR * 2 - 20) / 12))}
            stroke="var(--steel)"
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            opacity={0.35 + r(`l${i}`) * 0.4}
          />
        ))}
        {/* Cuarto de círculo accent: el "gesto" que diferencia cada retrato */}
        <path
          d={`M${cx} ${cy} L${cx + headR} ${cy} A${headR} ${headR} 0 0 1 ${cx} ${cy + headR} Z`}
          fill="var(--accent)"
          opacity="0.85"
          transform={`rotate(${Math.floor(r("rot") * 4) * 90} ${cx} ${cy})`}
        />
      </g>

      {/* Punto-mirada orbitando el contorno */}
      <circle
        cx={round(cx + Math.cos((eyeA * Math.PI) / 180) * headR)}
        cy={round(cy + Math.sin((eyeA * Math.PI) / 180) * headR)}
        r="11"
        fill="var(--accent)"
      />

      {Array.from({ length: lines }, (_, i) => (
        <line
          key={i}
          x1="64"
          y1={round(180 + r(`fl${i}`) * 560)}
          x2="736"
          y2={round(180 + r(`fl${i}`) * 560)}
          stroke="var(--rule)"
          strokeWidth="1.5"
        />
      ))}
    </g>
  );
}

/** Cartel tipográfico: arte para eventos (la fecha real la pone la sección). */
function EventArt({ r, title }: { r: (salt: string) => number; title?: string }) {
  const initials = (title ?? "BS").replace(/[^A-ZÁÉÍÓÚÑ0-9]/g, "").slice(0, 2) || "BS";
  const tilt = round2((r("tilt") - 0.5) * 6);
  const blockX = 80 + Math.floor(r("block") * 3) * 200;

  return (
    <g>
      <rect x={blockX} y="200" width="240" height="360" fill="var(--accent)" opacity="0.9" />
      <text
        x="400"
        y="560"
        textAnchor="middle"
        fontFamily="var(--f-display)"
        fontSize="420"
        letterSpacing="-10"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="2.5"
        transform={`rotate(${tilt} 400 430)`}
      >
        {initials}
      </text>

      {title && (
        <text
          x="400"
          y="730"
          textAnchor="middle"
          fontFamily="var(--f-display)"
          fontSize={Math.max(36, Math.min(82, Math.floor(900 / Math.max(7, title.length))))}
          letterSpacing="2"
          fill="var(--fg)"
        >
          {title.toUpperCase()}
        </text>
      )}

      <line x1="120" y1="788" x2="680" y2="788" stroke="var(--rule)" strokeWidth="2" />
      <text
        x="400"
        y="836"
        textAnchor="middle"
        fontFamily="var(--f-mono)"
        fontSize="19"
        letterSpacing="6"
        fill="var(--fg-dim)"
      >
        BACKSTAGE RECORDS · MADRID
      </text>
    </g>
  );
}

function round2(n: number) {
  return Math.round(n * 10) / 10;
}
