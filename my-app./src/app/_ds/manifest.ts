export type ComponentCategory =
  | "Foundation"
  | "Basics"
  | "Form Inputs"
  | "Selection"
  | "Data Display"
  | "Layout"
  | "Media";

/** 하나의 Figma 노드 링크 정의 */
export type FigmaNodeRef = {
  /** 예: "17976-110564" (— 또는 : 모두 허용) */
  nodeId: string;
  /** 드롭다운/리스트용 레이블 (서브 노드용) */
  label?: string;
};

/** Figma 링크 메타. primary 1개 + optional sub[] */
export type FigmaRef = {
  primary: FigmaNodeRef;
  sub?: FigmaNodeRef[];
};

export type ComponentEntry = {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  tags?: string[];
  figma?: FigmaRef;
};

/** Figma 파일 base URL */
export const FIGMA_FILE_BASE =
  "https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline";

/** node-id 를 URL 로 변환. `17976-110564` / `17976:110564` 둘 다 수용 */
export function figmaNodeUrl(nodeId: string): string {
  const normalized = nodeId.replace(/:/g, "-");
  return `${FIGMA_FILE_BASE}?node-id=${normalized}&m=dev`;
}

export const CATEGORY_ORDER: ComponentCategory[] = [
  "Foundation",
  "Basics",
  "Form Inputs",
  "Selection",
  "Data Display",
  "Layout",
  "Media",
];

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "foundations",
    name: "Foundations",
    category: "Foundation",
    description:
      "Color · Typography · Radius · Spacing · Opacity 등 디자인 시스템의 기초 토큰. 스와치를 클릭하면 값을 클립보드에 복사합니다.",
    tags: ["color", "typography", "spacing", "radius"],
  },
  {
    slug: "button",
    name: "Button",
    category: "Basics",
    description:
      "액션 트리거용 인터랙티브 요소. primary/secondary/ghost 등 다양한 variant·size·state를 제공합니다.",
    tags: ["variant", "size", "leading/trailing icon"],
    figma: { primary: { nodeId: "17987-47864" } },
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Basics",
    description:
      "상태·카운트·키워드를 표시하는 작은 레이블. solid/soft/outline 톤과 8가지 시맨틱 컬러를 지원합니다.",
    tags: ["tone", "shape", "dot"],
    figma: {
      primary: { nodeId: "17976-110564", label: "Solid" },
      sub: [
        { nodeId: "17976-110839", label: "Line" },
        { nodeId: "17976-111050", label: "Status" },
        { nodeId: "17976-111245", label: "Notice" },
      ],
    },
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Basics",
    description: "섹션을 시각적으로 구분하는 수평·수직 구분선.",
    tags: ["orientation", "inset"],
    figma: { primary: { nodeId: "1-15492" } },
  },
  {
    slug: "label",
    name: "Label",
    category: "Basics",
    description: "필드·아이콘 위에 배치되는 보조 텍스트. size와 weight 변형을 제공합니다.",
    tags: ["size", "required"],
    figma: { primary: { nodeId: "5691-20257" } },
  },
  {
    slug: "title",
    name: "Title",
    category: "Layout",
    description: "페이지·섹션 제목 컴포넌트. PageTitle·ContentsTitle 계열을 포함합니다.",
    tags: ["page title", "contents title"],
    figma: {
      primary: { nodeId: "4790-161", label: "Page Title" },
      sub: [
        { nodeId: "4790-206", label: "Contents Title Main" },
        { nodeId: "5784-48007", label: "Contents Title Sub" },
        { nodeId: "7544-663", label: "Contents Title Sub 2D" },
      ],
    },
  },
  {
    slug: "input",
    name: "Input",
    category: "Form Inputs",
    description:
      "텍스트 입력 필드. default/focus/filled/error/success 상태와 leading/trailing affix를 지원합니다.",
    tags: ["state", "tone", "affix"],
    figma: {
      primary: { nodeId: "4771-26367", label: "Input" },
      sub: [{ nodeId: "4783-27389", label: "TextArea" }],
    },
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Form Inputs",
    description: "다중 선택용 체크박스. checked/indeterminate/disabled 상태를 지원합니다.",
    tags: ["checked", "indeterminate"],
    figma: {
      primary: { nodeId: "17995-61456", label: "Checkbox Input" },
      sub: [{ nodeId: "17995-61510", label: "Checkbox" }],
    },
  },
  {
    slug: "radio",
    name: "Radio",
    category: "Form Inputs",
    description: "단일 선택용 라디오 버튼. group 컨텍스트로 제어됩니다.",
    tags: ["group", "state"],
    figma: {
      primary: { nodeId: "17995-61609", label: "Radio Input" },
      sub: [
        { nodeId: "17995-61649", label: "Radio" },
        { nodeId: "17995-61676", label: "Radio Group" },
      ],
    },
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Form Inputs",
    description: "On/Off 토글 스위치. size·tone·disabled 상태를 제공합니다.",
    tags: ["on/off", "size"],
    figma: {
      primary: { nodeId: "18001-55013", label: "Toggle Input" },
      sub: [{ nodeId: "18001-55053", label: "Toggle" }],
    },
  },
  {
    slug: "select",
    name: "Select",
    category: "Form Inputs",
    description: "옵션 드롭다운. size·state·tone을 제공하고 Input과 정합성 있는 변형을 제공합니다.",
    tags: ["dropdown", "state"],
    figma: {
      primary: { nodeId: "4811-29737", label: "Select (Trigger)" },
      sub: [
        { nodeId: "4811-36049", label: "Select Item" },
        { nodeId: "11959-26477", label: "Select List" },
      ],
    },
  },
  {
    slug: "datepicker",
    name: "DatePicker",
    category: "Form Inputs",
    description:
      "날짜/범위 선택 입력. 4축(size·tone·state·range) variant와 label·clearable 옵션을 제공합니다.",
    tags: ["single", "range", "tone"],
    figma: { primary: { nodeId: "5132-60197" } },
  },
  {
    slug: "form",
    name: "Form",
    category: "Form Inputs",
    description: "Label·Description·Input·Hint를 결합한 폼 필드 래퍼.",
    tags: ["field", "layout"],
    figma: { primary: { nodeId: "5714-108005" } },
  },
  {
    slug: "chips",
    name: "Chips",
    category: "Selection",
    description: "선택·필터·태그용 칩 컴포넌트. select/remove/counter 등 다양한 패턴을 지원합니다.",
    tags: ["filter", "removable"],
    figma: {
      primary: { nodeId: "17395-109177", label: "Chip Button" },
      sub: [
        { nodeId: "10800-7341", label: "Selectable Chip" },
        { nodeId: "10579-3844", label: "Search Chip" },
        { nodeId: "8416-600935", label: "Select Chip" },
        { nodeId: "4817-72138", label: "Input Chip" },
      ],
    },
  },
  {
    slug: "tab",
    name: "Tab",
    category: "Selection",
    description: "수평 탭 인터페이스. 기본·underline·pill 스타일과 상태를 제공합니다.",
    tags: ["horizontal", "state"],
    figma: {
      primary: { nodeId: "5185-210328", label: "Tab (level 1)" },
      sub: [
        { nodeId: "5185-211678", label: "Tab Alt" },
        { nodeId: "13282-12683", label: "Horizontal Group" },
        { nodeId: "13281-28922", label: "Vertical Group" },
      ],
    },
  },
  {
    slug: "table",
    name: "Table",
    category: "Data Display",
    description:
      "GridHeader + BodyCell로 구성되는 데이터 테이블. 선택·정렬·리치 콘텐츠(뱃지·링크·인풋 등)를 지원합니다.",
    tags: ["grid", "rich cells"],
    figma: {
      primary: { nodeId: "4456-290401", label: "Grid Header" },
      sub: [{ nodeId: "4456-290858", label: "Body Cell" }],
    },
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Data Display",
    description: "페이지 탐색 컴포넌트. 숫자·arrow·first/last 제어를 제공합니다.",
    tags: ["navigation"],
    figma: {
      primary: { nodeId: "5030-28833", label: "Pagination" },
      sub: [
        { nodeId: "5024-11276", label: "Prev" },
        { nodeId: "5024-92466", label: "Next" },
        { nodeId: "5024-92499", label: "Number" },
        { nodeId: "5024-92569", label: "Ellipsis" },
      ],
    },
  },
  {
    slug: "empty",
    name: "Empty",
    category: "Layout",
    description: "빈 상태 placeholder. 일러스트·제목·설명·액션을 조합합니다.",
    tags: ["placeholder"],
    figma: { primary: { nodeId: "12368-26042" } },
  },
  {
    slug: "scroll",
    name: "Scroll",
    category: "Layout",
    description: "커스텀 스크롤 래퍼. 세로·가로 스크롤 표현을 일관되게 유지합니다.",
    tags: ["scroll"],
    figma: { primary: { nodeId: "5250-17591" } },
  },
  {
    slug: "loader",
    name: "Loader",
    category: "Layout",
    description:
      "비동기 작업 대기 상태를 나타내는 Circle loading 스피너. mint · gray · white 색상 프리셋과 3단계 크기를 지원합니다.",
    tags: ["spinner", "loading", "progress"],
    figma: { primary: { nodeId: "13289-46891" } },
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Layout",
    description:
      "Hover · Focus 시 요소에 대한 보조 설명을 보여주는 컴포넌트. 4방향 위치와 화살표 on/off, Title+Text 조합 및 Help 아이콘 변형을 지원합니다.",
    tags: ["popover", "hover", "help"],
    figma: {
      primary: { nodeId: "5543-321819", label: "Tooltip" },
      sub: [{ nodeId: "13300-13569", label: "Help Icon with Tooltip" }],
    },
  },
  {
    slug: "playbookcontrolbar",
    name: "Playback Control Bar",
    category: "Media",
    description:
      "타임 필·프로그레스·전체화면·더보기. onSeek / onFullscreen / onMore 콜백.",
    tags: ["video", "controls"],
    figma: { primary: { nodeId: "17423-438" } },
  },
];

export const BY_SLUG = Object.fromEntries(
  COMPONENTS.map((c) => [c.slug, c])
) as Record<string, ComponentEntry>;

export const BY_CATEGORY: Record<ComponentCategory, ComponentEntry[]> =
  CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = COMPONENTS.filter((c) => c.category === cat);
      return acc;
    },
    {} as Record<ComponentCategory, ComponentEntry[]>
  );
