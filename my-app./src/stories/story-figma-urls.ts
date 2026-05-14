/** Physical AI Platform Design Guideline — Figma file */
export const FIGMA_GUIDELINE_FILE =
  "https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline";

/** `node-id` 쿼리용 (콜론·하이픈 모두 허용 → 하이픈으로 통일) */
export function figmaNodeUrl(nodeId: string): string {
  const id = nodeId.replace(/:/g, "-");
  return `${FIGMA_GUIDELINE_FILE}?node-id=${id}&m=dev`;
}

/**
 * Storybook `meta.title` → Figma node (코멘트·스토리 설명 기준).
 * 노드 미상인 Chips 등은 파일 루트로 연결.
 * 키 나열 순서는 `components-sidebar-order.ts` 의 Components 그룹 순과 동일합니다.
 */
const TITLE_TO_NODE: Record<string, string | null> = {
  "Components/Button": "17987:47864",
  "Components/Button/LinkText": "9813:1005",
  "Components/Button/XButton": "6592:270982",
  "Components/Button/SearchToggleItem": "17312:17269",
  "Components/Button/BottomBtnArea": "9813:896",
  "Components/Badge": "17976:110564",
  "Components/Checkbox": "17995:61456",
  "Components/Radio": "17995:61609",
  "Components/Toggle": "18001:55013",
  "Components/Label": "5691:20257",
  "Components/Divider": "1:15492",
  "Components/Pagination": "13286:33784",
  "Components/Scroll": "5250:17591",
  "Components/Chips/ChipButton": null,
  "Components/Chips/InputChip": null,
  "Components/Chips/SearchChip": null,
  "Components/Chips/SelectableChip": null,
  "Components/Chips/SelectChip": null,
  "Components/Select": "4811:29737",
  "Components/Select/SelectItem": "4811:36049",
  "Components/Select/SelectList": "11959:26477",
  "Components/Tab": "5185:210328",
  "Components/Input": "4771:26367",
  "Components/Input/TextArea": "4783:27558",
  "Components/Input/InlineMessage": "5983:232959",
  /** Form 레이아웃·필드 배치 가이드 (Guideline 스토리 기준) */
  "Components/Form": "7119:411152",
  "Components/Empty": "12368:26042",
  "Components/Step/Num": "18374:238",
  "Components/Step/StepItem": "18505:14797",
  "Components/Step/Stepper": "16722:36406",
  "Components/Step/StepCard": "16861:17888",
  "Components/Table/GridHeader": "4456:290401",
  "Components/Table/BodyCell": "4456:290858",
  "Components/Title/PageTitle": "4790:161",
  "Components/Title/ContentsTitleMain": "4790:206",
  "Components/Title/ContentsTitleSub": "5784:48007",
  "Components/Title/ContentsTitleSub2D": "7544:663",
  "Components/PlaybookControlBar": "17423:438",
  "Components/DatePicker": "5132:60197",
  "Components/Loader": "13289:46891",
  /** Full-page dim + centered loader — PageLoaderOverlay */
  "Components/Loader/Full page overlay": "18219:10393",
  "Components/Tooltip": "5543:321819",
  "Components/Modal": "6446:446809",
  "Components/Gnb": "17945:4068",
  /** 섹션 루트 — 개별 스토리에 `parameters.figma` 가 없을 때 */
  "Components/Dropdown": "5262-317642",
  "Components/Dropdown/Dropdown Menu": "5355:154239",
  "Components/Dropdown/Dropdown Trigger with menu": "12149:94684",
  "Components/Dropdown/Menu Item": "13292:55986",
  "Components/Dropdown/Trigger": "5286:121691",
  "Components/Toasts/Toast": "5307:14956",
  "Components/Alert/Filled icon": "6390:256693",
  "Components/Alert/Line icon": "5012:68852",
  "Design System/Foundation/Typography": null,
  "Design System/Foundation/Spacing": null,
  "Design System/Foundation/Color & Shadow": null,
  "Design System/Foundation/Icon": "4823-23177",
  "Design System/Foundation/Radius": null,
};

/** 알 수 없는 title 은 가이드라인 파일 루트로 연결 */
export function getFigmaUrlForStoryTitle(title: string): string {
  if (!(title in TITLE_TO_NODE)) {
    return `${FIGMA_GUIDELINE_FILE}?m=dev`;
  }
  const node = TITLE_TO_NODE[title as keyof typeof TITLE_TO_NODE];
  if (node === null) {
    return `${FIGMA_GUIDELINE_FILE}?m=dev`;
  }
  return figmaNodeUrl(node);
}
