"use client";

import { useEffect } from "react";

const STORAGE_KEY = "work-list-scroll-position";

export default function ListScrollRestoration() {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(STORAGE_KEY);

    if (savedPosition !== null) {
      const position = Number(savedPosition);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: position,
            behavior: "auto",
          });
        });
      });
    }

    const savePosition = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    window.addEventListener("scroll", savePosition, {
      passive: true,
    });

    return () => {
      savePosition();
      window.removeEventListener("scroll", savePosition);
    };
  }, []);

  return null;
}
