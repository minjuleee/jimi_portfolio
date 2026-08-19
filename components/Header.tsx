import Link from "next/link";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAV_LINKS = [
  {
    label: "Work",
    href: "/",
  },
  {
    label: "Drawing",
    href: "/drawing",
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
  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-[22px] font-medium leading-none tracking-[-0.03em]"
        >
          JIMI LEE
        </Link>

        <nav className="flex items-center gap-5 text-[18px] font-extrabold leading-none text-black sm:gap-7 sm:text-[20px]">
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
      </div>
    </header>
  );
}
