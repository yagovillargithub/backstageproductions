import { Marquee } from "@/components/marquee";
import { HERO } from "@/content/site";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeManifesto } from "@/components/sections/home-manifesto";
import { HomeProceso } from "@/components/sections/home-proceso";
import { HomeStats } from "@/components/sections/home-stats";
import { HomeArtistas } from "@/components/sections/home-artistas";
import { HomeSesiones } from "@/components/sections/home-sesiones";
import { HomeEventos } from "@/components/sections/home-eventos";
import { HomeCta } from "@/components/sections/home-cta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee items={HERO.claims} />
      <HomeManifesto />
      <HomeProceso />
      <HomeStats />
      <div className="corrugate" aria-hidden="true" />
      <HomeArtistas />
      <HomeSesiones />
      <HomeEventos />
      <HomeCta />
    </>
  );
}
