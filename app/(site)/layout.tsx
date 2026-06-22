import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CursorBlob } from "@/components/cursor-blob";
import { SmoothScroll } from "@/components/smooth-scroll";
import { RevealController } from "@/components/reveal";
import { TweaksPanel } from "@/components/tweaks/panel";
import { WaFloat } from "@/components/wa-float";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <CursorBlob />
      <Nav />
      <main>{children}</main>
      <Footer />
      <RevealController />
      <TweaksPanel />
      <WaFloat />
    </>
  );
}
