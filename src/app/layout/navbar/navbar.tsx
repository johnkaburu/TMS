"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, TrainFront, X } from "lucide-react";
import { BRAND } from "@/lib/railData";
import "./Navbar.scss";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/timetable", label: "Timetable" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${open ? "navbar--open" : ""}`}>
      <nav className="navbar__container" aria-label="Main">
        <Link href="/" className="navbar__logo" aria-label={`${BRAND.name} home`}>
          <span className="navbar__logo-mark"><TrainFront size={18} /></span>
          {BRAND.name}
        </Link>

        <ul className="navbar__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={isActive(l.href) ? "is-active" : ""} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/booking" className="btn btn--primary btn--sm navbar__cta">
          Book now <ArrowRight size={15} className="btn__arrow" />
        </Link>

        <button
          type="button"
          className="navbar__menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div id="mobile-menu" className="navbar__mobile" hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : ""}>
            {l.label}
          </Link>
        ))}
        <Link href="/booking" className="btn btn--primary btn--block">
          Book now <ArrowRight size={16} className="btn__arrow" />
        </Link>
      </div>
    </header>
  );
}
