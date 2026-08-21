"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({
  work,
  priority = false,
}: {
  work: Work;
  priority?: boolean;
}) {
  const { lang } = useLanguage();

  return (
    <Link
      href={`/works/${work.slug}`}
      scroll
      className="group relative mb-1 block w-full break-inside-avoid overflow-hidden bg-[#f5f5f5]"
    >
      <div className="relative w-full overflow-hidden">
        {work.thumbnailType === "video" ? (
          <video
            src={work.thumbnail}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            aria-label={work.title[lang]}
            className="block h-auto w-full bg-[#f5f5f5] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src={work.thumbnail}
            alt={work.title[lang]}
            width={1200}
            height={1600}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            quality={75}
            sizes="
              (max-width: 767px) calc(100vw - 8px),
              (max-width: 1023px) calc(50vw - 6px),
              calc(33.333vw - 6px)
            "
            className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h2 className="whitespace-pre-line px-4 text-center text-[22px] font-medium tracking-[0.03em] text-white sm:text-2xl">
            {work.title[lang]}
          </h2>
        </div>
      </div>
    </Link>
  );
}
