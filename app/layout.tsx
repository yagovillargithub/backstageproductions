import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { TweaksProvider, TWEAKS_BOOT_SCRIPT } from "@/components/tweaks/provider";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Backstage Records — Sesiones de música electrónica · Madrid",
    template: "%s — Backstage Records",
  },
  description:
    "Estudio de grabación, edición y promoción de sesiones de música electrónica en Madrid. Grabamos en audio y vídeo, editamos con criterio y publicamos en YouTube, SoundCloud y plataformas de sets.",
  keywords: [
    "estudio de grabación",
    "sesiones de DJ",
    "música electrónica",
    "techno",
    "house",
    "vídeo",
    "promoción",
    "Madrid",
  ],
  authors: [{ name: "Backstage Records" }],
  creator: "Backstage Records",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Backstage Records",
    title: "Backstage Records — Sesiones de música electrónica · Madrid",
    description:
      "Grabamos, editamos y promocionamos sesiones de DJ en audio y vídeo. Estudio en Madrid.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Backstage Records — Sesiones de música electrónica · Madrid",
    description:
      "Grabamos, editamos y promocionamos sesiones de DJ en audio y vídeo. Estudio en Madrid.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14110d" },
    { media: "(prefers-color-scheme: light)", color: "#ece8e1" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint script — applies persisted tweaks before first frame to
            prevent FOUC. Inline so it runs synchronously before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: TWEAKS_BOOT_SCRIPT }} />
      </head>
      <body>
        <TweaksProvider>{children}</TweaksProvider>
      </body>
    </html>
  );
}
