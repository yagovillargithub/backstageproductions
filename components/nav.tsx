"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/site";

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar al navegar y con Escape; bloquear scroll del fondo mientras está abierto.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav" aria-label="Navegación principal">
        <Link href="/" className="nav-logo" aria-label="Backstage Records — inicio">
          {/* Icono monocromo: hereda el difference del nav igual que el wordmark. */}
          <img className="nav-mark" src="/img/brand/icon-mark-mono.png" alt="" width={24} height={26} />
          <span className="nav-wordmark">
            Backstage <span>Records</span>
          </span>
          <img className="nav-lockup" src="/img/brand/lockup-mark.png" alt="" width={102} height={24} />
        </Link>

        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={cn(isActive(l.href, pathname) && "active")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contacto" className="nav-cta">
          <span className="nav-cta-dot" aria-hidden="true" />
          <span>Grabar sesión</span>
          <span className="nav-cta-arrow" aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      {menuOpen && (
        <>
          <div className="nav-mobile-back" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="nav-mobile" id="nav-mobile-menu">
            <ul>
              {NAV_LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link href={l.href} className={cn(isActive(l.href, pathname) && "active")}>
                    {l.label}
                    <span className="nav-mobile-idx" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contacto" className="btn btn--accent nav-mobile-cta">
              Grabar una sesión <span className="arrow">→</span>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
