"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/button/button/button";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import styles from "./demo-block.module.css";

export type DemoSectionProps = {
  title: string;
  description?: string;
  /** 항상 보이는 기본 예시. */
  children: ReactNode;
  /** "모든 상태 보기" 토글을 눌렀을 때 노출되는 상세 예시. */
  more?: ReactNode;
  /** 토글 버튼을 기본으로 펼친 상태로 렌더. */
  defaultOpen?: boolean;
};

export function DemoSection({
  title,
  description,
  children,
  more,
  defaultOpen = false,
}: DemoSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <ContentsTitleMain
          title={title}
          actions={
            more ? (
              <Button
                variant="secondary-ghost"
                size="small"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
              >
                {open ? "상세 접기" : "모든 상태 보기"}
              </Button>
            ) : undefined
          }
        />
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </div>
      <div className={styles.stage}>{children}</div>
      {open && more ? <div className={styles.stage}>{more}</div> : null}
    </section>
  );
}

export { styles as demoStyles };
