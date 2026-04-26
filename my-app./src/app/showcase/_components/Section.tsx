import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Section.module.css";

export type SectionProps = {
  /** 섹션 anchor id */
  id: string;
  /** 컴포넌트 이름 */
  name: string;
  /** 카테고리 라벨 (Basics, Form Inputs ...) */
  category: string;
  /** 한 줄 설명 */
  description?: string;
  /** 우측 액션 (Figma 링크 등) */
  actions?: ReactNode;
  /** /design/[slug] 상세 링크용 slug */
  detailSlug?: string;
  children: ReactNode;
};

export function Section({
  id,
  name,
  category,
  description,
  actions,
  detailSlug,
  children,
}: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.head}>
        <div className={styles.titleRow}>
          <h2 className={styles.name}>{name}</h2>
          <span className={styles.tag}>{category}</span>
          <div className={styles.actions}>
            {actions}
            {detailSlug ? (
              <Link href={`/design/${detailSlug}`} className={styles.actionLink}>
                Guidelines →
              </Link>
            ) : null}
          </div>
        </div>
        {description ? <p className={styles.desc}>{description}</p> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

export type SubSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SubSection({ title, description, children }: SubSectionProps) {
  return (
    <div className={styles.sub}>
      <div className={styles.subHead}>
        <h3 className={styles.subTitle}>{title}</h3>
        {description ? <p className={styles.subDesc}>{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
