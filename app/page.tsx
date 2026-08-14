import WorkCard from "@/components/WorkCard";
import { works } from "@/data/works";

export default function HomePage() {
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

  const getWork = (slug: string) => {
    return works.find((work) => work.slug === slug);
  };

  return (
    <main className="pt-[90px]">
      <section className="grid grid-cols-1 gap-[4px] px-[4px] pb-[60px] sm:grid-cols-2 lg:grid-cols-3">
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
