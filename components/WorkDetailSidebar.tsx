"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";

type WorkDetailSidebarProps = {
  work: Work;
};

export default function WorkDetailSidebar({ work }: WorkDetailSidebarProps) {
  const { lang } = useLanguage();

  return (
    <aside className="h-fit lg:sticky lg:top-28">
      <div className="grid grid-cols-[82px_1fr] gap-4">
        {/* TITLE */}
        <h1 className="whitespace-pre-line text-[13px] font-semibold leading-[1.05] tracking-[-0.02em]">
          {work.title[lang]}
        </h1>

        {/* DESCRIPTION */}
        <div>
          {work.description && (
            <p className="text-[11px] leading-[1.22] text-[#222]">
              {work.description[lang]}
            </p>
          )}

          <div className="mt-2 border-t border-black pt-1.5">
            <p className="text-[11px] leading-none">{work.category[lang]}</p>
          </div>
        </div>
      </div>

      {(work.date || work.client) && (
        <div className="mt-2 grid grid-cols-[82px_1fr] gap-4 border-t border-black pt-2">
          {work.date && (
            <p className="text-[11px] leading-none text-[#222]">{work.date}</p>
          )}

          {work.client && (
            <p className="text-[11px] leading-none text-[#222]">
              Client: {work.client}
            </p>
          )}
        </div>
      )}

      {work.credit && (
        <p className="mt-5 text-[11px] leading-[1.3]">{work.credit[lang]}</p>
      )}

      {work.note && (
        <p className="mt-3 text-[11px] leading-[1.3]">{work.note[lang]}</p>
      )}

      {work.externalLinks && work.externalLinks.length > 0 && (
        <div className="mt-5 flex flex-col gap-1">
          {work.externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border-b border-black text-[11px] hover:opacity-50"
            >
              {link.label[lang]}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}
