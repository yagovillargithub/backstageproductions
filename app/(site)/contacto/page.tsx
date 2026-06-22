import type { Metadata } from "next";
import { ContactoIntro } from "@/components/sections/contacto-intro";
import { ContactoForm } from "@/components/sections/contacto-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué quieres grabar: tipo de sesión, formato y plazo. Respondemos en menos de 24 horas laborables por email o WhatsApp.",
  openGraph: {
    title: "Contacto — Backstage Records",
    description:
      "Grabación, edición y promoción de sesiones de música electrónica en Madrid. Escríbenos y te respondemos en menos de 24 horas laborables.",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <section className="ct-hero">
      <div className="wrap ct-grid">
        <ContactoIntro />
        <ContactoForm />
      </div>
    </section>
  );
}
