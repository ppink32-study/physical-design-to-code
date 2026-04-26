"use client";

/**
 * Form / FormField — Figma node 5714:108005 기반 배치 가이드
 * ----------------------------------------------------------------
 * Form 자체는 새로운 시각 컴포넌트가 아니라, 이미 존재하는 컨트롤들
 * (Input, TextArea, Select, Checkbox/CheckboxGroup, Radio/RadioGroup,
 * Toggle, Badge, Chips 등)을 일관된 라벨/메시지/간격 규칙으로 배치하기
 * 위한 layout primitive 입니다.
 *
 * Figma 의 두 가지 주요 레이아웃을 그대로 매핑:
 *   - layout="top"  : Label 위 / Control 아래 / Helper 아래 (vertical)
 *   - layout="left" : Label 좌측 (고정 width) / Control 우측 (horizontal)
 *
 * 사용 예시
 *   <Form layout="top">
 *     <FormField label="이름" mandatory>
 *       <Input placeholder="이름을 입력하세요" />
 *     </FormField>
 *     <FormField label="설명" helper="100자 이내로 작성해주세요">
 *       <TextArea />
 *     </FormField>
 *   </Form>
 *
 *   // controlled error
 *   <FormField label="이메일" error="이미 사용 중인 이메일입니다.">
 *     <Input tone="error" />
 *   </FormField>
 */

import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
} from "react";

import { InlineMessage } from "../Input/inlinemessage";
import { Label } from "../label/label";
import type { LabelSize } from "../label/label";

import styles from "./form.module.css";

/* =================================================================
 * Form (root layout)
 * =============================================================== */
export type FormLayout = "top" | "left";
export type FormDirection = "vertical" | "horizontal";

type FormContextValue = {
  layout: FormLayout;
  /** layout="left" 일 때 라벨 영역 width */
  labelWidth: number | string;
  /** Label 컴포넌트의 size */
  labelSize: LabelSize;
};

const FormContext = createContext<FormContextValue>({
  layout: "top",
  labelWidth: 160,
  labelSize: "medium",
});

export type FormProps = Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  /** FormField 내부 라벨 위치
   *   - "top"  : 라벨 위 / 컨트롤 아래
   *   - "left" : 라벨 좌측 / 컨트롤 우측 */
  layout?: FormLayout;
  /** Form 안의 fields 배치 방향
   *   - "vertical"   : 세로로 쌓기 (gap 16)  ← 기본
   *   - "horizontal" : 가로로 줄세우기 (gap 24) */
  direction?: FormDirection;
  /** layout="left" 에서 라벨 컬럼 width (number=px, string=css value) */
  labelWidth?: number | string;
  /** FormField 내부 Label 의 size (medium=14 / small=13) */
  labelSize?: LabelSize;
  /** Field 간 간격 override (number=px, string=css value).
   *   미지정 시 direction 에 따라 16 / 24 자동 적용 */
  gap?: number | string;
  children?: ReactNode;
  onSubmit?: HTMLAttributes<HTMLFormElement>["onSubmit"];
};

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  {
    layout = "top",
    direction = "vertical",
    labelWidth = 160,
    labelSize = "medium",
    gap,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const rootClass = [styles.form, className].filter(Boolean).join(" ");
  const mergedStyle: CSSProperties = {
    ...(gap !== undefined ? { gap: typeof gap === "number" ? `${gap}px` : gap } : null),
    ...style,
  };

  return (
    <FormContext.Provider value={{ layout, labelWidth, labelSize }}>
      <form
        {...rest}
        ref={ref}
        className={rootClass}
        data-layout={layout}
        data-direction={direction}
        style={mergedStyle}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

/* =================================================================
 * FormField (label + control + helper/error)
 * =============================================================== */
export type FormFieldProps = {
  /** 필드 라벨 텍스트 (생략 가능) */
  label?: ReactNode;
  /** 필수항목 표시 (라벨 우측 red dot) */
  mandatory?: boolean;
  /** 라벨 옆 info icon 표시 여부 */
  infoIcon?: boolean;
  /** 입력 컨트롤 아래 helper(설명) 텍스트 */
  helper?: ReactNode;
  /** 에러 메시지 (있으면 helper 대신 표시되고 InlineMessage type=error) */
  error?: ReactNode;
  /** 성공 메시지 (있고 error 가 없을 때 InlineMessage type=success) */
  success?: ReactNode;
  /** 경고 메시지 (있고 error/success 가 없을 때 type=warning) */
  warning?: ReactNode;
  /** 개별 필드에서만 layout 을 override (Form 의 default 보다 우선) */
  layout?: FormLayout;
  /** 개별 필드에서 label 영역 width override */
  labelWidth?: number | string;
  /** 개별 필드 Label size override */
  labelSize?: LabelSize;
  /** Label 의 htmlFor / 첫번째 자식 control 의 id 로 연결 */
  htmlFor?: string;
  /** Label 부분을 직접 렌더하고 싶을 때 (label prop 무시) */
  labelSlot?: ReactNode;
  /** Field 가로폭 (control 영역 width). 기본 stretch */
  width?: number | string;
  className?: string;
  children: ReactNode;
};

export function FormField({
  label,
  mandatory,
  infoIcon = true,
  helper,
  error,
  success,
  warning,
  layout: layoutProp,
  labelWidth: labelWidthProp,
  labelSize: labelSizeProp,
  htmlFor,
  labelSlot,
  width,
  className,
  children,
}: FormFieldProps) {
  const ctx = useContext(FormContext);
  const layout = layoutProp ?? ctx.layout;
  const labelWidth = labelWidthProp ?? ctx.labelWidth;
  const labelSize = labelSizeProp ?? ctx.labelSize;

  const reactId = useId();
  const fieldId = htmlFor ?? `formfield-${reactId}`;

  /* 첫번째 child element 에 id 를 자동 주입 (htmlFor 미지정 시) */
  const enhancedChildren = htmlFor
    ? children
    : injectIdIntoFirstChild(children, fieldId);

  const messageNode = error ? (
    <InlineMessage type="error">{error}</InlineMessage>
  ) : success ? (
    <InlineMessage type="success">{success}</InlineMessage>
  ) : warning ? (
    <InlineMessage type="warning">{warning}</InlineMessage>
  ) : helper ? (
    <span className={styles.helper}>{helper}</span>
  ) : null;

  const fieldClass = [styles.field, className].filter(Boolean).join(" ");
  const labelStyle: CSSProperties =
    layout === "left"
      ? {
          flex: `0 0 ${typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth}`,
          maxWidth: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
        }
      : {};

  const controlStyle: CSSProperties =
    width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {};

  return (
    <div className={fieldClass} data-layout={layout}>
      {label !== undefined || labelSlot !== undefined ? (
        <div className={styles.labelCol} style={labelStyle}>
          {labelSlot ?? (
            <Label
              size={labelSize}
              mandatory={mandatory}
              infoIcon={infoIcon}
              // Label 컴포넌트는 div 기반이라 htmlFor 지원하지 않음 → 시각용
              aria-label={typeof label === "string" ? label : undefined}
            >
              {label}
            </Label>
          )}
        </div>
      ) : null}

      <div className={styles.controlCol} style={controlStyle}>
        <div className={styles.controlSlot}>{enhancedChildren}</div>
        {messageNode ? (
          <div className={styles.messageSlot}>{messageNode}</div>
        ) : null}
      </div>
    </div>
  );
}

/* =================================================================
 * helpers
 * =============================================================== */
function injectIdIntoFirstChild(node: ReactNode, id: string): ReactNode {
  let injected = false;
  return Children.map(node, (child) => {
    if (injected || !isValidElement(child)) return child;
    const existing = (child.props as { id?: string }).id;
    if (existing) {
      injected = true;
      return child;
    }
    injected = true;
    return cloneElement(child, { id } as Partial<unknown>);
  });
}

export default Form;
