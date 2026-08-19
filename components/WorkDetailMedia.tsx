"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";

type WorkDetailMediaProps = {
  work: Work;
};

export default function WorkDetailMedia({ work }: WorkDetailMediaProps) {
  const { lang } = useLanguage();

  if (!work.media || work.media.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0">
      {work.media.map((block, index) => {
        // FULL IMAGE
        if (block.type === "full") {
          return (
            <img
              key={`${block.src}-${index}`}
              src={block.src}
              alt={block.alt?.[lang] ?? ""}
              style={{
                marginTop:
                  block.marginTop !== undefined
                    ? `${block.marginTop}px`
                    : undefined,
              }}
              className={`block h-auto w-full ${
                index > 0 && block.marginTop === undefined ? "mt-1" : ""
              }`}
            />
          );
        }

        // SPLIT IMAGES
        if (block.type === "split") {
          return (
            <div
              key={`split-${index}`}
              className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2"
            >
              {block.items.map((item, itemIndex) => (
                <img
                  key={`${item.src}-${itemIndex}`}
                  src={item.src}
                  alt={item.alt?.[lang] ?? ""}
                  className="block h-full w-full object-cover"
                />
              ))}
            </div>
          );
        }

        // COLLAGE
        if (block.type === "collage") {
          return (
            <div
              key={`collage-${index}`}
              className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-[3fr_2fr]"
            >
              {/* LEFT BIG IMAGE */}
              <div className="overflow-hidden sm:aspect-[3/4]">
                <img
                  src={block.left.src}
                  alt={block.left.alt?.[lang] ?? ""}
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* RIGHT TWO IMAGES */}
              <div className="grid gap-1 sm:grid-rows-2">
                {block.right.map((item, itemIndex) => (
                  <div
                    key={`${item.src}-${itemIndex}`}
                    className="overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt?.[lang] ?? ""}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // CENTER IMAGE
        if (block.type === "center") {
          const imageWidth =
            block.width === "small"
              ? "w-[50%]"
              : block.width === "medium"
                ? "w-[65%]"
                : block.width === "large"
                  ? "w-[85%]"
                  : block.width === "full"
                    ? "w-full"
                    : "w-[74%]";

          return (
            <div
              key={`${block.src}-${index}`}
              className="flex justify-center"
              style={{
                paddingTop: `${block.marginTop ?? 36}px`,
              }}
            >
              <img
                src={block.src}
                alt={block.alt?.[lang] ?? ""}
                className={`block h-auto ${imageWidth}`}
              />
            </div>
          );
        }

        // SECTION TEXT
        if (block.type === "sectionText") {
          return (
            <div
              key={`section-text-${index}`}
              className="mx-auto flex w-full max-w-[780px] flex-col items-center px-6 pb-20 text-center"
              style={{
                paddingTop: `${block.marginTop ?? 80}px`,
              }}
            >
              {block.title && (
                <h2 className="text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#222222]">
                  {block.title[lang]}
                </h2>
              )}

              <p
                className={`text-[15px] font-normal leading-[1.55] tracking-[0.005em] text-[#444444] ${
                  block.title ? "mt-5" : ""
                }`}
              >
                {block.description[lang]}
              </p>
            </div>
          );
        }

        // VIDEO
        if (block.type === "video") {
          const videoWidth =
            block.width === "small"
              ? "w-[60%]"
              : block.width === "medium"
                ? "w-[74%]"
                : block.width === "large"
                  ? "w-[90%]"
                  : block.width === "full"
                    ? "w-full"
                    : "w-[74%]";

          const isGifStyle = block.autoPlay !== false;

          return (
            <div
              key={`${block.src}-${index}`}
              className="flex justify-center pt-9"
            >
              <video
                src={block.src}
                poster={block.poster}
                autoPlay={isGifStyle}
                muted={isGifStyle}
                loop={isGifStyle}
                controls={!isGifStyle}
                playsInline
                preload={isGifStyle ? "auto" : "metadata"}
                className={`block h-auto ${videoWidth}`}
              />
            </div>
          );
        }

        return null;
      })}

      {/* CREDIT */}
      {work.credit && (
        <div className="mx-auto mt-20 w-full max-w-[636px] px-4 pb-16">
          <p className="whitespace-pre-line text-center text-[11px] font-normal leading-[30px] tracking-[0.01em] text-[#555555]">
            {work.credit[lang]}
          </p>
        </div>
      )}
    </section>
  );
}
