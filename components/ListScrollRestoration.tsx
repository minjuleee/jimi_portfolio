"use client";

import { useEffect } from "react";

const STORAGE_KEY = "work-list-scroll-position";

export default function ListScrollRestoration() {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(STORAGE_KEY);

    const savePosition = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    /*
     * 저장된 목록 위치를 먼저 복원한 다음
     * 목록 페이지의 스크롤만 감지한다.
     */
    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (savedPosition !== null) {
          const position = Number(savedPosition);

          if (Number.isFinite(position)) {
            window.scrollTo({
              top: position,
              behavior: "auto",
            });
          }
        }

        window.addEventListener("scroll", savePosition, { passive: true });
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);

      /*
       * 여기서 현재 위치를 다시 저장하면 안 됨.
       * 상세페이지의 스크롤값이 목록값을
       * 덮어쓰는 것을 방지한다.
       */
      window.removeEventListener("scroll", savePosition);
    };
  }, []);

  return null;
}
