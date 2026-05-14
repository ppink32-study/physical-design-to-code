/**
 * Storybook `Components/` 사이드바 정렬 — Figma 컴포넌트 메뉴 순서와 동일.
 *
 * 주의: Storybook 10은 `preview.ts`의 `storySort`를 소스에서 정적으로 추출하므로,
 * 동일 배열을 `.storybook/preview.ts` 의 `storySort` 콜백 **안에 인라인**으로도 두어야 합니다.
 * `storySort` 내부에는 **TypeScript 타입 표기를 쓰면 안 됩니다**(`eval` 시 SyntaxError).
 * 순서를 바꿀 때는 이 파일과 `preview.ts`·`story-figma-urls.ts` 를 함께 맞추세요.
 */
export const COMPONENTS_TITLE_PREFIX = "Components/";

export const COMPONENTS_GROUP_ORDER = [
  "Button",
  "Badge",
  "Checkbox",
  "Radio",
  "Toggle",
  "Label",
  "Divider",
  "Pagination",
  "Scroll",
  "Chips",
  "Select",
  "Tab",
  "Input",
  "Form",
  "Empty",
  "Step",
  "Table",
  "Title",
  "PlaybookControlBar",
  "DatePicker",
  "Loader",
  "Tooltip",
  "Dropdown",
  "Toasts",
  "Alert",
  "Nav",
  "Modal",
] as const;
