"use client";

import { useEffect, useState } from "react";

/**
 * `:root` 에 적용된 CSS 변수의 현재 계산값을 반환한다.
 * `data-theme` 속성이 바뀌면(라이트 ↔ 다크) 자동으로 재계산.
 */
export function useComputedCSSVar(name: string): string {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      setValue(v);
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });
    return () => observer.disconnect();
  }, [name]);

  return value;
}
