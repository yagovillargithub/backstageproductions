import { cn, seededHash } from "@/lib/utils";

/**
 * Onda de audio determinista para `.session-wave`: barras centradas en el eje,
 * alturas por seededHash moduladas con una envolvente senoidal para que la
 * "sesión" suba y baje como un set real. fill = currentColor: la sección
 * decide color y tamaño vía CSS.
 */
export function Waveform({
  seed,
  bars = 48,
  className,
}: {
  seed: string;
  bars?: number;
  className?: string;
}) {
  const barW = 4;
  const gap = 3;
  const height = 64;
  const width = bars * (barW + gap) - gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      fill="currentColor"
      className={cn(className)}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => {
        const env = Math.sin((i / Math.max(1, bars - 1)) * Math.PI);
        const amp = Math.min(1, (0.4 + 0.6 * seededHash(`${seed}:${i}`)) * env + 0.08);
        const h = Math.round((6 + amp * (height - 10)) * 10) / 10;
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={Math.round(((height - h) / 2) * 10) / 10}
            width={barW}
            height={h}
            rx="2"
          />
        );
      })}
    </svg>
  );
}
