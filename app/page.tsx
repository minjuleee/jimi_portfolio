import WorkCard from "@/components/WorkCard";
import { works } from "@/data/works";

export default function HomePage() {
  // ==============================
  // DESKTOP ORDER
  // lg 이상: 기존 3열 순서 유지
  // ==============================
  const desktopColumns = [
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
  // 모바일 1열 순서
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

  // ==============================
  // TABLET ORDER
  // 기본적으로 모바일 순서를
  // 왼쪽 → 오른쪽 순서로 배치
  // ==============================
  const tabletLeft = mobileOrder.filter((_, index) => index % 2 === 0);

  const tabletRight = mobileOrder.filter((_, index) => index % 2 === 1);

  // 왼쪽 마지막 작품
  const lastLeftWork = tabletLeft.at(-1);

  // 왼쪽 마지막 작품을 오른쪽 맨 아래로 이동
  const tabletColumns = [
    tabletLeft.slice(0, -1),
    lastLeftWork ? [...tabletRight, lastLeftWork] : tabletRight,
  ];

  const getWork = (slug: string) => {
    return works.find((work) => work.slug === slug);
  };

  return (
    <main className="pt-[90px]">
      {/* ============================== */}
      {/* MOBILE: 1열 */}
      {/* md 미만에서만 표시 */}
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
      {/* TABLET / SMALL WEB: 2열 */}
      {/* md 이상, lg 미만에서만 표시 */}
      {/* ============================== */}
      <section className="hidden grid-cols-2 items-start gap-[4px] px-[4px] pb-[60px] md:grid lg:hidden">
        {tabletColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex min-w-0 flex-col gap-[1px]">
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

      {/* ============================== */}
      {/* DESKTOP: 기존 3열 */}
      {/* lg 이상에서만 표시 */}
      {/* ============================== */}
      <section className="hidden grid-cols-3 items-start gap-[4px] px-[4px] pb-[60px] lg:grid">
        {desktopColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex min-w-0 flex-col gap-[1px]">
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
