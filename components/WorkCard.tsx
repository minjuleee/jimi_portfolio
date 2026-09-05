"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const VISIBLE_WORKS_KEY = "work-list-visible-slugs";

/* ========================================
   VIDEO THUMBNAIL
   화면 근처에 왔을 때만 비디오 로드
======================================== */

function VideoThumbnail({
  src,
  label,
  priority,
}: {
  src: string;
  label: string;
  priority: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);

          observer.disconnect();
        }
      },
      {
        // 실제 화면에 나타나기 조금 전에 미리 로드
        rootMargin: "400px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#f5f5f5]"
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-label={label}
          className="block h-auto w-full bg-[#f5f5f5] transition-transform duration-500 ease-out md:group-hover:scale-[1.02]"
        />
      ) : (
        /*
          비디오가 아직 로드되지 않았을 때
          빈 공간이 갑자기 사라지는 것을 방지
        */
        <div className="aspect-[3/4] w-full bg-[#f5f5f5]" />
      )}
    </div>
  );
}

/* ========================================
   WORK CARD
======================================== */

export default function WorkCard({
  work,
  priority = false,
}: {
  work: Work;
  priority?: boolean;
}) {
  const { lang } = useLanguage();
  const [restorePriority, setRestorePriority] = useState(false);

  useLayoutEffect(() => {
    try {
      const visibleSlugs = JSON.parse(
        sessionStorage.getItem(VISIBLE_WORKS_KEY) ?? "[]",
      );

      if (Array.isArray(visibleSlugs) && visibleSlugs.includes(work.slug)) {
        setRestorePriority(true);
      }
    } catch {
      sessionStorage.removeItem(VISIBLE_WORKS_KEY);
    }
  }, [work.slug]);

  const rememberVisibleWorks = () => {
    const visibleSlugs = Array.from(
      document.querySelectorAll<HTMLElement>("[data-work-slug]"),
    )
      .filter((card) => {
        // 모바일/태블릿/데스크톱용으로 중복 렌더된 숨김 카드는 제외한다.
        if (card.getClientRects().length === 0) return false;

        const rect = card.getBoundingClientRect();

        // 화면 바로 위아래의 카드도 함께 준비해 복귀 직후 빈 영역을 줄인다.
        return rect.bottom >= -window.innerHeight && rect.top <= window.innerHeight * 2;
      })
      .map((card) => card.dataset.workSlug)
      .filter((slug): slug is string => Boolean(slug));

    sessionStorage.setItem(VISIBLE_WORKS_KEY, JSON.stringify(visibleSlugs));
  };

  const shouldLoadImmediately = priority || restorePriority;

  return (
    <Link
      href={`/works/${work.slug}`}
      scroll
      data-work-slug={work.slug}
      onClick={rememberVisibleWorks}
      className="group relative mb-1 block w-full break-inside-avoid overflow-hidden bg-[#f5f5f5]"
    >
      <div className="relative w-full overflow-hidden">
        {work.thumbnailType === "video" ? (
          <VideoThumbnail
            src={work.thumbnail}
            label={work.title[lang]}
            priority={shouldLoadImmediately}
          />
        ) : (
          <Image
            src={work.thumbnail}
            alt={work.title[lang]}
            width={1200}
            height={1600}
            priority={shouldLoadImmediately}
            quality={75}
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1023px) 50vw,
              33vw
            "
            className="block h-auto w-full transition-transform duration-500 ease-out md:group-hover:scale-[1.02]"
          />
        )}

        {/* HOVER OVERLAY */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-150 group-active:opacity-100 md:duration-300 md:group-hover:opacity-100">
          <h2 className="whitespace-pre-line px-4 text-center text-[22px] font-medium tracking-[0.03em] text-white sm:text-2xl">
            {work.title[lang]}
          </h2>
        </div>
      </div>
    </Link>
  );
}
