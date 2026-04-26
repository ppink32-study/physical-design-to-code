"use client";

/**
 * Label — Figma MCP 기반 재작성 (node 5691:20257)
 * ----------------------------------------------------------------
 * Variants (4)
 *   - Type=Normal, Size=Medium        (5691:20258)
 *   - Type=Normal, Size=Small         (5691:20263)
 *   - Type=+ Outline Btn, Size=Small  (7378:67900)
 *   - Type=+ Ghost Btn,   Size=Small  (7378:70243)
 *
 * Usage
 *   <Label mandatory infoIcon>항목명</Label>
 *   <Label size="small" type="outline-button" onButtonClick={...}>항목명</Label>
 */

import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import { Button } from "../button/button";

import styles from "./label.module.css";

/* -----------------------------------------------------------------
 * 버튼용 아이콘 (mask-image + currentColor 로 Button 의 텍스트 색상을 상속)
 *   - outline-button : 설정(Gear) 아이콘
 *   - ghost-button   : + (AddFill) 아이콘
 * --------------------------------------------------------------- */
function MaskIcon({ src }: { src: string }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: "100%",
    height: "100%",
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden="true" style={style} />;
}

const GearIcon = () => <MaskIcon src="/icon/Gear.svg" />;
const AddIcon = () => <MaskIcon src="/icon/AddFill.svg" />;

export type LabelSize = "medium" | "small";
export type LabelType = "normal" | "outline-button" | "ghost-button";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type LabelProps = NativeDivProps & {
  /** 라벨 텍스트. children 과 label 둘 다 지원 (children 우선) */
  children?: ReactNode;
  label?: string;
  size?: LabelSize;
  type?: LabelType;
  /** 필수항목 표시 (red dot) */
  mandatory?: boolean;
  /** 정보 아이콘 표시 (기본 true) */
  infoIcon?: boolean;
  /** outline-button / ghost-button variant 의 버튼 클릭 핸들러 */
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * outline-button / ghost-button variant 버튼 내부의 텍스트.
   *   - outline-button : Figma 기본 예시인 "설정" 을 기본값으로 사용
   *   - ghost-button   : 기본은 텍스트 없이 icon-only (Figma 스펙)
   *   - 명시적으로 빈 문자열을 넘기면 icon-only 로 렌더링
   */
  buttonLabel?: string;
  /** 버튼 접근성 레이블 (icon-only 일 때 필요) */
  buttonAriaLabel?: string;
};

function LabelInner(
  props: LabelProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    label,
    size = "medium",
    type = "normal",
    mandatory = false,
    infoIcon = true,
    onButtonClick,
    buttonLabel,
    buttonAriaLabel,
    className,
    ...rest
  } = props;

  const hasButton = type === "outline-button" || type === "ghost-button";
  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const content = children ?? label ?? "Label";

  /* Figma 예시 기준 기본값:
   *   - outline-button : "설정" 텍스트 + add icon
   *   - ghost-button   : icon-only (텍스트 없음)
   * 명시적으로 buttonLabel 을 전달하면 그 값을 사용.
   */
  const resolvedButtonLabel =
    buttonLabel !== undefined
      ? buttonLabel
      : type === "outline-button"
        ? "설정"
        : "";
  const isIconOnly = resolvedButtonLabel === "";

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-size={size}
      data-type={type}
    >
      <span className={styles.textGroup}>
        <span className={styles.text}>{content}</span>
        {mandatory ? (
          <span className={styles.mandatoryWrap} aria-hidden="true">
            <span className={styles.mandatory} />
          </span>
        ) : null}
      </span>

      {infoIcon ? (
        <span className={styles.iconSlot} aria-hidden="true">
          <span className={styles.infoIcon} />
        </span>
      ) : null}

      {hasButton ? (
        <Button
          size="small"
          variant={
            type === "outline-button" ? "secondary-outline" : "secondary-ghost"
          }
          shape="square"
          iconOnly={isIconOnly}
          leftIcon={
            type === "outline-button" ? <GearIcon /> : <AddIcon />
          }
          aria-label={
            isIconOnly
              ? (buttonAriaLabel ?? (type === "outline-button" ? "설정" : "add"))
              : buttonAriaLabel
          }
          onClick={onButtonClick}
        >
          {isIconOnly ? undefined : resolvedButtonLabel}
        </Button>
      ) : null}
    </div>
  );
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(LabelInner);
Label.displayName = "Label";

export default Label;
