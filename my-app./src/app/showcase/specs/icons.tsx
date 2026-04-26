"use client";

import type { CSSProperties } from "react";

/* ----------------------------------------------------------------
 *  showcase 전용 mask-image 아이콘 헬퍼.
 *  showcase 페이지에서 leftIcon / rightIcon prop 을 전달할 때 사용.
 * -------------------------------------------------------------- */
export function MaskIcon({
  src,
  size = 16,
}: {
  src: string;
  size?: number;
}) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    flexShrink: 0,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  return <span aria-hidden="true" style={style} />;
}

export const Icons = {
  search: <MaskIcon src="/icon/Search.svg" />,
  arrowRight: <MaskIcon src="/icon/ArrowRight.svg" />,
  check: <MaskIcon src="/icon/Check.svg" />,
  plus: <MaskIcon src="/icon/Add.svg" />,
  download: <MaskIcon src="/icon/Download.svg" />,
  info: <MaskIcon src="/icon/Info.svg" />,
  star: <MaskIcon src="/icon/Star.svg" />,
};
