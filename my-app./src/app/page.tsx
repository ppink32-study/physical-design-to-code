import Link from "next/link";
import { Button } from "@/components/button/button";
import { Badge, type BadgeSolidColor } from "@/components/badge/badge";
import { Divider } from "@/components/divider/divider";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import styles from "./page.module.css";
import {
  BY_CATEGORY,
  CATEGORY_ORDER,
  COMPONENTS,
  type ComponentCategory,
  type ComponentEntry,
} from "./_ds/manifest";

const CATEGORY_META: Record<
  ComponentCategory,
  { index: string; description: string; color: BadgeSolidColor }
> = {
  Foundation: {
    index: "00",
    description: "색상·타이포그래피·여백 등 모든 컴포넌트의 기초가 되는 토큰",
    color: "orange",
  },
  Basics: {
    index: "01",
    description: "버튼·뱃지·구분선 등 어디서든 사용하는 기초 요소",
    color: "primary",
  },
  "Form Inputs": {
    index: "02",
    description: "텍스트·선택·날짜 등 사용자 입력을 받는 필드",
    color: "blue",
  },
  Selection: {
    index: "03",
    description: "칩·탭으로 다수 옵션 중 하나 이상을 고르는 컴포넌트",
    color: "purple",
  },
  "Data Display": {
    index: "04",
    description: "테이블·페이지네이션으로 데이터를 나열하고 탐색",
    color: "cyan",
  },
  Layout: {
    index: "05",
    description: "제목·스크롤·빈 상태 등 페이지 골격을 구성",
    color: "green",
  },
  Media: {
    index: "06",
    description: "재생·프리뷰 등 미디어 경험을 다루는 컴포넌트",
    color: "pink",
  },
};

/** 컴포넌트 이름 → 글리프 이니셜 */
function glyphFor(entry: ComponentEntry): string {
  const words = entry.name
    .replace(/[^A-Za-z가-힣\s]/g, " ")
    .split(/\s+|(?=[A-Z])/)
    .filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] ?? "") + (words[1][0]?.toLowerCase() ?? "");
  }
  return entry.name.trim().slice(0, 2);
}

export default function Home() {
  const totalComponents = COMPONENTS.length;

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        {/* ===================== HERO ===================== */}
        <section className={styles.hero}>
          <Badge variant="status" color="green" dot size="sm">
            Physical AI · Design to Code
          </Badge>

          <h1 className={styles.title}>
            꾸밈없이 명확한
            <br />
            <span className={styles.titleAccent}>디자인 시스템</span>
          </h1>
          <p className={styles.subtitle}>
            Figma 디자인 토큰을 그대로 CSS 변수로 연결해 Light/Dark 테마를 일관되게 유지합니다.
            각 컴포넌트 페이지에서 기본 예시, 상태, 변형 매트릭스를 확인할 수 있어요.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/design/button" className={styles.ctaAnchor}>
              <Button
                variant="primary-solid"
                size="xlarge"
                shape="round"
                rightIcon={<span aria-hidden>→</span>}
              >
                컴포넌트 둘러보기
              </Button>
            </Link>
            <Link href="#categories" className={styles.ctaAnchor}>
              <Button variant="secondary-outline" size="xlarge" shape="round">
                카테고리 한눈에 보기
              </Button>
            </Link>
          </div>
        </section>

        {/* ===================== STATS ===================== */}
        <section className={styles.stats} aria-label="Design system stats">
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Components</span>
            <span className={styles.statValue}>{totalComponents}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Categories</span>
            <span className={styles.statValue}>{CATEGORY_ORDER.length}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Foundation</span>
            <span className={styles.statValue}>700+</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Themes</span>
            <span className={styles.statValue}>Light · Dark</span>
          </div>
        </section>

        {/* ===================== CATEGORIES ===================== */}
        <div id="categories">
          {CATEGORY_ORDER.map((cat, catIdx) => {
            const items = BY_CATEGORY[cat];
            if (!items || items.length === 0) return null;
            const meta = CATEGORY_META[cat];
            return (
              <section key={cat} className={styles.categoryBlock}>
                {catIdx > 0 ? <Divider orientation="horizontal" /> : null}

                <div className={styles.categoryHead}>
                  <ContentsTitleMain
                    title={cat}
                    badge={
                      <Badge
                        variant="solid"
                        color={meta.color}
                        size="sm"
                        shape="round"
                      >
                        {meta.index}
                      </Badge>
                    }
                    hint={meta.description}
                    actions={
                      <Badge variant="line" size="sm" shape="round" color="gray">
                        {items.length} items
                      </Badge>
                    }
                  />
                </div>

                <div className={styles.cardGrid}>
                  {items.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/design/${c.slug}`}
                      className={styles.card}
                    >
                      <div className={styles.cardHeader}>
                        <Badge
                          variant="solid"
                          color={meta.color}
                          shape="round"
                          size="lg"
                        >
                          {glyphFor(c)}
                        </Badge>
                        <h3 className={styles.cardName}>{c.name}</h3>
                      </div>
                      <p className={styles.cardDesc}>{c.description}</p>
                      {c.tags && c.tags.length > 0 ? (
                        <div className={styles.tagRow}>
                          {c.tags.slice(0, 3).map((t) => (
                            <Badge
                              key={t}
                              variant="line"
                              size="sm"
                              shape="round"
                              color="gray"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      <span className={styles.cardArrow} aria-hidden>
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
