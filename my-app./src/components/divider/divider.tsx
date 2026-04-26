"use client";

// Divider - Figma MCP 기반 재작성 (node 1-15492)
// Variants: horizontal(title false/true) / vertical
// Props: orientation, children, title, length
// Accessibility: role="separator", aria-orientation

import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type DividerProps = NativeDivProps & {
  orientation?: DividerOrientation;
  /** title 텍스트 (horizontal 에서만 반영). children 이 우선 */
  title?: ReactNode;
  children?: ReactNode;
  /** vertical 에서 선 길이 (기본 16px) */
  length?: number | string;
};

function DividerInner(
  props: DividerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    orientation = "horizontal",
    title,
    children,
    length,
    className,
    style,
    role = "separator",
    ...rest
  } = props;

  const content = children ?? title;
  const hasTitle = orientation === "horizontal" && content !== undefined && content !== null && content !== "";
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const mergedStyle: CSSProperties = {
    ...style,
    ...(orientation === "vertical" && length !== undefined
      ? ({
          ["--divider-length" as string]:
            typeof length === "number" ? `${length}px` : length,
        } as CSSProperties)
      : null),
  };

  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      aria-orientation={orientation}
      className={rootClass}
      style={mergedStyle}
      data-orientation={orientation}
      data-has-title={hasTitle ? "true" : undefined}
    >
      {hasTitle ? (
        <>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.title}>{content}</span>
          <span className={styles.line} aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(DividerInner);
Divider.displayName = "Divider";

export default Divider;
