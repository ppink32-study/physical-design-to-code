import type { CSSProperties, ReactNode } from "react";

/**
 * Storybook 가이드/매트릭스 페이지용 토스 스타일 셸.
 * 제품 컴포넌트가 아닌 문서 레이아웃 전용입니다.
 */

const font = "var(--font-family-korean)";
const onBase = "var(--on-surface-base)";
const onSecondary = "var(--on-surface-secondary)";
const onHint = "var(--on-surface-hint)";
const borderSubtle =
  "1px solid var(--border-surface-secondary)";
const surfaceMuted =
  "var(--bg-surface-secondary, #FAFAFA)";

const pageRoot: CSSProperties = {
  boxSizing: "border-box",
  maxWidth: 1080,
  margin: "0 auto",
  padding: "8px 0 48px",
  fontFamily: font,
  color: onBase,
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: onHint,
};

const pageTitleStyle: CSSProperties = {
  margin: "6px 0 0",
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.25,
  color: onBase,
};

const leadStyle: CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.65,
  color: onSecondary,
};

const stackGap48: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 48,
};

/** 섹션: 제목 블록과 본문 사이 간격 */
const sectionStack: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.35,
  color: onBase,
};

const sectionDescStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.65,
  color: onSecondary,
};

const noteStyle: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.65,
  color: onSecondary,
};

const codeBlockStyle: CSSProperties = {
  margin: 0,
  padding: "20px 22px",
  borderRadius: 12,
  border: borderSubtle,
  background: surfaceMuted,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: 13,
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  overflowX: "auto",
  color: onBase,
};

const inlineCodeStyle: CSSProperties = {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "0.9em",
  padding: "2px 7px",
  borderRadius: 6,
  border: borderSubtle,
  background: surfaceMuted,
  color: onBase,
};

const panelStyle: CSSProperties = {
  borderRadius: 12,
  border: borderSubtle,
  background: "var(--bg-surface-base)",
  overflow: "hidden",
};

const panelInsetStyle: CSSProperties = {
  borderRadius: 12,
  border: borderSubtle,
  background: surfaceMuted,
  padding: "24px 20px",
};

export type StoryDocsPageProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** 기본 1080. Figma 프레임 폭(예: PageTitle 1612px) 검수 시 확대 */
  pageMaxWidth?: number;
};

/** 페이지 루트: 상단 타이틀 + 본문 스택(48px 간격) */
export function StoryDocsPage({
  eyebrow = "Components",
  title,
  description,
  children,
  pageMaxWidth = 1080,
}: StoryDocsPageProps) {
  const rootStyle: CSSProperties = {
    ...pageRoot,
    maxWidth: pageMaxWidth,
  };
  return (
    <div style={rootStyle}>
      <header style={{ marginBottom: 40 }}>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h1 style={pageTitleStyle}>{title}</h1>
        {description ? <p style={leadStyle}>{description}</p> : null}
      </header>
      <div style={stackGap48}>{children}</div>
    </div>
  );
}

export type StoryDocsMatrixPageProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Figma traces — 있으면 루트에 data-figma-node 부여 */
  figmaNode?: string;
  /** `StoryDocsPage` 에 전달 — 넓은 Figma 프레임 매트릭스용 */
  pageMaxWidth?: number;
  children: ReactNode;
};

/**
 * Matrix 전용: `StoryDocsPage` + 본문을 40px 간격 스택으로 묶음.
 * (Figma 카드 직후 매트릭스 블록들)
 */
export function StoryDocsMatrixPage({
  eyebrow,
  title,
  description,
  figmaNode,
  pageMaxWidth,
  children,
}: StoryDocsMatrixPageProps) {
  return (
    <StoryDocsPage
      eyebrow={eyebrow}
      title={title}
      description={description}
      pageMaxWidth={pageMaxWidth}
    >
      <div
        {...(figmaNode ? { "data-figma-node": figmaNode } : {})}
        style={{ display: "flex", flexDirection: "column", gap: 40 }}
      >
        {children}
      </div>
    </StoryDocsPage>
  );
}

/** Matrix 상단/가이드 보조 설명 (본문보다 한 톤 낮춤) */
export function StoryDocsIntro({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        maxWidth: 720,
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 1.65,
        color: onSecondary,
      }}
    >
      {children}
    </p>
  );
}

export type StoryDocsSectionProps = {
  title: string;
  description?: ReactNode;
  children: ReactNode;
};

/** 섹션: 제목 + 설명 + 콘텐츠 */
export function StoryDocsSection({
  title,
  description,
  children,
}: StoryDocsSectionProps) {
  return (
    <section style={sectionStack}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={sectionTitleStyle}>{title}</h2>
        {description ? <div style={sectionDescStyle}>{description}</div> : null}
      </div>
      {children}
    </section>
  );
}

/** 하단 안내·각주 */
export function StoryDocsNote({ children }: { children: ReactNode }) {
  return <p style={noteStyle}>{children}</p>;
}

/** 코드 블록 */
export function StoryDocsCode({ children }: { children: string }) {
  return <pre style={codeBlockStyle}>{children}</pre>;
}

/** 본문 단락 */
export function StoryDocsParagraph({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: onBase }}>
      {children}
    </p>
  );
}

/** 인라인 코드 */
export function StoryDocsInlineCode({ children }: { children: ReactNode }) {
  return <code style={inlineCodeStyle}>{children}</code>;
}

/** 카드형 패널(매트릭스 외곽 등) */
export function StoryDocsPanel({ children }: { children: ReactNode }) {
  return <div style={panelStyle}>{children}</div>;
}

/** 연한 배경 안쪽 패널(간격 예시 등) */
export function StoryDocsPanelInset({ children }: { children: ReactNode }) {
  return <div style={panelInsetStyle}>{children}</div>;
}

/** Playground 전용: 중앙 정렬 + 라벨 */
export function StoryPlaygroundFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        minHeight: 280,
        padding: "48px 24px",
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        color: onBase,
      }}
    >
      <p style={{ ...eyebrowStyle, textAlign: "center" }}>Playground</p>
      {children}
    </div>
  );
}
