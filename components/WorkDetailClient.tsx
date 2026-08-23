"use client";

import WorkDetailMedia from "@/components/WorkDetailMedia";
import WorkDetailSidebar from "@/components/WorkDetailSidebar";
import type { Work } from "@/data/works";
import { useLayoutEffect } from "react";

type WorkDetailClientProps = {
  work: Work;
};

export default function WorkDetailClient({ work }: WorkDetailClientProps) {
  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    window.scrollTo(0, 0);

    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [work.slug]);

  return (
    <main className="min-h-screen bg-white">
      <section
        className="
          mx-auto
          grid
          w-full
          max-w-[1180px]
          grid-cols-1
          gap-10
          px-0
          pb-28
          pt-12

          lg:grid-cols-[230px_minmax(0,1fr)]
          lg:gap-7
          lg:px-6
          lg:pt-16
        "
      >
        {/* 모바일: 글에만 좌우 20px */}
        {/* 웹 lg 이상: 기존 위치 그대로 */}
        <div className="px-5 lg:px-0">
          <WorkDetailSidebar work={work} />
        </div>

        {/* 모바일: 좌우 padding 없음 */}
        {/* 웹 lg 이상: 부모의 lg:px-6 안에 들어감 */}
        <WorkDetailMedia work={work} />
      </section>
    </main>
  );
}
