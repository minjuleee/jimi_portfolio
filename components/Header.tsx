"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAV_LINKS = [
  {
    label: "Work",
    href: "/",
  },
  {
    label: "Drawing",
    href: "/drawing/coming-soon",
  },
  {
    label: "About",
    href: "/about",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jimiieeee_/",
    icon: FaInstagram,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jimi-lee-5366b43b6/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:jimileedesign@gmail.com",
    icon: FaEnvelope,
    external: false,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          {/* LOGO */}
          <Link
            href="/"
            className="text-[22px] font-medium leading-none tracking-[-0.03em]"
          >
            JIMI LEE
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 text-[20px] font-extrabold leading-none text-black md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-opacity hover:opacity-50"
              >
                {item.label}
              </Link>
            ))}

            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="transition-opacity hover:opacity-50"
                >
                  <Icon
                    size={22}
                    strokeWidth={item.label === "Instagram" ? 4 : 2.2}
                  />
                </a>
              );
            })}
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-8 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span className="block h-[2px] w-8 rounded-full bg-black" />
            <span className="block h-[2px] w-8 rounded-full bg-black" />
            <span className="block h-[2px] w-8 rounded-full bg-black" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute right-5 top-6 flex h-9 w-9 items-center justify-center"
        >
          <span className="absolute h-[2px] w-9 rotate-45 bg-black" />
          <span className="absolute h-[2px] w-9 -rotate-45 bg-black" />
        </button>

        <div className="flex h-full flex-col">
          {/* MAIN MENU */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-9">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[40px] font-medium uppercase leading-none tracking-[-0.04em] transition-opacity hover:opacity-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-7 pb-12">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  onClick={() => setMenuOpen(false)}
                  className="transition-opacity hover:opacity-50"
                >
                  <Icon
                    size={22}
                    strokeWidth={item.label === "Instagram" ? 4 : 2.2}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
