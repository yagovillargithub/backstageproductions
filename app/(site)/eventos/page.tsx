import type { Metadata } from "next";
import { pastEvents, upcomingEvents } from "@/content/events";
import { EventosHeader } from "@/components/sections/eventos-header";
import { EventosAgenda } from "@/components/sections/eventos-agenda";
import { EventosJuntadas } from "@/components/sections/eventos-juntadas";
import { EventosArchivo } from "@/components/sections/eventos-archivo";
import { EventosCta } from "@/components/sections/eventos-cta";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Agenda de Backstage Records en Madrid: grabaciones con aforo abierto, juntadas de escucha, b2b y showcases del sello en salas de la ciudad.",
};

export default function EventosPage() {
  // El corte próximos/archivo se calcula en servidor (en build para la
  // preview estática): el filtro cliente recibe las listas ya ordenadas.
  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <>
      <EventosHeader next={upcoming[0]} />
      <EventosAgenda events={upcoming} />
      <EventosJuntadas />
      <div className="corrugate" aria-hidden="true" />
      <EventosArchivo events={past} />
      <EventosCta />
    </>
  );
}
