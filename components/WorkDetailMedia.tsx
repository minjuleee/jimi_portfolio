"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Work } from "@/data/works";
import { useEffect, useRef, useState } from "react";

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

  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

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

    if (!video || !isGifStyle || hasError) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      if (!video.paused) return;

      video.play().catch(() => {
        // iPhone Safari 저전력 모드 등에서
        // 자동재생이 막혀도 그냥 무시
      });
    };

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
  }, [isGifStyle, hasError]);

  /*
   * 일반 영상(autoPlay: false)의 경우
   * poster가 없으면 첫 프레임을 보여주기 위해
   * 아주 살짝 앞으로 이동
   */
  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    if (!isGifStyle && !block.poster) {
      try {
        video.currentTime = 0.01;
      } catch {
        // Safari seek 실패 시 무시
      }
    }
  };

  /*
   * 실제 영상 데이터가 준비되었을 때만
   * opacity를 1로 변경
   *
   * => Safari에서 로딩 중 깨진 영상 / 물음표
   * 표시가 노출되는 것 방지
   */
  const handleLoadedData = () => {
    setIsReady(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsReady(true);
  };

  /*
   * iPhone Safari가 MP4를 읽지 못하거나
   * 파일 경로가 잘못된 경우
   * 깨진 미디어 아이콘 대신 아예 숨김
   */
  const handleError = () => {
    setHasError(true);
    setIsReady(false);
  };

  if (hasError) {
    return null;
  }

  return (
    <div
      key={`${block.src}-${index}`}
      className="
        flex
        min-w-0
        justify-center
        overflow-hidden
        pt-9
      "
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
        preload={isGifStyle ? "auto" : "metadata"}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onError={handleError}
        draggable={false}
        className={`
          block
          h-auto
          max-w-full
          transition-opacity
          duration-200
          ${videoWidth}
          ${isReady ? "opacity-100" : "opacity-0"}
        `}
      />
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

  /*
   * 모바일 / 태블릿:
   * 부모의 padding과 max-width를 무시하고
   * viewport 전체 너비(100vw)를 사용.
   *
   * lg 이상:
   * 기존 웹 상세페이지 너비로 복귀.
   */
  const mobileFullBleed = `
    relative
    left-1/2
    w-screen
    max-w-none
    -translate-x-1/2

    lg:left-auto
    lg:w-full
    lg:max-w-full
    lg:translate-x-0
  `;

  return (
    <section className="min-w-0 overflow-visible">
      {work.media.map((block, index) => {
        const isFirstImageBlock = index === firstImageIndex;

        /* ----------------------------------------
           FULL IMAGE
        ---------------------------------------- */

        if (block.type === "full") {
          return (
            <div
              key={`${block.src}-${index}`}
              className={`
                ${mobileFullBleed}
                ${index > 0 && block.marginTop === undefined ? "mt-1" : ""}
              `}
              style={{
                marginTop:
                  block.marginTop !== undefined
                    ? `${block.marginTop}px`
                    : undefined,
              }}
            >
              <img
                src={block.src}
                alt={block.alt?.[lang] ?? ""}
                loading={isFirstImageBlock ? "eager" : "lazy"}
                decoding={isFirstImageBlock ? "sync" : "async"}
                fetchPriority={isFirstImageBlock ? "high" : "auto"}
                draggable={false}
                className="
                  block
                  h-auto
                  w-full
                  max-w-none
                  lg:max-w-full
                "
              />
            </div>
          );
        }

        /* ----------------------------------------
           SPLIT IMAGES
        ---------------------------------------- */

        if (block.type === "split") {
          return (
            <div
              key={`split-${index}`}
              className={`
                ${mobileFullBleed}
                mt-1
                grid
                min-w-0
                grid-cols-1
                gap-1
                sm:grid-cols-2
              `}
            >
              {block.items.map((item, itemIndex) => {
                const isFirstSplitImage = isFirstImageBlock && itemIndex === 0;

                return (
                  <div
                    key={`${item.src}-${itemIndex}`}
                    className="
                        min-w-0
                        overflow-hidden
                      "
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
                          max-w-none
                          sm:h-full
                          sm:object-cover
                          lg:max-w-full
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
              className={`
                ${mobileFullBleed}
                mt-1
                grid
                min-w-0
                grid-cols-1
                gap-1
                sm:grid-cols-[3fr_2fr]
              `}
            >
              {/* LEFT BIG IMAGE */}
              <div
                className="
                  min-w-0
                  overflow-hidden
                  sm:aspect-[3/4]
                "
              >
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
                    max-w-none
                    sm:h-full
                    sm:object-cover
                    lg:max-w-full
                  "
                />
              </div>

              {/* RIGHT TWO IMAGES */}
              <div
                className="
                  grid
                  min-w-0
                  gap-1
                  sm:grid-rows-2
                "
              >
                {block.right.map((item, itemIndex) => (
                  <div
                    key={`${item.src}-${itemIndex}`}
                    className="
                        min-w-0
                        overflow-hidden
                      "
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
                          max-w-none
                          sm:h-full
                          sm:object-cover
                          lg:max-w-full
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
              className="
                flex
                min-w-0
                justify-center
                overflow-hidden
              "
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
                className={`
                  block
                  h-auto
                  max-w-full
                  ${imageWidth}
                `}
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
        <div
          className="
            mx-auto
            mt-20
            w-full
            max-w-[636px]
            px-4
            pb-16
          "
        >
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
