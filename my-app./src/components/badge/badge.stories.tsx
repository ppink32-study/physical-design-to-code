import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import {
  Badge,
  type BadgeVariant,
  type BadgeLineColor,
  type BadgeNoticeColor,
  type BadgeShape,
  type BadgeSize,
  type BadgeSolidColor,
  type BadgeStatusColor,
} from "./badge";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyDocsGuideTableStyle,
  storyDocsGuideTdStyle,
  storyDocsGuideThStyle,
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/* =================================================================
 * Icon helper (mask-image + currentColor)
 *   Button / Label 과 동일한 패턴으로, SVG 를 자동으로 텍스트 색상에
 *   맞춰 틴트한다.
 * =============================================================== */
function Icon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden="true" style={style} />;
}

const GearIcon = ({ size = 16 }: { size?: number }) => (
  <Icon src="/icon/Gear.svg" size={size} />
);

/* =================================================================
 * Meta
 *   title: "Components/Badge" 아래 스토리.
 *     ├─ Default — Controls + 단일 프리뷰
 *     ├─ Matrix
 *     └─ Guideline
 * =============================================================== */
const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: { disable: true },
    controls: { sort: "none" },
  },
  argTypes: {
    variant: {
      name: "Type",
      description: "solid · line · status · notice",
      control: "inline-radio",
      options: ["solid", "line", "status", "notice"] satisfies BadgeVariant[],
    },
    size: { control: "inline-radio", options: ["xs", "sm", "lg"] },
    shape: { control: "inline-radio", options: ["square", "round"] },
    dot: { control: "boolean" },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

/* =================================================================
 * Layout helpers
 * =============================================================== */
const rowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const sectionLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
  fontWeight: 500,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

/** Figma Badge 시트 — 행=Size·Shape, 열=Color (가로 스크롤) */
const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixCellStyle = storyMatrixCellStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;

/* =================================================================
 * Color lists
 * =============================================================== */
const SOLID_COLORS: BadgeSolidColor[] = [
  "primary",
  "purple",
  "red",
  "green",
  "orange",
  "pink",
  "blue",
  "cyan",
  "gray",
  "opacity",
];

const LINE_COLORS: BadgeLineColor[] = [
  "gray",
  "purple",
  "cyan",
  "green",
  "red",
  "orange",
  "pink",
  "blue",
  "teal",
  "magenta",
  "gold",
];

const STATUS_COLORS: BadgeStatusColor[] = [
  "cyan",
  "blue",
  "yellow",
  "pink",
  "purple",
  "green",
  "red",
  "gray",
  "orange",
];

const NOTICE_COLORS: BadgeNoticeColor[] = ["red", "purple", "primary"];

const SOLID_MATRIX_ROWS: Array<{
  id: string;
  label: string;
  size: BadgeSize;
  shape: BadgeShape;
}> = [
  { id: "lg-sq", label: "Large · Square", size: "lg", shape: "square" },
  { id: "lg-rd", label: "Large · Round", size: "lg", shape: "round" },
  { id: "sm-sq", label: "Small · Square", size: "sm", shape: "square" },
  { id: "sm-rd", label: "Small · Round", size: "sm", shape: "round" },
  { id: "xs-sq", label: "xSmall · Square", size: "xs", shape: "square" },
  { id: "xs-rd", label: "xSmall · Round", size: "xs", shape: "round" },
];

const LINE_MATRIX_ROWS: Array<{
  id: string;
  label: string;
  size: BadgeSize;
  shape: BadgeShape;
}> = [
  { id: "lg-sq", label: "Large · Square", size: "lg", shape: "square" },
  { id: "lg-rd", label: "Large · Round", size: "lg", shape: "round" },
  { id: "sm-sq", label: "Small · Square", size: "sm", shape: "square" },
  { id: "sm-rd", label: "Small · Round", size: "sm", shape: "round" },
];

const STATUS_MATRIX_ROWS: Array<{
  id: string;
  label: string;
  size: BadgeSize;
  shape: BadgeShape;
  count?: number;
}> = [
  { id: "lg-sq", label: "Large · Square", size: "lg", shape: "square" },
  { id: "lg-rd", label: "Large · Round", size: "lg", shape: "round", count: 1 },
  { id: "sm-sq", label: "Small · Square", size: "sm", shape: "square" },
  { id: "sm-rd", label: "Small · Round", size: "sm", shape: "round", count: 1 },
];

function matrixColorHeaderLabel(id: string): string {
  if (id === "opacity") return "Opacity";
  return id.charAt(0).toUpperCase() + id.slice(1);
}

const NOTICE_COUNT_MATRIX_ROWS: Array<{ id: string; label: string; count: number }> = [
  { id: "c0", label: "count = 0", count: 0 },
  { id: "c1", label: "count = 1", count: 1 },
  { id: "c42", label: "count = 42", count: 42 },
  { id: "c98", label: "count = 98", count: 98 },
  { id: "c99", label: "count = 99 (+99)", count: 99 },
  { id: "c100", label: "count = 100 (+99)", count: 100 },
  { id: "c999", label: "count = 999 (+99)", count: 999 },
];

/* =================================================================
 * 0. Playground — Figma Properties 패널과 동일한 형식의 Controls
 *   Size · Color · Style · Text · Icon View · Icon
 * =============================================================== */

type PlaygroundIconKey = "Gear" | "Add" | "Check" | "Search";

const PLAYGROUND_ICON_NODES: Record<PlaygroundIconKey, ReactNode> = {
  Gear: <Icon src="/icon/Gear.svg" />,
  Add: <Icon src="/icon/Add.svg" />,
  Check: <Icon src="/icon/Check.svg" />,
  Search: <Icon src="/icon/Search.svg" />,
};

type BadgePlaygroundArgs = {
  variant: BadgeVariant;
  size: BadgeSize;
  color: BadgeSolidColor;
  shape: BadgeShape;
  children: string;
  iconView: boolean;
  iconName: PlaygroundIconKey;
};

export const Playground: StoryObj<BadgePlaygroundArgs> = {
  parameters: {
    /**
     * Figma Properties 패널과 동일한 순서·라벨로 노출.
     * `include` 는 argTypes 의 `name` 과 일치해야 함.
     */
    controls: {
      sort: "none",
      include: [
        "Type",
        "Size",
        "Color",
        "Style",
        "Text",
        "Icon View",
        "Icon",
      ],
    },
  },
  argTypes: {
    variant: {
      name: "Type",
      description: "Solid, Line, Status Badge, Notice",
      options: ["Solid", "Line", "Status Badge", "Notice"],
      mapping: {
        Solid: "solid",
        Line: "line",
        "Status Badge": "status",
        Notice: "notice",
      } satisfies Record<string, BadgeVariant>,
      control: "inline-radio",
    },
    size: {
      name: "Size",
      description: "S, L, xS",
      options: ["S", "L", "xS"],
      mapping: {
        S: "sm",
        L: "lg",
        xS: "xs",
      } satisfies Record<string, BadgeSize>,
      control: "inline-radio",
    },
    color: {
      name: "Color",
      description: "Purple, Primary, Red, Green, Orange, Pink, Blue, Cyan, Gray, Opacity",
      options: [
        "Purple",
        "Primary",
        "Red",
        "Green",
        "Orange",
        "Pink",
        "Blue",
        "Cyan",
        "Gray",
        "Opacity",
      ],
      mapping: {
        Purple: "purple",
        Primary: "primary",
        Red: "red",
        Green: "green",
        Orange: "orange",
        Pink: "pink",
        Blue: "blue",
        Cyan: "cyan",
        Gray: "gray",
        Opacity: "opacity",
      } satisfies Record<string, BadgeSolidColor>,
      control: "select",
    },
    shape: {
      name: "Style",
      description: "Square, Round",
      options: ["Square", "Round"],
      mapping: {
        Square: "square",
        Round: "round",
      } satisfies Record<string, BadgeShape>,
      control: "inline-radio",
    },
    children: {
      name: "Text",
      control: "text",
    },
    iconView: {
      name: "Icon View",
      description: "True / False",
      control: "boolean",
    },
    iconName: {
      name: "Icon",
      description: "Gear, Add, Check, Search",
      options: ["Gear", "Add", "Check", "Search"] satisfies PlaygroundIconKey[],
      control: "select",
    },
  },
  render: function PlaygroundRender(args) {
    return (
      <StoryPlaygroundFrame>
        <Badge
          variant={args.variant}
          size={args.size}
          color={args.color}
          shape={args.shape}
          icon={args.iconView ? PLAYGROUND_ICON_NODES[args.iconName] : undefined}
        >
          {args.children}
        </Badge>
      </StoryPlaygroundFrame>
    );
  },
  args: {
    variant: "solid",
    size: "lg",
    color: "primary",
    shape: "square",
    children: "Badge",
    iconView: false,
    iconName: "Gear",
  },
};

/* =================================================================
 * 1. Matrix
 *   Figma Badge 시트: 행 = Size·Shape, 열 = Color (Solid / Line / Status / Notice).
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Badge"
      description="Solid·Line·Status·Notice별로 Size·Shape 축과 색상 팔레트를 비교합니다. Line은 아이콘+텍스트, Status Round 행에는 count=1 예시, Notice는 count 규칙과 red/purple 열을 보여줍니다."
      figmaNode="17976-110564"
    >
      <FigmaLinkCard
        nodeId="17976-110564"
        caption="Components / Badge — Solid · Line · Status · Notice 매트릭스 원본"
      />

      <SectionFrame title="Badge / Solid — 텍스트만 (24 · 20 · 16px)">
        <div style={matrixScrollWrap}>
          <table style={matrixTableBase}>
            <thead>
              <tr>
                <th
                  style={{
                    ...matrixColHeaderStyle,
                    ...matrixStickyCornerStyle,
                    minWidth: 140,
                    zIndex: 2,
                  }}
                />
                {SOLID_COLORS.map((c) => (
                  <th key={c} style={matrixColHeaderStyle}>
                    {matrixColorHeaderLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOLID_MATRIX_ROWS.map((row) => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{
                      ...matrixRowHeaderStyle,
                      ...matrixStickyCornerStyle,
                    }}
                  >
                    {row.label}
                  </th>
                  {SOLID_COLORS.map((c) => (
                    <td key={c} style={matrixCellStyle}>
                      <Badge variant="solid" color={c} size={row.size} shape={row.shape}>
                        Badge
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionFrame>

      <SectionFrame title="Badge / Line — 아이콘 + 텍스트 (Large · Small)">
        <div style={matrixScrollWrap}>
          <table style={matrixTableBase}>
            <thead>
              <tr>
                <th
                  style={{
                    ...matrixColHeaderStyle,
                    ...matrixStickyCornerStyle,
                    minWidth: 140,
                    zIndex: 2,
                  }}
                />
                {LINE_COLORS.map((c) => (
                  <th key={c} style={matrixColHeaderStyle}>
                    {matrixColorHeaderLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LINE_MATRIX_ROWS.map((row) => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{
                      ...matrixRowHeaderStyle,
                      ...matrixStickyCornerStyle,
                    }}
                  >
                    {row.label}
                  </th>
                  {LINE_COLORS.map((c) => (
                    <td key={c} style={matrixCellStyle}>
                      <Badge
                        variant="line"
                        color={c}
                        size={row.size}
                        shape={row.shape}
                        icon={<GearIcon size={row.size === "lg" ? 16 : 12} />}
                      >
                        Badge
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionFrame>

      <SectionFrame title="Badge / Status — dot + 라벨 (Round 행에 count)">
        <div style={matrixScrollWrap}>
          <table style={matrixTableBase}>
            <thead>
              <tr>
                <th
                  style={{
                    ...matrixColHeaderStyle,
                    ...matrixStickyCornerStyle,
                    minWidth: 140,
                    zIndex: 2,
                  }}
                />
                {STATUS_COLORS.map((c) => (
                  <th key={c} style={matrixColHeaderStyle}>
                    {matrixColorHeaderLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATUS_MATRIX_ROWS.map((row) => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{
                      ...matrixRowHeaderStyle,
                      ...matrixStickyCornerStyle,
                    }}
                  >
                    {row.label}
                  </th>
                  {STATUS_COLORS.map((c) => (
                    <td key={c} style={matrixCellStyle}>
                      <Badge
                        variant="status"
                        color={c}
                        size={row.size}
                        shape={row.shape}
                        count={row.count}
                      >
                        Badge
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionFrame>

      <SectionFrame title="Badge / Notice — red · purple · primary (+99 규칙)">
        <div style={matrixScrollWrap}>
          <table style={matrixTableBase}>
            <thead>
              <tr>
                <th
                  style={{
                    ...matrixColHeaderStyle,
                    ...matrixStickyCornerStyle,
                    minWidth: 160,
                    zIndex: 2,
                  }}
                />
                {NOTICE_COLORS.map((c) => (
                  <th key={c} style={matrixColHeaderStyle}>
                    {matrixColorHeaderLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NOTICE_COUNT_MATRIX_ROWS.map((row) => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{
                      ...matrixRowHeaderStyle,
                      ...matrixStickyCornerStyle,
                    }}
                  >
                    {row.label}
                  </th>
                  {NOTICE_COLORS.map((c) => (
                    <td key={c} style={matrixCellStyle}>
                      <Badge variant="notice" color={c} count={row.count} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionFrame>

      <SectionFrame title="추가 확인 — 옵션 조합">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={sectionLabelStyle}>Solid · size xs / sm / lg · primary</div>
            <div style={rowStyle}>
              {(["xs", "sm", "lg"] as const).map((s) => (
                <Badge key={s} variant="solid" color="primary" size={s}>
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div style={sectionLabelStyle}>Status · dot on / off · green</div>
            <div style={rowStyle}>
              <Badge variant="status" color="green" size="lg" dot>
                dot
              </Badge>
              <Badge variant="status" color="green" size="lg" dot={false}>
                no dot
              </Badge>
            </div>
          </div>
          <div>
            <div style={sectionLabelStyle}>Solid · blue · 아이콘 유무</div>
            <div style={rowStyle}>
              <Badge variant="solid" color="blue" size="lg">
                text only
              </Badge>
              <Badge variant="solid" color="blue" size="lg" icon={<GearIcon size={16} />}>
                + icon
              </Badge>
            </div>
          </div>
        </div>
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};

/* =================================================================
 * 2. Guideline
 *   개요 · Variant 선택 기준 · 간격(4px).
 * =============================================================== */
const guideBlockStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid var(--border-border-surface-border-surface)",
  background: "var(--context-background-surface-bg-surface-base)",
};

const guideTableStyle = storyDocsGuideTableStyle;
const thStyle = storyDocsGuideThStyle;
const tdStyle = storyDocsGuideTdStyle;

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Badge" description="개요·variant 기준·간격입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          Badge 는 상태, 카테고리, 알림 카운트 등 짧은 메타 정보를 강조해 전달하기 위한 작은
          라벨입니다. 단독으로 또는 리스트/카드/내비게이션 항목의 보조 요소로 사용합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Variant 선택 기준">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Variant</th>
                <th style={thStyle}>쓰임</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <Badge variant="solid" color="primary" size="lg">
                    Solid
                  </Badge>
                </td>
                <td style={tdStyle}>
                  카테고리 · 태그 · 강조 라벨. 본문 대비 강하게 돋보이게
                  표시하고 싶을 때.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <Badge variant="line" color="gray" size="lg">
                    Line
                  </Badge>
                </td>
                <td style={tdStyle}>
                  Solid 보다 약한 톤. 일반 태그 / 메타 정보에 사용.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <Badge variant="status" color="green" size="lg">
                    Status
                  </Badge>
                </td>
                <td style={tdStyle}>
                  dot + 텍스트로 진행/연결 상태 등 "상태" 를 표시.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Badge variant="notice" color="red" count={3} />
                    <Badge variant="notice" color="purple" count={99} />
                    <Badge variant="notice" color="primary" count={1} />
                  </div>
                </td>
                <td style={tdStyle}>
                  알림 · 메시지 카운트(1~98 그대로, 99+ 는 +99). 아이콘 상단 우측에 겹쳐
                  사용. 좌우 패딩 <StoryDocsInlineCode>4px</StoryDocsInlineCode>,
                  최소 너비 <StoryDocsInlineCode>15px</StoryDocsInlineCode>.
                  색상: red · purple · primary(teal).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="간격">
        <div style={guideBlockStyle}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>
            여러 Badge 를 나란히 배치할 때, Badge 와 Badge 사이 간격은{" "}
            <StoryDocsInlineCode>4px</StoryDocsInlineCode> 입니다.
          </p>
          <div style={{ ...sectionLabelStyle, marginBottom: 8 }}>
            예시 — flex + gap: 4px
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Badge variant="line" color="gray" size="lg">
              Tag
            </Badge>
            <Badge variant="line" color="blue" size="lg">
              Tag
            </Badge>
            <Badge variant="line" color="green" size="lg">
              Tag
            </Badge>
            <Badge variant="line" color="purple" size="lg">
              Tag
            </Badge>
          </div>
        </div>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
