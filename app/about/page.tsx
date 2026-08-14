"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const contactContent = {
  ko: {
    title: "Contact",
    description:
      "커미션, 협업, 라이선싱 또는 기타 문의가 있다면 편하게 연락 주세요.",
    email: "hello@example.com",
    instagram: "Instagram",
  },
  en: {
    title: "Contact",
    description:
      "For commissions, collaborations, licensing, or other inquiries, please feel free to get in touch.",
    email: "hello@example.com",
    instagram: "Instagram",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = contactContent[lang];

  return (
    <main className="flex min-h-[calc(100vh-100px)] items-start px-5 pb-20 pt-10 sm:px-8 lg:items-center lg:px-12 lg:pb-[100px]">
      <section className="max-w-[720px]">
        <h1 className="mb-7 text-[42px] font-medium tracking-[-0.04em] sm:text-[clamp(42px,6vw,80px)]">
          {t.title}
        </h1>
        <p className="mb-[38px] text-[17px] leading-[1.7] text-[#555] sm:text-xl">
          {t.description}
        </p>
        <div className="flex flex-col gap-3.5">
          <a
            className="w-fit border-b border-black text-lg sm:text-xl"
            href={`mailto:${t.email}`}
          >
            {t.email}
          </a>
          <a
            className="w-fit border-b border-black text-lg sm:text-xl"
            href="https://www.instagram.com/jimiieeee_/"
            target="_blank"
            rel="noreferrer"
          >
            {t.instagram}
          </a>
        </div>
      </section>
    </main>
  );
}
