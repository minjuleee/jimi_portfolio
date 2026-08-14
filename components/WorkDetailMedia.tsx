"use client";

import type { Work } from "@/data/works";

type WorkDetailMediaProps = {
  work: Work;
};

export default function WorkDetailMedia({ work }: WorkDetailMediaProps) {
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
              alt={block.alt?.en ?? ""}
              className={`block h-auto w-full ${index > 0 ? "mt-1" : ""}`}
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
                  alt={item.alt?.en ?? ""}
                  className="block h-full w-full object-cover"
                />
              ))}
            </div>
          );
        }

        // CENTER IMAGE
        if (block.type === "center") {
          return (
            <div
              key={`${block.src}-${index}`}
              className="flex justify-center pt-9"
            >
              <img
                src={block.src}
                alt={block.alt?.en ?? ""}
                className="block h-auto w-[74%]"
              />
            </div>
          );
        }

        // VIDEO
        if (block.type === "video") {
          const videoWidth =
            block.width === "small"
              ? "w-[60%]"
              : block.width === "large"
                ? "w-[90%]"
                : block.width === "full"
                  ? "w-full"
                  : "w-[74%]";

          return (
            <div
              key={`${block.src}-${index}`}
              className="flex justify-center pt-9"
            >
              <video
                src={block.src}
                poster={block.poster}
                controls
                playsInline
                preload="metadata"
                className={`block h-auto ${videoWidth}`}
              />
            </div>
          );
        }

        return null;
      })}
    </section>
  );
}
