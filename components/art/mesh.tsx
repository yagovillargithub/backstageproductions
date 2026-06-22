import { cn } from "@/lib/utils";

/**
 * Malla metálica expandida (rombos + remache) como fondo de sección.
 * Sin viewBox: el pattern userSpaceOnUse mantiene la densidad del tile
 * independientemente del tamaño del contenedor. Color vía currentColor;
 * la sección controla intensidad con `color` y `opacity` en CSS.
 */
export function Mesh({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" className={cn(className)} aria-hidden="true">
      <defs>
        <pattern id="bsr-mesh-pat" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M14 0 L28 14 L14 28 L0 14 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <circle cx="14" cy="14" r="1.2" fill="currentColor" fillOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bsr-mesh-pat)" />
    </svg>
  );
}
