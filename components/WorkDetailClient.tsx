"use client";

import WorkDetailMedia from "@/components/WorkDetailMedia";
import WorkDetailSidebar from "@/components/WorkDetailSidebar";
import type { Work } from "@/data/works";

type WorkDetailClientProps = {
  work: Work;
};

export default function WorkDetailClient({ work }: WorkDetailClientProps) {
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
