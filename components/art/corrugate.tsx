import { cn } from "@/lib/utils";

/**
 * Banda separadora de chapa corrugada: perfil ondulado repetido en pattern,
 * con un segundo trazo desplazado que simula el grosor de la chapa.
 * Sin viewBox para que la densidad de onda no se estire con el ancho;
 * pensada para un contenedor de ~48px de alto. Color vía currentColor.
 */
export function Corrugate({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" className={cn(className)} aria-hidden="true">
      <defs>
        <pattern id="bsr-corrugate-pat" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M0 34 C12 34 12 14 24 14 C36 14 36 34 48 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.85"
          />
          <path
            d="M0 26 C12 26 12 6 24 6 C36 6 36 26 48 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bsr-corrugate-pat)" />
    </svg>
  );
}
