import WorkCard from "@/components/WorkCard";
import { works } from "@/data/works";

export default function HomePage() {
  // ==============================
  // DESKTOP ORDER
  // 기존 웹 버전 그대로 유지
  // ==============================
  const columns = [
    // LEFT
    [
      "work-hard-play-heart",
      "korean-christmas-ornament-card",
      "who-is-the-quickest",
      "who-is-the-strongest",
      "dustins-awesome-pack",
    ],

    // CENTER
    [
      "i-want-wing-clothes",
      "merry-christmas-soulmate-tennis-club",
      "who-is-fall-in-love",
      "bustling-gym",
      "find-jiho",
    ],

    // RIGHT
    [
      "hey-jud-2026-ss-product-design",
      "soulmate-tennis-club",
      "who-is-the-winner",
      "animals-are-not-for-sale",
      "lets-clay-sticker",
    ],
  ];

  // ==============================
  // MOBILE ORDER
  // 모바일에서만 적용
  // ==============================
  const mobileOrder = [
    "work-hard-play-heart",
    "hey-jud-2026-ss-product-design",
    "i-want-wing-clothes",
    "korean-christmas-ornament-card",
    "merry-christmas-soulmate-tennis-club",
    "soulmate-tennis-club",
    "who-is-the-quickest",
    "who-is-fall-in-love",
    "who-is-the-winner",
    "who-is-the-strongest",
    "bustling-gym",
    "animals-are-not-for-sale",
    "find-jiho",
    "dustins-awesome-pack",
    "lets-clay-sticker",
  ];

  const getWork = (slug: string) => {
    return works.find((work) => work.slug === slug);
  };

  return (
    <main className="pt-[90px]">
      {/* ============================== */}
      {/* MOBILE */}
      {/* md 미만에서만 보임 */}
      {/* ============================== */}
      <section className="grid grid-cols-1 gap-[1px] px-[4px] pb-[60px] md:hidden">
        {mobileOrder.map((slug, index) => {
          const work = getWork(slug);

          if (!work) return null;

          return (
            <WorkCard key={work.slug} work={work} priority={index === 0} />
          );
        })}
      </section>

      {/* ============================== */}
      {/* DESKTOP */}
      {/* 기존 웹 레이아웃 그대로 */}
      {/* ============================== */}
      <section className="hidden gap-[4px] px-[4px] pb-[60px] md:grid md:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-[1px]">
            {column.map((slug, index) => {
              const work = getWork(slug);

              if (!work) return null;

              return (
                <WorkCard key={work.slug} work={work} priority={index === 0} />
              );
            })}
          </div>
        ))}
      </section>
    </main>
  );
}
