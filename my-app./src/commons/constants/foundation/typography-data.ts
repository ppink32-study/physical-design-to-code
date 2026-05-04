/**
 * Figma 노드 4441-564831 "System Base / Foundation / 2.Typography_2-1" 의
 * 표 구성을 그대로 옮긴 데이터.
 *
 * Weight·Size·LineHeight 는 현재 `src/commons/constants/css/typography.css` 의
 * 토큰 체계에 맞춰 표기합니다 (regular 400 / medium 500 / semibold 600 / bold 700).
 */

export type WeightKey = "regular" | "medium" | "semibold" | "bold";

export const WEIGHT_VALUE: Record<WeightKey, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const WEIGHT_LABEL: Record<WeightKey, string> = {
  regular: "Regular (400)",
  medium: "Medium (500)",
  semibold: "Semi-Bold (600)",
  bold: "Bold (700)",
};

export type WeightCard = {
  id: WeightKey;
  /** Figma 카드 제목 */
  title: string;
  /** Figma 카드 설명 */
  description: string;
};

/** Section 1 — Font Weight cards */
export const WEIGHT_CARDS: WeightCard[] = [
  {
    id: "bold",
    title: "Bold 700",
    description: "Font weight used for the most emphasized text",
  },
  {
    id: "semibold",
    title: "Semi-Bold 600",
    description: "Font weight used for emphasized text",
  },
  {
    id: "medium",
    title: "Medium 500",
    description: "Font weight used for lightly emphasized text",
  },
  {
    id: "regular",
    title: "Regular 400",
    description: "Font weight used for regular text",
  },
];

export type TypographyRow = {
  /** 표에 노출되는 이름 (Figma 의 cell 그대로) */
  name: string;
  /** Headline / Body */
  category: "Headline" | "Body";
  /** Usage 컬럼 본문 */
  usage: string;
  /** Weight 토큰 */
  weight: WeightKey;
  /** font-size px */
  sizePx: number;
  /** line-height px */
  lineHeightPx: number;
  /** 다운로드 CSS / 미리보기에서 사용하는 클래스 이름. */
  className: string;
  /** Guideline 표에서 표준 본문으로 뱃지·행 강조 */
  standard?: boolean;
  /**
   * Figma letter-spacing 퍼센트 값 (Md=-0.4%, Sm=-0.5%).
   * 미지정 = letter-spacing 없음(0 or normal).
   * CSS 환산: sizePx × (value/100) → 예) 13px × -0.4% = -0.052px
   */
  letterSpacingPct?: "-0.4%" | "-0.5%";
};

/** Section 2 — Headline 표 (Figma 9행) */
export const HEADLINE_ROWS: TypographyRow[] = [
  {
    name: "H1",
    category: "Headline",
    usage: "Titles and copy used within the Visual Key Screen e.g) Studio",
    weight: "bold",
    sizePx: 36,
    lineHeightPx: 48,
    className: "typography-h1",
  },
  {
    name: "H2 - SemiB",
    category: "Headline",
    usage: "Dashboard Page Title",
    weight: "semibold",
    sizePx: 28,
    lineHeightPx: 36,
    className: "typography-h2-semibold",
  },
  {
    name: "H2 - Regular",
    category: "Headline",
    usage: "—",
    weight: "regular",
    sizePx: 28,
    lineHeightPx: 36,
    className: "typography-h2-regular",
  },
  {
    name: "H3",
    category: "Headline",
    usage: "Page titles excluding the dashboard",
    weight: "semibold",
    sizePx: 24,
    lineHeightPx: 32,
    className: "typography-h3",
  },
  {
    name: "H4",
    category: "Headline",
    usage: "Main titles for content and modules",
    weight: "semibold",
    sizePx: 20,
    lineHeightPx: 24,
    className: "typography-h4",
  },
  {
    name: "H5 - SemiB",
    category: "Headline",
    usage: "Card and container titles",
    weight: "semibold",
    sizePx: 18,
    lineHeightPx: 24,
    className: "typography-h5-semibold",
  },
  {
    name: "H5 - Medium",
    category: "Headline",
    usage: "Card and container titles",
    weight: "medium",
    sizePx: 18,
    lineHeightPx: 24,
    className: "typography-h5-medium",
  },
  {
    name: "H6 - SemiB",
    category: "Headline",
    usage: "Card and container titles",
    weight: "semibold",
    sizePx: 16,
    lineHeightPx: 22,
    className: "typography-h6-semibold",
  },
  {
    name: "H6 - Medium",
    category: "Headline",
    usage: "Card and container titles",
    weight: "medium",
    sizePx: 16,
    lineHeightPx: 22,
    className: "typography-h6-medium",
  },
];

/** Section 3 — Body 표 (Figma 12행) */
export const BODY_ROWS: TypographyRow[] = [
  {
    name: "Xl_Regular",
    category: "Body",
    usage:
      "시스템 내 본문 중 강조가 필요한 내용에 사용 e.g 페이지 컨트롤 버튼(Button-Large), 지식 탐색 Chat",
    weight: "regular",
    sizePx: 18,
    lineHeightPx: 28,
    className: "typography-body-xl-regular",
  },
  {
    name: "Lg_SemiB",
    category: "Body",
    usage:
      "시스템 내 본문 중 강조가 필요한 내용에 사용 e.g 페이지 컨트롤 버튼(Button-Large), 지식 탐색 Chat",
    weight: "semibold",
    sizePx: 16,
    lineHeightPx: 24,
    className: "typography-body-lg-semibold",
  },
  {
    name: "Lg_Regular",
    category: "Body",
    usage:
      "Applied to areas that require more emphasis than standard text, such as message components. e.g Alert, Snackbar, message text",
    weight: "regular",
    sizePx: 16,
    lineHeightPx: 24,
    className: "typography-body-lg-regular",
  },
  {
    name: "Base_Bold",
    category: "Body",
    usage: "Applied when emphasis is needed within standard body text.",
    weight: "bold",
    sizePx: 14,
    lineHeightPx: 20,
    className: "typography-body-base-bold",
  },
  {
    name: "Base_SemiB",
    category: "Body",
    usage: "Text for the default button (Button-Medium)",
    weight: "semibold",
    sizePx: 14,
    lineHeightPx: 20,
    className: "typography-body-base-semibold",
  },
  {
    name: "Base_Regular",
    category: "Body",
    usage: "Standard body text",
    weight: "regular",
    sizePx: 14,
    lineHeightPx: 20,
    className: "typography-body-base-regular",
    standard: true,
  },
  {
    name: "Md_SemiB",
    category: "Body",
    usage: "본문의 기본 텍스트 중 링크 기능이 필요할 때 적용",
    weight: "semibold",
    sizePx: 13,
    lineHeightPx: 20,
    className: "typography-body-md-semibold",
    letterSpacingPct: "-0.4%",
  },
  {
    name: "Md-Medium",
    category: "Body",
    usage: "본문의 기본 텍스트 중 링크 기능이 필요할 때 적용",
    weight: "medium",
    sizePx: 13,
    lineHeightPx: 20,
    className: "typography-body-md-medium",
    letterSpacingPct: "-0.4%",
  },
  {
    name: "Md-Regular",
    category: "Body",
    usage: "Label(Search, Form)",
    weight: "regular",
    sizePx: 13,
    lineHeightPx: 20,
    className: "typography-body-md-regular",
    letterSpacingPct: "-0.4%",
  },
  {
    name: "Sm-SemiB",
    category: "Body",
    usage:
      "Applied to areas that are displayed smaller than the standard body text. e.g Hint Text",
    weight: "semibold",
    sizePx: 12,
    lineHeightPx: 16,
    className: "typography-body-sm-semibold",
    letterSpacingPct: "-0.5%",
  },
  {
    name: "Sm-Medium",
    category: "Body",
    usage: "Applied to supplementary descriptions such as captions and hint text.",
    weight: "medium",
    sizePx: 12,
    lineHeightPx: 16,
    className: "typography-body-sm-medium",
    letterSpacingPct: "-0.5%",
  },
  {
    name: "Xs-Medium",
    category: "Body",
    usage: "Used for small-sized badges and similar elements.",
    weight: "medium",
    sizePx: 11,
    lineHeightPx: 14,
    className: "typography-body-xs-medium",
  },
];

export const ALL_ROWS: TypographyRow[] = [...HEADLINE_ROWS, ...BODY_ROWS];
