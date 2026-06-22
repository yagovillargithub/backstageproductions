import type { Metadata } from "next";
import { SesionesHero } from "@/components/sections/sesiones-hero";
import { SesionesDestacadas } from "@/components/sections/sesiones-destacadas";
import { SesionesCatalogo } from "@/components/sections/sesiones-catalogo";
import { SesionesCta } from "@/components/sections/sesiones-cta";

export const metadata: Metadata = {
  title: "Sesiones",
  description:
    "Catálogo de sesiones grabadas en Backstage Productions: sets de techno, house, electro y más, en audio y vídeo, publicados en YouTube y SoundCloud.",
};

export default function SesionesPage() {
  return (
    <>
      <SesionesHero />
      <SesionesDestacadas />
      <div className="corrugate" aria-hidden="true" />
      <SesionesCatalogo />
      <SesionesCta />
    </>
  );
}
