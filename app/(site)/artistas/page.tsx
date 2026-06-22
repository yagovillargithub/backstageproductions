import type { Metadata } from "next";
import { ArtistasHeader } from "@/components/sections/artistas-header";
import { ArtistasRoster } from "@/components/sections/artistas-roster";
import { ArtistasRed } from "@/components/sections/artistas-red";

export const metadata: Metadata = {
  title: "Artistas",
  description:
    "El roster de Backstage Records: residentes e invitados que graban sus sesiones en el estudio de Madrid, y la red de sellos, salas y colectivos por la que circulan.",
  openGraph: {
    title: "Artistas — Backstage Records",
    description:
      "Residentes, invitados y la red de sellos, salas y colectivos que se cruzan en la cabina del estudio.",
    type: "website",
  },
};

export default function ArtistasPage() {
  return (
    <>
      <ArtistasHeader />
      <ArtistasRoster />
      <div className="corrugate" aria-hidden="true" />
      <ArtistasRed />
    </>
  );
}
