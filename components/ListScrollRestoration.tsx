"use client";

import { useLayoutEffect } from "react";

const STORAGE_KEY = "work-list-scroll-position";

export default function ListScrollRestoration() {
  useLayoutEffect(() => {
    const savedPosition = sessionStorage.getItem(STORAGE_KEY);

    if (savedPosition !== null) {
      const position = Number(savedPosition);

      if (Number.isFinite(position)) {
        window.scrollTo({
          top: position,
          behavior: "auto",
        });
      }
    }

    const savePosition = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    window.addEventListener("scroll", savePosition, {
      passive: true,
    });

    return () => {
      // 여기서 savePosition을 호출하면 안 됨
      window.removeEventListener("scroll", savePosition);
    };
  }, []);

  return null;
}
