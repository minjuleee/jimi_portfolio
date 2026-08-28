"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAV_LINKS = [
  {
    label: "Work",
    href: "/",
  },
  {
    label: "Others",
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

  const pathname = usePathname();

  // 작품 상세페이지인지 확인
  const isWorkDetail = pathname.startsWith("/works/");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="w-full">
        {/* 
          MOBILE HEADER HEIGHT

          홈:
          h-[66px]

          작품 상세페이지:
          h-[150px]
        */}
        <div
          className={`flex items-start justify-between md:h-auto ${
            isWorkDetail ? "h-[150px]" : "h-[50px]"
          }`}
        >
          {/* LOGO */}
          <div className="ml-2 mt-2 md:ml-0 md:mt-6">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/images/logo.svg"
                alt="JIMI LEE"
                className="h-[100px] w-auto md:h-[180px]"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="mr-12 mt-10 hidden items-center gap-7 text-[20px] font-extrabold leading-none text-green-700 md:flex">
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
            className="mr-5 mt-10 flex h-8 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span className="block h-[2px] w-8 rounded-full bg-green-700" />
            <span className="block h-[2px] w-8 rounded-full bg-green-700" />
            <span className="block h-[2px] w-8 rounded-full bg-green-700" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-white text-green-700 transition-all duration-300 md:hidden ${
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
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center"
        >
          <span className="absolute h-[2px] w-9 rotate-45 bg-green-700" />
          <span className="absolute h-[2px] w-9 -rotate-45 bg-green-700" />
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
