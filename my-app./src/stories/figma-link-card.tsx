import type { CSSProperties } from "react";

import {
  FIGMA_GUIDELINE_FILE,
  figmaNodeUrl,
  getFigmaUrlForStoryTitle,
} from "./story-figma-urls";

/* -----------------------------------------------------------------
 * FigmaLinkCard
 *   Storybook Matrix / Guideline 페이지 상단에서 Figma 원본을
 *   바로 열 수 있도록 하는 공통 링크 카드.
 *
 *   사용법 (셋 중 하나):
 *     <FigmaLinkCard nodeId="17987-47864" />
 *     <FigmaLinkCard storyTitle="Components/Button" />
 *     <FigmaLinkCard url="https://www.figma.com/design/..." nodeId="x:y" />
 * --------------------------------------------------------------- */

export type FigmaLinkCardProps = {
  /** Figma node ID (콜론·하이픈 모두 허용). url 미지정 시 이 값으로 URL 생성 */
  nodeId?: string;
  /** Storybook title (예: "Components/Button"). nodeId 미지정 시 fallback */
  storyTitle?: string;
  /** 직접 url 을 주고 싶을 때 (가장 우선) */
  url?: string;
  /** 카드 본문 텍스트 — 컴포넌트의 한줄 설명 */
  caption?: string;
  /** 라벨에 노드 ID 노출 여부 (기본 true) */
  showNodeId?: boolean;
};

const cardStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid var(--border-surface-secondary)",
  background: "var(--bg-surface-secondary, #FAFAFA)",
};

const labelWrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
};

const labelTopStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: "var(--on-surface-secondary)",
};

const captionStyle: CSSProperties = {
  fontSize: 13,
  color: "var(--on-surface-base)",
};

const anchorStyle: CSSProperties = {
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 12px",
  borderRadius: 6,
  background: "var(--bg-surface-base)",
  border: "1px solid var(--border-surface-secondary)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--on-primary-hover)",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

function resolveUrl({
  url,
  nodeId,
  storyTitle,
}: Pick<FigmaLinkCardProps, "url" | "nodeId" | "storyTitle">): string {
  if (url) return url;
  if (nodeId) return figmaNodeUrl(nodeId);
  if (storyTitle) return getFigmaUrlForStoryTitle(storyTitle);
  return `${FIGMA_GUIDELINE_FILE}?m=dev`;
}

function normalizeNodeId(nodeId?: string): string | undefined {
  return nodeId?.replace(/:/g, "-");
}

export function FigmaLinkCard({
  nodeId,
  storyTitle,
  url,
  caption = "Figma 디자인에서 확인",
  showNodeId = true,
}: FigmaLinkCardProps) {
  const resolvedUrl = resolveUrl({ url, nodeId, storyTitle });
  const normalizedNodeId = normalizeNodeId(nodeId);

  return (
    <div style={cardStyle}>
      <div style={labelWrapStyle}>
        <span style={labelTopStyle}>
          FIGMA{showNodeId && normalizedNodeId ? ` · node ${normalizedNodeId}` : ""}
        </span>
        <span style={captionStyle}>{caption}</span>
      </div>
      <a
        href={resolvedUrl}
        target="_blank"
        rel="noreferrer noopener"
        style={anchorStyle}
      >
        Open in Figma ↗
      </a>
    </div>
  );
}
