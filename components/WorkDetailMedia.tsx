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

    if (!video) return;

    /*
     * iOS Safari autoplay 안정화
     */
    if (isGifStyle) {
      video.muted = true;
      video.defaultMuted = true;

      const tryPlay = () => {
        if (!video.paused) return;

        video.play().catch(() => {
          // 모바일 브라우저에서 autoplay가 막히는 경우 무시
        });
      };

      /*
       * 화면 근처에 들어왔을 때만 재생
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
       * 다른 탭 갔다가 돌아왔을 때
       * 모바일에서 영상이 멈춰버리는 현상 방지
       */
      const handleVisibilityChange = () => {
        if (
          document.visibilityState === "visible" &&
          video.getBoundingClientRect().top < window.innerHeight &&
          video.getBoundingClientRect().bottom > 0
        ) {
          tryPlay();
        }
      };

      /*
       * Safari 뒤로가기 캐시 복원 대응
       */
      const handlePageShow = () => {
        if (
          video.getBoundingClientRect().top < window.innerHeight &&
          video.getBoundingClientRect().bottom > 0
        ) {
          tryPlay();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      window.addEventListener("pageshow", handlePageShow);

      /*
       * 최초 진입 시 한 번 재생 시도
       */
      tryPlay();

      return () => {
        observer.disconnect();

        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );

        window.removeEventListener("pageshow", handlePageShow);

        video.pause();
      };
    }
  }, [isGifStyle]);

  /*
   * poster가 없는 일반 영상의 경우
   * iPhone에서 검은 화면 / 빈 화면 대신
   * 첫 프레임을 보여주기 위한 fallback
   */
  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    if (!isGifStyle && !block.poster) {
      try {
        /*
         * 정확히 0초에서는 Safari가
         * 프레임을 렌더링하지 않는 경우가 있어서
         * 아주 조금 이동시킴
         */
        video.currentTime = 0.01;
      } catch {
        // seek 실패 시 무시
      }
    }
  };

  const handleCanPlay = () => {
    const video = videoRef.current;

    if (!video || !isGifStyle) return;

    video.play().catch(() => {
      // autoplay 제한 시 무시
    });
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
        autoPlay={isGifStyle}
        muted={isGifStyle}
        loop={isGifStyle}
        controls={!isGifStyle}
        playsInline
        preload={block.poster ? "metadata" : "auto"}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
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
   * sectionText나 video보다 뒤에 이미지가 있어도
   * 실제 첫 번째 이미지를 우선 다운로드하기 위함
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
        /*
         * 첫 이미지와 그 주변 콘텐츠는 바로 로드
         * 나머지는 lazy loading
         */
        const eager =
          index === firstImageIndex ||
          index === firstImageIndex + 1 ||
          index === 0;

        /* ----------------------------------------
           FULL IMAGE
        ---------------------------------------- */

        if (block.type === "full") {
          const isFirstImage = index === firstImageIndex;

          return (
            <img
              key={`${block.src}-${index}`}
              src={block.src}
              alt={block.alt?.[lang] ?? ""}
              loading={isFirstImage || eager ? "eager" : "lazy"}
              decoding={isFirstImage ? "sync" : "async"}
              fetchPriority={isFirstImage ? "high" : "auto"}
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
          const isFirstImage = index === firstImageIndex;

          return (
            <div
              key={`split-${index}`}
              className="mt-1 grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-2"
            >
              {block.items.map((item, itemIndex) => (
                <div
                  key={`${item.src}-${itemIndex}`}
                  className="min-w-0 overflow-hidden"
                >
                  <img
                    src={item.src}
                    alt={item.alt?.[lang] ?? ""}
                    loading={isFirstImage || eager ? "eager" : "lazy"}
                    decoding={
                      isFirstImage && itemIndex === 0 ? "sync" : "async"
                    }
                    fetchPriority={
                      isFirstImage && itemIndex === 0 ? "high" : "auto"
                    }
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
          );
        }

        /* ----------------------------------------
           COLLAGE
        ---------------------------------------- */

        if (block.type === "collage") {
          const isFirstImage = index === firstImageIndex;

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
                  loading={isFirstImage || eager ? "eager" : "lazy"}
                  decoding={isFirstImage ? "sync" : "async"}
                  fetchPriority={isFirstImage ? "high" : "auto"}
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
                      loading={isFirstImage || eager ? "eager" : "lazy"}
                      decoding="async"
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
          const isFirstImage = index === firstImageIndex;

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
                loading={isFirstImage || eager ? "eager" : "lazy"}
                decoding={isFirstImage ? "sync" : "async"}
                fetchPriority={isFirstImage ? "high" : "auto"}
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
