"use client";

// InlineMessage - Figma MCP 기반
//   nodes  : 5983:232959 (Info), 5983:232958 (Error),
//            7609:121547 (Warning), 5983:233024 (Success), 7621:38925 (Loading)
//   layout : 16x16 fill icon + 12px Body/Sm-Medium 텍스트, gap=2xs(4)
//   color matrix
//     info    : on-surface-hint  + InfoFill
//     success : on-success       + CheckCircleFill
//     warning : on-warning       + WarningFill
//     error   : on-error         + CloseCircleFill
//     loading : accent-cyan      + Loading (회전)

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./inlinemessage.module.css";

export type InlineMessageType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading";

const ICON_BY_TYPE: Record<InlineMessageType, string> = {
  info: "/icon/InfoFill.svg",
  success: "/icon/CheckCircleFill.svg",
  warning: "/icon/WarningFill.svg",
  error: "/icon/CloseCircleFill.svg",
  loading: "/icon/Loading.svg",
};

function MaskIcon({
  src,
  spin = false,
}: {
  src: string;
  spin?: boolean;
}) {
  const style: CSSProperties = {
    width: 16,
    height: 16,
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return (
    <span
      aria-hidden="true"
      className={spin ? styles.spinIcon : styles.icon}
      style={style}
    />
  );
}

export type InlineMessageProps = HTMLAttributes<HTMLDivElement> & {
  type?: InlineMessageType;
  /** 메시지 텍스트 (children 으로도 가능) */
  text?: ReactNode;
  /** 기본 아이콘 대신 사용할 커스텀 아이콘 */
  icon?: ReactNode | false;
};

export function InlineMessage({
  type = "info",
  text,
  icon,
  children,
  className,
  ...rest
}: InlineMessageProps) {
  const content = text ?? children;

  const renderIcon = (() => {
    if (icon === false) return null;
    if (icon !== undefined) return icon;
    return <MaskIcon src={ICON_BY_TYPE[type]} spin={type === "loading"} />;
  })();

  const cls = [styles.wrapper, styles[`type-${type}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="status" className={cls} data-type={type} {...rest}>
      {renderIcon}
      <span className={styles.text}>{content}</span>
    </div>
  );
}

export default InlineMessage;
