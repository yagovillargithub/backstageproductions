import { cn } from "@/lib/utils";

const CX = 210;
const CY = 218;
const PLATTER_R = 152;

/**
 * Visual del hero "deck": plato/tornamesa minimalista. La rotación es 100% CSS:
 * globals.css anima `.deck-platter` (transform-box: fill-box; transform-origin:
 * center) y, si quiere, balancea `.deck-arm` desde su pivote. Aquí solo geometría.
 */
export function DeckVisual({ className }: { className?: string }) {
  // 24 marcas de estroboscopio en el borde del plato; giran con él.
  const strobeDots = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return {
      x: Math.round((CX + Math.cos(a) * (PLATTER_R - 10)) * 10) / 10,
      y: Math.round((CY + Math.sin(a) * (PLATTER_R - 10)) * 10) / 10,
    };
  });

  return (
    <svg viewBox="0 0 480 420" className={cn("deck", className)} aria-hidden="true">
      {/* Chasis */}
      <rect x="14" y="14" width="452" height="392" fill="none" stroke="var(--rule)" strokeWidth="2" />
      <circle cx="34" cy="34" r="3" fill="var(--fg-faint)" />
      <circle cx="446" cy="34" r="3" fill="var(--fg-faint)" />
      <circle cx="34" cy="386" r="3" fill="var(--fg-faint)" />
      <circle cx="446" cy="386" r="3" fill="var(--fg-faint)" />

      {/* Plato: todo este grupo gira vía CSS */}
      <g className="deck-platter">
        <circle cx={CX} cy={CY} r={PLATTER_R} fill="var(--bg-2)" stroke="var(--fg-dim)" strokeWidth="2.5" />
        {[136, 122, 108, 94, 80].map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="var(--rule)" strokeWidth="1.5" />
        ))}
        <g className="deck-strobe">
          {strobeDots.map((d, i) => (
            <circle key={i} className="deck-dot" cx={d.x} cy={d.y} r="2.5" fill="var(--fg-dim)" />
          ))}
        </g>
        {/* Marca de giro: hace visible la rotación */}
        <rect x={CX - 3} y={CY - PLATTER_R + 18} width="6" height="26" fill="var(--accent)" />
        <circle cx={CX} cy={CY} r="46" fill="var(--accent)" />
        <line x1={CX} y1={CY} x2={CX + 46} y2={CY} stroke="var(--bg)" strokeWidth="3" />
        <circle cx={CX} cy={CY} r="5" fill="var(--bg)" />
      </g>

      {/* Brazo: pivote arriba a la derecha, aguja hacia el surco */}
      <g className="deck-arm">
        <circle cx="402" cy="84" r="17" fill="none" stroke="var(--fg-dim)" strokeWidth="2.5" />
        <rect x="418" y="76" width="26" height="16" fill="var(--fg-dim)" />
        <path
          d="M402 84 L382 152 L324 236"
          fill="none"
          stroke="var(--fg)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="310" y="228" width="22" height="14" fill="var(--fg-dim)" transform="rotate(54 321 235)" />
      </g>

      {/* Pitch fader */}
      <line x1="428" y1="200" x2="428" y2="340" stroke="var(--rule)" strokeWidth="2" />
      <rect x="419" y="256" width="18" height="10" fill="var(--accent)" />

      {/* Start/stop */}
      <circle cx="58" cy="362" r="15" fill="none" stroke="var(--fg-dim)" strokeWidth="2.5" />
      <circle cx="58" cy="362" r="5" fill="var(--accent)" />
    </svg>
  );
}
