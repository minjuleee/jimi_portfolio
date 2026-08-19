import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="px-6 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-[130px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-6">
        {/* PROFILE IMAGE */}
        <div className="relative w-full lg:max-w-[520px]">
          <Image
            src="/images/about/profile.jpg"
            alt="Jimi Lee"
            width={1200}
            height={1600}
            priority
            className="block h-auto w-full object-cover"
          />
        </div>

        {/* TEXT */}
        <section className="flex flex-col px-0 lg:px-0">
          {/* INTRO */}
          <div className="max-w-[590px]">
            <p className="text-[17px] leading-[1.45] tracking-[-0.02em] text-[#222]">
              Hi, I’m Jimi Lee, an illustrator and designer based between Seoul
              and New York. I create story-driven characters and illustrations,
              bringing ideas and everyday moments to life through playful visual
              storytelling.
            </p>

            <p className="mt-6 text-[16px] leading-[1.55] tracking-[-0.025em] text-[#222]">
              저는 서울과 뉴욕을 기반으로 활동하는 일러스트레이터이자 디자이너
              이지미입니다. 이야기를 바탕으로 한 캐릭터 디자인과
              일러스트레이션을 작업하며, 아이디어와 일상의 순간들을 유쾌한
              비주얼 스토리텔링으로 풀어냅니다.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-16">
            <a
              href="mailto:jimileedesign@gmail.com"
              className="inline-block text-[28px] font-medium leading-none tracking-[-0.025em] transition-opacity hover:opacity-50 sm:text-[30px]"
            >
              jimileedesign@gmail.com
            </a>

            {/* SOCIAL */}
            <div className="mt-5 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/jimiieeee_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/jimi-lee-5366b43b6/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.5h3.8V21H3.3V9.5Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.9v6h-3.8v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.4V9.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
