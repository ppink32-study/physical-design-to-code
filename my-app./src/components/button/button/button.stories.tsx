import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment } from "react";

import {
  Button,
  type ButtonForceState,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from "./button";
import { Divider } from "@/components/divider/divider";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsNote,
  StoryDocsPage,
  StoryDocsPanel,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/* -----------------------------------------------------------------
 * Icon helper (mask-image + currentColor)
 *   - SVG 아이콘이 부모 텍스트 색상을 자동으로 따르게 만드는 유틸
 * --------------------------------------------------------------- */
function Icon({ src, size }: { src: string; size?: number }) {
  // size 가 지정되지 않으면 부모 컨테이너(.icon) 크기를 그대로 채운다.
  // 이렇게 하면 Button 의 `--btn-icon-size` (size 별 16/20/24) 가 그대로 반영된다.
  const dim = size !== undefined ? `${size}px` : "100%";
  const style: CSSProperties = {
    display: "inline-block",
    width: dim,
    height: dim,
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

const AddIcon = ({ size }: { size?: number }) => (
  <Icon src="/icon/Add.svg" size={size} />
);
const SearchIcon = ({ size }: { size?: number }) => (
  <Icon src="/icon/Search.svg" size={size} />
);
const MinusIcon = ({ size }: { size?: number }) => (
  <Icon src="/icon/Minus.svg" size={size} />
);

/* -----------------------------------------------------------------
 * Controls 에서 leftIcon/rightIcon 을 on/off 할 수 있도록
 * storybook 의 `mapping` 기능으로 key → ReactNode 를 매핑한다.
 * --------------------------------------------------------------- */
const ICON_OPTIONS = ["none", "add", "search"] as const;
const ICON_MAPPING = {
  none: undefined,
  add: <AddIcon />,
  search: <SearchIcon />,
};

/* -----------------------------------------------------------------
 * Meta
 * --------------------------------------------------------------- */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary-solid",
        "primary-2-solid",
        "primary-outline",
        "primary-ghost",
        "secondary-solid",
        "secondary-outline",
        "secondary-outline-white-invert",
        "secondary-outline-dark-invert",
        "secondary-ghost",
        "gray",
      ] satisfies ButtonVariant[],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large", "xlarge"] satisfies ButtonSize[],
    },
    shape: {
      control: "inline-radio",
      options: ["square", "round"] satisfies ButtonShape[],
    },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "hover", "disable"],
    },
    leftIcon: {
      control: { type: "select" },
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      description: "왼쪽 아이콘 (none/add/search)",
    },
    rightIcon: {
      control: { type: "select" },
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      description: "오른쪽 아이콘 (none/add/search)",
    },
    iconOnly: {
      control: "boolean",
      description:
        "true 면 아이콘만 렌더링합니다. leftIcon/rightIcon 중 하나는 선택되어 있어야 합니다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    variant: "primary-solid",
    size: "large",
    shape: "square",
    children: "Button",
  },
};

/* =================================================================
 * Matrix — Figma 시트(node 17987-47864) 그대로 재현
 *   · 10 Type × {라벨, 아이콘 only} 두 셀이 한 컬럼을 구성
 *   · 행: Size (L/M/S, xLarge 별도) × State (Default/Hover/Disable)
 *   · Square / Round 두 섹션
 *   · Round 는 Ghost·Gray 제외, xLarge 는 Square 전용 (Primary Solid + Primary 2 Solid + Gray)
 *   · Dark Invert · White Invert 컬럼은 Figma 와 동일하게 배경 띠 적용
 * =============================================================== */

type ColumnDef = {
  key: ButtonVariant;
  label: string;
  /** Figma 에서 컬럼 자체에 깔린 배경(Dark / White Invert) */
  bg?: "dark" | "lightPink";
};

const SQUARE_COLUMNS: ColumnDef[] = [
  { key: "primary-solid", label: "Primary Solid" },
  { key: "primary-2-solid", label: "Primary 2 Solid" },
  { key: "secondary-solid", label: "Secondary Solid" },
  { key: "secondary-outline-dark-invert", label: "Sec Outline · Dark Invert", bg: "dark" },
  { key: "primary-outline", label: "Primary Outline" },
  { key: "secondary-outline", label: "Secondary Outline" },
  { key: "secondary-outline-white-invert", label: "Sec Outline · White Invert", bg: "lightPink" },
  { key: "primary-ghost", label: "Primary Ghost" },
  { key: "secondary-ghost", label: "Secondary Ghost" },
  { key: "gray", label: "Gray button" },
];

/** Round 시트는 Ghost / Gray 미정의 */
const ROUND_COLUMNS: ColumnDef[] = SQUARE_COLUMNS.filter(
  (c) => c.key !== "primary-ghost" && c.key !== "secondary-ghost" && c.key !== "gray",
);

/** xLarge 시트는 Square 전용, Primary Solid + Primary 2 Solid + Gray 만 정의 */
const XLARGE_COLUMNS: ColumnDef[] = SQUARE_COLUMNS.filter(
  (c) => c.key === "primary-solid" || c.key === "primary-2-solid" || c.key === "gray",
);

const STATE_ROWS: Array<{ key: string; label: string; force: ButtonForceState }> = [
  { key: "default", label: "Default", force: "default" },
  { key: "hover", label: "Hover & Pressed", force: "hover" },
  { key: "disable", label: "Disable", force: "disable" },
];

const SIZE_GROUPS: Array<{ key: ButtonSize; label: string }> = [
  { key: "large", label: "Large (40)" },
  { key: "medium", label: "Medium (32)" },
  { key: "small", label: "Small (24)" },
];

const COLUMN_BG: Record<NonNullable<ColumnDef["bg"]>, string> = {
  dark: "var(--context-background-gray-bg-darkgray-hover, #26282E)",
  lightPink: "#FBEEEF",
};

const matrixScrollStyle: CSSProperties = {
  overflowX: "auto",
  paddingBottom: 4,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--context-foreground-surface-on-surface-base)",
  marginBottom: 8,
};

const sectionDescStyle: CSSProperties = {
  fontSize: 14,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  margin: "0 0 20px",
  lineHeight: 1.65,
};

const columnHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "10px 12px",
  whiteSpace: "nowrap",
  textAlign: "left",
};

/** Size·State 열 — 긴 상태명(Hover & Pressed) + 버튼 사이 여유 */
const matrixRowLabelColumnPadding = "10px 24px 10px 16px";

const rowLabelStyle: CSSProperties = {
  fontSize: 11,
  color: "var(--context-foreground-surface-on-surface-hint)",
  padding: matrixRowLabelColumnPadding,
  whiteSpace: "nowrap",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
};

const sizeBandStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-base)",
  padding: "12px 16px",
  background: "var(--context-background-neutral-bg-neutral-secondary, #F4F4F5)",
  borderTop: "1px solid var(--border-border-surface-border-surface-secondary)",
  borderBottom: "1px solid var(--border-border-surface-border-surface-secondary)",
  whiteSpace: "nowrap",
};

const cellWrapStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
};

const ROW_LABEL_WIDTH = 200;
const COL_WIDTH = 220;
const COL_WIDTH_NO_ICON_ONLY = 160; // Gray button 컬럼은 icon-only 미정의

function getColWidth(c: ColumnDef): number {
  return c.key === "gray" ? COL_WIDTH_NO_ICON_ONLY : COL_WIDTH;
}

function getTotalWidth(columns: ColumnDef[]): number {
  return ROW_LABEL_WIDTH + columns.reduce((acc, c) => acc + getColWidth(c), 0);
}

/** 한 셀: Figma 와 동일하게 [라벨 버튼] + [icon-only 버튼] 한 쌍 */
function MatrixCell({
  column,
  size,
  shape,
  state,
}: {
  column: ColumnDef;
  size: ButtonSize;
  shape: ButtonShape;
  state: ButtonForceState;
}) {
  const ariaLabel = `${column.label} ${size} ${shape} ${state}`;
  return (
    <div style={{ ...cellWrapStyle, width: getColWidth(column) }}>
      <Button
        variant={column.key}
        size={size}
        shape={shape}
        forceState={state}
        leftIcon={<SearchIcon />}
      >
        Button
      </Button>
      {column.key === "gray" ? null : (
        <Button
          variant={column.key}
          size={size}
          shape={shape}
          forceState={state}
          iconOnly
          leftIcon={<SearchIcon />}
          aria-label={`${ariaLabel} icon only`}
        />
      )}
    </div>
  );
}

function SizeBlock({
  columns,
  size,
  shape,
}: {
  columns: ColumnDef[];
  size: ButtonSize;
  shape: ButtonShape;
}) {
  const totalWidth =
    ROW_LABEL_WIDTH + columns.reduce((acc, c) => acc + getColWidth(c), 0);

  return (
    <div style={{ position: "relative", minWidth: totalWidth }}>
      {/* 컬럼 배경 띠 (Dark / White Invert) - 라벨 영역 제외하고 컬럼 폭만큼 */}
    <div
        aria-hidden
      style={{
          position: "absolute",
          inset: 0,
          left: ROW_LABEL_WIDTH,
          display: "grid",
          gridTemplateColumns: columns.map((c) => `${getColWidth(c)}px`).join(" "),
          pointerEvents: "none",
        }}
      >
        {columns.map((c) => (
          <div
            key={`bg-${c.key}`}
            style={{ background: c.bg ? COLUMN_BG[c.bg] : "transparent" }}
          />
        ))}
      </div>

      {/* 실제 행들 */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {STATE_ROWS.map((s) => (
          <div
            key={s.key}
            style={{
              display: "grid",
              gridTemplateColumns: `${ROW_LABEL_WIDTH}px ${columns
                .map((c) => `${getColWidth(c)}px`)
                .join(" ")}`,
              alignItems: "center",
              borderTop: "1px solid var(--border-border-surface-border-surface-secondary)",
            }}
          >
            <div style={rowLabelStyle}>
              {size} · {s.label}
            </div>
            {columns.map((c) => (
              <MatrixCell
                key={`${c.key}-${size}-${s.key}`}
                column={c}
                size={size}
                shape={shape}
                state={s.force}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixHeader({ columns }: { columns: ColumnDef[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${ROW_LABEL_WIDTH}px ${columns
          .map((c) => `${getColWidth(c)}px`)
          .join(" ")}`,
        background: "var(--context-background-surface-bg-surface-base)",
      }}
    >
      <div style={{ ...columnHeaderStyle, padding: matrixRowLabelColumnPadding }}>
        Size · State
      </div>
      {columns.map((c) => (
        <div
          key={`h-${c.key}`}
          style={{
            ...columnHeaderStyle,
            background: c.bg ? COLUMN_BG[c.bg] : "transparent",
            color: c.bg === "dark" ? "#F4F4F5" : columnHeaderStyle.color,
          }}
        >
          {c.label}
        </div>
      ))}
    </div>
  );
}

function MatrixSection({
  title,
  description,
  columns,
  shape,
  sizes,
}: {
  title: string;
  description: string;
  columns: ColumnDef[];
  shape: ButtonShape;
  sizes: Array<{ key: ButtonSize; label: string }>;
}) {
  return (
    <section>
      <div style={sectionTitleStyle}>{title}</div>
      <p style={sectionDescStyle}>{description}</p>
      <StoryDocsPanel>
        <div style={matrixScrollStyle}>
          <MatrixHeader columns={columns} />
          {sizes.map(({ key, label }, idx) => (
            <Fragment key={key}>
              <div
                style={{
                  ...sizeBandStyle,
                  minWidth: getTotalWidth(columns),
                  borderTop:
                    idx === 0
                      ? "1px solid var(--border-border-surface-border-surface-secondary)"
                      : sizeBandStyle.borderTop,
                }}
              >
                {label}
              </div>
              <SizeBlock columns={columns} size={key} shape={shape} />
            </Fragment>
          ))}
        </div>
      </StoryDocsPanel>
    </section>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Button"
      description={locale === "en"
        ? "Compares variant · size · shape · state along the same axes as the Figma sheet. Each cell across the 10 variants shows a paired label button and icon-only button."
        : "Figma 시트와 동일한 축으로 variant · size · shape · state를 비교합니다. 10개 variant 각 셀은 라벨 버튼과 아이콘 전용 버튼을 한 쌍으로 표시합니다."}
      figmaNode="17987-47864"
    >
      <FigmaLinkCard
        nodeId="17987-47864"
        caption="Components / Button — 9 Type × 4 Size × 2 Shape × 3 State 매트릭스 원본"
      />

      <MatrixSection
          title="01 — Square"
          description="Type 10종 × Size(Large / Medium / Small) × State(Default / Hover & Pressed / Disable). Dark·White Invert 컬럼은 Figma와 동일한 배경 띠를 적용했습니다."
          columns={SQUARE_COLUMNS}
          shape="square"
          sizes={SIZE_GROUPS}
        />

        <MatrixSection
          title="02 — Square · xLarge"
          description="xLarge(48px)는 Figma 정의상 Primary Solid · Primary 2 Solid · Gray button만 존재합니다."
          columns={XLARGE_COLUMNS}
          shape="square"
          sizes={[{ key: "xlarge", label: "xLarge (48)" }]}
        />

        <MatrixSection
          title="03 — Round"
          description="Round 시트에는 Ghost·Gray·xLarge가 없어 Type 6종 × Size 3종 × State 3종으로 구성합니다."
          columns={ROUND_COLUMNS}
          shape="round"
          sizes={SIZE_GROUPS}
        />

      <StoryDocsNote>
        라이트/다크 대비는 상단 툴바 <strong>테마</strong>에서 전환해 확인하세요.
        Hover/Disable 상태는 <StoryDocsInlineCode>forceState</StoryDocsInlineCode> prop
        으로 강제 표시한 프리뷰입니다.
      </StoryDocsNote>
    </StoryDocsMatrixPage>
    );
  },
};

/* -----------------------------------------------------------------
 * Buttons — Spacing 가이드
 *   사이즈 별 버튼 그룹 사이 권장 간격을 시각화
 *   Large(40)=8px / Medium(32)=6px / Small(24)=4px
 * --------------------------------------------------------------- */
const CheckIcon = ({ size }: { size?: number }) => (
  <Icon src="/icon/Check.svg" size={size} />
);

const BUTTON_GROUP_SPACING: Array<{
  size: ButtonSize;
  label: string;
  gap: number;
}> = [
  { size: "large",  label: "Large Button Group",  gap: 8 },
  { size: "medium", label: "Medium Button Group", gap: 6 },
  { size: "small",  label: "Small Button Group",  gap: 4 },
];

const buttonsCardLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--context-foreground-surface-on-surface-base)",
};


function ButtonGroupSpacingCard({
  size,
  label,
  gap,
}: {
  size: ButtonSize;
  label: string;
  gap: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
      <div style={buttonsCardLabelStyle}>{label}</div>
      <StoryDocsPanelInset>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 80 }}>
          <div
            style={{ display: "inline-flex", alignItems: "center", gap }}
            aria-label={`${label} · gap ${gap}px`}
          >
            <Button variant="secondary-outline" size={size}>Button</Button>
            <Button variant="secondary-outline" size={size}>Button</Button>
          </div>
        </div>
      </StoryDocsPanelInset>
    </div>
  );
}

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage
      title="Button"
      description="가이드라인 · 나란히 배치 간격을 보여줍니다."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          10개 variant · 4 size · square/round · default/hover/disable · 아이콘 조합을 지원합니다.{" "}
          <StoryDocsInlineCode>iconOnly</StoryDocsInlineCode>일 때는 접근성을 위해{" "}
          <StoryDocsInlineCode>aria-label</StoryDocsInlineCode>이 필요합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Primary 2 Solid">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>variant="primary-2-solid"</StoryDocsInlineCode>는{" "}
          <strong>light 모드에서만 사용</strong>합니다. Primary Solid와 레이아웃은 동일하며,
          배경색만 연한 민트(<StoryDocsInlineCode>#b2fbed</StoryDocsInlineCode>)로 다릅니다.
        </StoryDocsParagraph>
        <StoryDocsPanelInset>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Button variant="primary-2-solid" size="large" forceState="default" leftIcon={<SearchIcon />}>Button</Button>
            <Button variant="primary-2-solid" size="large" forceState="hover" leftIcon={<SearchIcon />}>Button</Button>
            <Button variant="primary-2-solid" size="large" forceState="disable" leftIcon={<SearchIcon />}>Button</Button>
          </div>
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection
        title="Button Group & Spacings"
        description="3개 이상의 Button을 함께 배치할 때는 기능에 따라 Divider로 구분합니다."
      >
        {/* Button Group with Dividers */}
        <div style={buttonsCardLabelStyle}>Button Group</div>
        <StoryDocsPanelInset>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Button variant="secondary-outline" size="medium">업무버튼</Button>
              <Divider orientation="vertical" length={16} />
              <Button variant="secondary-outline" size="medium">선택 다운로드</Button>
              <Button variant="secondary-outline" size="medium">전체 다운로드</Button>
              <Button variant="secondary-outline" size="medium">엑셀 다운로드</Button>
              <Divider orientation="vertical" length={16} />
              <Button variant="secondary-outline" size="medium" leftIcon={<MinusIcon />}>행삭제</Button>
              <Button variant="secondary-outline" size="medium" leftIcon={<AddIcon />}>행추가</Button>
            </div>
          </div>
        </StoryDocsPanelInset>

        {/* Per-size groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginTop: 24,
          }}
        >
          {BUTTON_GROUP_SPACING.map((item) => (
            <ButtonGroupSpacingCard key={item.size} {...item} />
          ))}
        </div>

        {/* Rules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 16 }}>
          <StoryDocsNote>
            버튼 그룹은 Divider로 구분되며, 버튼 그룹과 Divider 사이 간격은 <strong>8px</strong>입니다.
          </StoryDocsNote>
          <StoryDocsNote>
            버튼 그룹 내 버튼 사이 간격은 <strong>Large 8px · Medium 6px · Small 4px</strong>입니다.
          </StoryDocsNote>
        </div>
      </StoryDocsSection>

    </StoryDocsPage>
  ),
};
