import type { Decorator } from "@storybook/react";

import { FigmaDesignLinkButton } from "../src/stories/figma-design-link";
import { getFigmaUrlForStoryTitle } from "../src/stories/story-figma-urls";

/**
 * Canvas 뷰(`viewMode === "story"`)의 `Default` 스토리에만 Figma 링크.
 * Docs 페이지에서는 타이틀 옆 Figma 버튼(`DocsPageWithFigma`)이 노출되므로,
 * Docs 안에 임베드된 Default 프리뷰에서는 decorator 를 적용하지 않는다.
 * `parameters.figma` 가 있으면 그 URL을, 없으면 `meta.title` 기준 노드 매핑.
 *
 * Opt-out:
 *  - `parameters.hideFigmaLink === true` 로 스토리별 비활성화
 *  - `Layout Example/...` 카테고리는 전체 화면 예시이므로 항상 비활성화
 */
export const figmaDefaultDecorator: Decorator = (Story, context) => {
  if (context.viewMode !== "story" || context.name !== "Default") {
    return <Story />;
  }
  if (context.parameters?.hideFigmaLink === true) {
    return <Story />;
  }
  if (context.title.startsWith("Layout Example/")) {
    return <Story />;
  }
  const href =
    (context.parameters?.figma as string | undefined) ??
    getFigmaUrlForStoryTitle(context.title);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <FigmaDesignLinkButton href={href} />
      <Story />
    </div>
  );
};
