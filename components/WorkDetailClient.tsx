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
    // 브라우저가 이전 프로젝트의 스크롤 위치를
    // 자동으로 복원하지 않도록 설정
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    // 프로젝트 상세페이지 진입 시 항상 최상단으로 이동
    window.scrollTo(0, 0);

    // Next.js / 모바일 브라우저에서 스크롤 복원이
    // 조금 늦게 실행되는 경우를 한 번 더 방지
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
          px-5
          pb-28
          pt-12
          lg:grid-cols-[230px_minmax(0,1fr)]
          lg:gap-7
          lg:px-6
          lg:pt-16
        "
      >
        <WorkDetailSidebar work={work} />

        <WorkDetailMedia work={work} />
      </section>
    </main>
  );
}
