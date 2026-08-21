"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";
import { useEffect, useRef } from "react";

type WorkDetailMediaProps = {
  work: Work;
};

type VideoBlock = Extract<
  NonNullable<Work["media"]>[number],
  { type: "video" }
>;

type MediaVideoProps = {
  block: VideoBlock;
  index: number;
};

/* ----------------------------------------
   VIDEO
---------------------------------------- */

function MediaVideo({ block, index }: MediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoPlay이 false가 아니면 GIF처럼 반복 재생
  const isGifStyle = block.autoPlay !== false;

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

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isGifStyle) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      if (!video.paused) return;

      video.play().catch(() => {
        // 저전력 모드 등으로 자동재생이 차단되면 무시
      });
    };

    /*
     * 영상이 실제 화면 근처에 왔을 때만 재생한다.
     * 페이지 진입 직후 모든 영상을 재생하지 않게 해서
     * 첫 이미지 로딩을 우선한다.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(video);

    /*
     * 다른 탭에서 돌아왔을 때
     * 현재 보이는 영상만 다시 재생
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        video.pause();
        return;
      }

      const rect = video.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        tryPlay();
      }
    };

    /*
     * Safari 뒤로가기 캐시 복원 대응
     */
    const handlePageShow = () => {
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        tryPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      observer.disconnect();

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      window.removeEventListener("pageshow", handlePageShow);

      video.pause();
    };
  }, [isGifStyle]);

  /*
   * poster가 없는 일반 영상은 첫 프레임 표시
   */
  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video || isGifStyle || block.poster) return;

    try {
      video.currentTime = 0.01;
    } catch {
      // Safari에서 seek가 실패하면 무시
    }
  };

  return (
    <div
      key={`${block.src}-${index}`}
      className="flex min-w-0 justify-center overflow-hidden pt-9"
    >
      <video
        ref={videoRef}
        src={block.src}
        poster={block.poster}
        autoPlay={false}
        muted={isGifStyle}
        loop={isGifStyle}
        controls={!isGifStyle}
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        className={`block h-auto max-w-full ${videoWidth}`}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

/* ----------------------------------------
   MEDIA
---------------------------------------- */

export default function WorkDetailMedia({ work }: WorkDetailMediaProps) {
  const { lang } = useLanguage();

  if (!work.media || work.media.length === 0) {
    return null;
  }

  /*
   * sectionText 또는 video가 먼저 있어도
   * 실제 첫 번째 이미지 블록을 찾는다.
   */
  const firstImageIndex = work.media.findIndex(
    (block) =>
      block.type === "full" ||
      block.type === "split" ||
      block.type === "collage" ||
      block.type === "center",
  );

  return (
    <section className="min-w-0 overflow-x-hidden">
      {work.media.map((block, index) => {
        const isFirstImageBlock = index === firstImageIndex;

        /* ----------------------------------------
           FULL IMAGE
        ---------------------------------------- */

        if (block.type === "full") {
          return (
            <img
              key={`${block.src}-${index}`}
              src={block.src}
              alt={block.alt?.[lang] ?? ""}
              loading={isFirstImageBlock ? "eager" : "lazy"}
              decoding={isFirstImageBlock ? "sync" : "async"}
              fetchPriority={isFirstImageBlock ? "high" : "auto"}
              draggable={false}
              style={{
                marginTop:
                  block.marginTop !== undefined
                    ? `${block.marginTop}px`
                    : undefined,
              }}
              className={`block h-auto w-full max-w-full ${
                index > 0 && block.marginTop === undefined ? "mt-1" : ""
              }`}
            />
          );
        }

        /* ----------------------------------------
           SPLIT IMAGES
        ---------------------------------------- */

        if (block.type === "split") {
          return (
            <div
              key={`split-${index}`}
              className="mt-1 grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-2"
            >
              {block.items.map((item, itemIndex) => {
                const isFirstSplitImage = isFirstImageBlock && itemIndex === 0;

                return (
                  <div
                    key={`${item.src}-${itemIndex}`}
                    className="min-w-0 overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt?.[lang] ?? ""}
                      loading={isFirstSplitImage ? "eager" : "lazy"}
                      decoding={isFirstSplitImage ? "sync" : "async"}
                      fetchPriority={isFirstSplitImage ? "high" : "auto"}
                      draggable={false}
                      className="
                        block
                        h-auto
                        w-full
                        max-w-full
                        sm:h-full
                        sm:object-cover
                      "
                    />
                  </div>
                );
              })}
            </div>
          );
        }

        /* ----------------------------------------
           COLLAGE
        ---------------------------------------- */

        if (block.type === "collage") {
          return (
            <div
              key={`collage-${index}`}
              className="
                mt-1
                grid
                min-w-0
                grid-cols-1
                gap-1
                sm:grid-cols-[3fr_2fr]
              "
            >
              {/* LEFT BIG IMAGE */}
              <div className="min-w-0 overflow-hidden sm:aspect-[3/4]">
                <img
                  src={block.left.src}
                  alt={block.left.alt?.[lang] ?? ""}
                  loading={isFirstImageBlock ? "eager" : "lazy"}
                  decoding={isFirstImageBlock ? "sync" : "async"}
                  fetchPriority={isFirstImageBlock ? "high" : "auto"}
                  draggable={false}
                  className="
                    block
                    h-auto
                    w-full
                    max-w-full
                    sm:h-full
                    sm:object-cover
                  "
                />
              </div>

              {/* RIGHT TWO IMAGES */}
              <div className="grid min-w-0 gap-1 sm:grid-rows-2">
                {block.right.map((item, itemIndex) => (
                  <div
                    key={`${item.src}-${itemIndex}`}
                    className="min-w-0 overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt?.[lang] ?? ""}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="auto"
                      draggable={false}
                      className="
                          block
                          h-auto
                          w-full
                          max-w-full
                          sm:h-full
                          sm:object-cover
                        "
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        /* ----------------------------------------
           CENTER IMAGE
        ---------------------------------------- */

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
              className="flex min-w-0 justify-center overflow-hidden"
              style={{
                paddingTop: `${block.marginTop ?? 36}px`,
              }}
            >
              <img
                src={block.src}
                alt={block.alt?.[lang] ?? ""}
                loading={isFirstImageBlock ? "eager" : "lazy"}
                decoding={isFirstImageBlock ? "sync" : "async"}
                fetchPriority={isFirstImageBlock ? "high" : "auto"}
                draggable={false}
                className={`block h-auto max-w-full ${imageWidth}`}
              />
            </div>
          );
        }

        /* ----------------------------------------
           SECTION TEXT
        ---------------------------------------- */

        if (block.type === "sectionText") {
          return (
            <div
              key={`section-text-${index}`}
              className="
                mx-auto
                flex
                w-full
                max-w-[780px]
                flex-col
                items-center
                px-6
                pb-20
                text-center
              "
              style={{
                paddingTop: `${block.marginTop ?? 80}px`,
              }}
            >
              {block.title && (
                <h2
                  className="
                    text-[19px]
                    font-semibold
                    leading-[1.3]
                    tracking-[-0.01em]
                    text-[#222222]
                  "
                >
                  {block.title[lang]}
                </h2>
              )}

              <p
                className={`
                  text-[15px]
                  font-normal
                  leading-[1.55]
                  tracking-[0.005em]
                  text-[#444444]
                  ${block.title ? "mt-5" : ""}
                `}
              >
                {block.description[lang]}
              </p>
            </div>
          );
        }

        /* ----------------------------------------
           VIDEO
        ---------------------------------------- */

        if (block.type === "video") {
          return (
            <MediaVideo
              key={`${block.src}-${index}`}
              block={block}
              index={index}
            />
          );
        }

        return null;
      })}

      {/* ----------------------------------------
          CREDIT
      ---------------------------------------- */}

      {work.credit && (
        <div className="mx-auto mt-20 w-full max-w-[636px] px-4 pb-16">
          <p
            className="
              whitespace-pre-line
              text-center
              text-[11px]
              font-normal
              leading-[30px]
              tracking-[0.01em]
              text-[#555555]
            "
          >
            {work.credit[lang]}
          </p>
        </div>
      )}
    </section>
  );
}
