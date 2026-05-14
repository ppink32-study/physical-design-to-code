"use client";

/**
 * StepCard — Figma node 16861:17888
 * ----------------------------------------------------------------
 * 좌측 StepItem (Num + 세로선) + 우측 Data Pipeline Card.
 *
 * 카드 내부 구성
 *   - title / description
 *   - info row: Person(owner, id) · Date · Time
 *   - 우측 badge (slot — Badge 컴포넌트 또는 ReactNode)
 */

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { StepItem } from "./stepitem";
import type { NumVariant } from "./num";
import styles from "./stepcard.module.css";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "title" | "id">;

export type StepCardProps = NativeDivProps & {
  /** Left StepItem 의 Num variant */
  variant?: NumVariant;
  /** Num text variant 일 때 표시할 스텝 숫자 */
  step?: number | string;
  /** 하단 세로 선 노출 여부 (마지막 step 은 false) */
  line?: boolean;
  /** 카드 헤더 타이틀 */
  title?: ReactNode;
  /** 카드 헤더 설명 */
  description?: ReactNode;
  /** Person 행 — Owner */
  owner?: { label?: ReactNode; value?: ReactNode };
  /** Person 행 — ID */
  id?: { label?: ReactNode; value?: ReactNode };
  /** Calendar 아이콘 + 텍스트 */
  date?: ReactNode;
  /** Clock 아이콘 + 텍스트 */
  time?: ReactNode;
  /** 우측 badge 슬롯 (보통 <Badge variant="solid" color="green">Completed</Badge>) */
  badge?: ReactNode;
};

function maskIconStyle(src: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
  };
}

function StepCardInner(
  props: StepCardProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    variant = "success",
    step = 1,
    line = true,
    title,
    description,
    owner,
    id,
    date,
    time,
    badge,
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const hasPerson = owner != null || id != null;
  const hasInfo = hasPerson || date != null || time != null;

  return (
    <div {...rest} ref={ref} className={rootClass}>
      <div className={styles.indicatorWrap}>
        <StepItem variant={variant} step={step} line={line} />
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerBody}>
            {(title != null || description != null) && (
              <div className={styles.titleGroup}>
                {title != null && <p className={styles.title}>{title}</p>}
                {description != null && (
                  <p className={styles.description}>{description}</p>
                )}
              </div>
            )}

            {hasInfo && (
              <div className={styles.info}>
                {hasPerson && (
                  <div className={styles.person}>
                    {owner != null && (
                      <span className={styles.field}>
                        <span className={styles.fieldLabel}>
                          {owner.label ?? "Owner"}
                        </span>
                        {owner.value != null && (
                          <span className={styles.fieldValue}>{owner.value}</span>
                        )}
                      </span>
                    )}
                    {id != null && (
                      <span className={styles.field}>
                        <span className={styles.fieldLabel}>
                          {id.label ?? "ID"}
                        </span>
                        {id.value != null && (
                          <span className={styles.fieldValue}>{id.value}</span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {date != null && (
                  <span className={styles.meta}>
                    <span
                      aria-hidden="true"
                      className={styles.metaIcon}
                      style={maskIconStyle("/icon/Calendar.svg")}
                    />
                    {date}
                  </span>
                )}
                {time != null && (
                  <span className={styles.meta}>
                    <span
                      aria-hidden="true"
                      className={styles.metaIcon}
                      style={maskIconStyle("/icon/Clock.svg")}
                    />
                    {time}
                  </span>
                )}
              </div>
            )}
          </div>

          {badge != null && <div className={styles.badgeWrap}>{badge}</div>}
        </div>
      </div>
    </div>
  );
}

export const StepCard = forwardRef<HTMLDivElement, StepCardProps>(StepCardInner);
StepCard.displayName = "StepCard";

export default StepCard;
