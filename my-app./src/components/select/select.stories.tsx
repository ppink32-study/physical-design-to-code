import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { Select, type SelectProps, type SelectTone } from "./select";
import { SelectList } from "./selectlist";
import { SelectItem } from "./selectitem";
import { InputChip } from "../chips/input-chip/input-chip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
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

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "radio", options: ["medium", "large"] },
    tone: { control: "radio", options: ["normal", "success", "error"] },
    type: { control: "radio", options: ["normal", "label"] },
    state: {
      control: "radio",
      options: [undefined, "default", "focus", "filled", "disable", "readonly"],
    },
    open: { control: "boolean" },
    multiline: { control: "boolean" },
    clearable: { control: "boolean" },
    moreCount: { control: { type: "number", min: 0, max: 99 } },
  },
  args: {
    size: "medium",
    tone: "normal",
    type: "normal",
    placeholder: "Text",
    label: "label",
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

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
  <section style={{ marginTop: 24 }}>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;
const matrixCellStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  minWidth: 200,
  maxWidth: 280,
};

function makeChips(size: "medium" | "large") {
  return [
    <InputChip key="a" size={size}>Text</InputChip>,
    <InputChip key="b" size={size}>Text</InputChip>,
    <InputChip key="c" size={size}>Text</InputChip>,
  ];
}

const TONE_COLS: Array<{ key: SelectTone | "label"; label: string }> = [
  { key: "normal", label: "Normal" },
  { key: "success", label: "Success" },
  { key: "error", label: "Error" },
  { key: "label", label: "Label" },
];

type RowKey =
  | "default"
  | "focus"
  | "filledSingle"
  | "filledMulti1"
  | "filledMulti2"
  | "disable"
  | "readonly";

const STATE_ROWS: Array<{ key: RowKey; label: string }> = [
  { key: "default", label: "Default" },
  { key: "focus", label: "Focus" },
  { key: "filledSingle", label: "Filled Single" },
  { key: "filledMulti1", label: "Filled Multiple 1line" },
  { key: "filledMulti2", label: "Filled Multiple 2line" },
  { key: "disable", label: "Disable" },
  { key: "readonly", label: "Readonly" },
];

function rowProps(row: RowKey, size: "medium" | "large" = "medium"): Partial<SelectProps> {
  const chips = makeChips(size);
  switch (row) {
    case "default":
      return { placeholder: "Text", state: "default" };
    case "focus":
      return { placeholder: "Text", state: "focus" };
    case "filledSingle":
      return { value: "Option A", state: "filled" };
    case "filledMulti1":
      return {
        state: "filled",
        chips,
        moreCount: 2,
        clearable: true,
      };
    case "filledMulti2":
      return {
        state: "filled",
        multiline: true,
        chips,
        clearable: true,
      };
    case "disable":
      return { value: "Text", disabled: true };
    case "readonly":
      return { value: "Text", readOnly: true, state: "readonly" };
    default:
      return {};
  }
}

function cellProps(
  row: RowKey,
  col: SelectTone | "label",
  size: "medium" | "large" = "medium",
): Partial<SelectProps> {
  const base = rowProps(row, size);
  if (col === "label") {
    return {
      ...base,
      type: "label",
      label: "label",
      tone: "normal",
    };
  }
  return { ...base, type: "normal", tone: col };
}

function SelectMatrixTable({ size }: { size: "medium" | "large" }) {
  return (
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
            {TONE_COLS.map((c) => (
              <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATE_ROWS.map((r) => (
            <tr key={r.key}>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                {r.label}
              </th>
              {TONE_COLS.map((c) => (
                <td key={`${r.key}-${c.key}`} style={matrixCellStyle}>
                  <Select size={size} {...cellProps(r.key, c.key, size)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Playground interactive demo: 클릭 시 SelectList 가 trigger 아래 4px 간격으로 열림
 * ---------------------------------------------------------------------- */
const PLAYGROUND_ITEMS = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

function PlaygroundDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", width: 220 }}>
      <Select
        open={open}
        value={selected || undefined}
        placeholder="Select an option"
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 10,
          }}
        >
          <SelectList width={220} maxHeight={200} showScrollbar>
            {PLAYGROUND_ITEMS.map((item) => (
              <SelectItem
                key={item}
                selected={selected === item}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
              >
                {item}
              </SelectItem>
            ))}
          </SelectList>
        </div>
      )}
    </div>
  );
}

export const Playground: Story = {
  parameters: { controls: { disable: true }, actions: { disable: true } },
  render: () => (
    <StoryPlaygroundFrame>
      <PlaygroundDemo />
    </StoryPlaygroundFrame>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Select"
      description={locale === "en"
        ? "Figma Select-box matrix: rows are states (Default · Focus · Filled …), columns are Normal · Success · Error · Label, in two blocks Medium (32px) · Large (40px)."
        : "Figma Select box 매트릭스: 행은 상태(Default·Focus·Filled…), 열은 Normal·Success·Error·Label, Medium(32px)·Large(40px) 두 블록입니다."}
      figmaNode="4811-29737"
    >
      <FigmaLinkCard
        nodeId="4811-29737"
        caption="Components / Select — Select box 매트릭스 원본"
      />
      <SectionFrame title="Medium (height 32px)">
        <SelectMatrixTable size="medium" />
      </SectionFrame>
      <SectionFrame title="Large (height 40px)">
        <SelectMatrixTable size="large" />
      </SectionFrame>
    </StoryDocsMatrixPage>
    );
  },
};

/* -------------------------------------------------------------------------
 * Anatomy helpers
 * ---------------------------------------------------------------------- */
const LINE_COLOR = "#b3b4bc";

function NumBadge({ n, style: s }: { n: number; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#141518",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
        flexShrink: 0,
        fontFamily: "var(--font-family-korean)",
        ...s,
      }}
    >
      {n}
    </span>
  );
}

/** 뱃지 → 컴포넌트 연결 점선 (absolute) */
function ConnLine({ style: s }: { style: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        ...s,
      }}
    />
  );
}

function AnatLegendRow({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <NumBadge n={n} />
      <span
        style={{
          fontSize: 14,
          lineHeight: "20px",
          color: "var(--context-foreground-surface-on-surface-base)",
          fontFamily: "var(--font-family-korean)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

const anatColHeader: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--context-foreground-primary-on-primary, #43c6c1)",
  fontFamily: "var(--font-family-korean)",
};

/* -------------------------------------------------------------------------
 * Guideline
 * ---------------------------------------------------------------------- */
export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Select" description="Select box 트리거 + SelectList 드롭다운 조합 가이드입니다.">

      {/* ── Anatomy ───────────────────────────────────────────────────── */}
      <StoryDocsSection title="Anatomy">
        {/* Component preview panel */}
        <div
          style={{
            background: "var(--context-background-surface-bg-surface-secondary, #f4f4f5)",
            borderRadius: 8,
            padding: "32px 48px",
            display: "flex",
            gap: 56,
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >
          {/* ── Col 1 : 단일 선택 드롭다운 ──────────────────────────── */}
          <div style={{ flexShrink: 0 }}>
            <p style={anatColHeader}>단일 선택 드롭다운</p>

            {/* Trigger ①② */}
            <div style={{ position: "relative", paddingLeft: 28, paddingRight: 28 }}>
              <NumBadge
                n={1}
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
              />
              <ConnLine
                style={{
                  left: 20, top: "50%", transform: "translateY(-50%)",
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <Select value="Text" style={{ width: 220 }} />
              <ConnLine
                style={{
                  right: 20, top: "50%", transform: "translateY(-50%)",
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <NumBadge
                n={2}
                style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
              />
            </div>

            {/* 4px gap */}
            <div style={{ height: 4 }} />

            {/* List ③ */}
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <NumBadge n={3} style={{ position: "absolute", left: 0, top: 10 }} />
              <ConnLine
                style={{
                  left: 20, top: 20,
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <SelectList width={220} maxHeight={200} showScrollbar>
                <SelectItem disabled>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem selected>Item 3</SelectItem>
                <SelectItem>Item 4</SelectItem>
                <SelectItem>Item 5</SelectItem>
              </SelectList>
            </div>

            {/* Width annotation ⑩ */}
            <div style={{ position: "relative", paddingLeft: 28, marginTop: 10 }}>
              <NumBadge n={10} style={{ position: "absolute", left: 0, top: 2 }} />
              <p style={{ margin: 0, fontSize: 11, color: "#e74c3c" }}>기본 너비 220px</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#e74c3c" }}>
                콘텐츠 영역에서는 콘텐츠에 맞춰 조정 가능합니다.
              </p>
            </div>
          </div>

          {/* ── Col 2 : 다중 선택 드롭다운 ──────────────────────────── */}
          <div style={{ flexShrink: 0 }}>
            <p style={anatColHeader}>다중 선택 드롭다운</p>

            {/* Trigger ④⑤⑥ — badges above */}
            <div style={{ position: "relative", paddingTop: 28 }}>
              <NumBadge n={4} style={{ position: "absolute", top: 4, left: 28 }} />
              <ConnLine
                style={{
                  left: 37, top: 24,
                  width: 1, height: 4, borderLeft: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <NumBadge n={5} style={{ position: "absolute", top: 4, left: 166 }} />
              <ConnLine
                style={{
                  left: 175, top: 24,
                  width: 1, height: 4, borderLeft: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <NumBadge n={6} style={{ position: "absolute", top: 4, left: 212 }} />
              <ConnLine
                style={{
                  left: 221, top: 24,
                  width: 1, height: 4, borderLeft: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <Select
                chips={[
                  <InputChip key="a">Text</InputChip>,
                  <InputChip key="b">Text</InputChip>,
                  <InputChip key="c">Text</InputChip>,
                ]}
                moreCount={2}
                clearable
                style={{ width: 280 }}
              />
            </div>

            {/* 4px gap */}
            <div style={{ height: 4 }} />

            {/* List */}
            <SelectList width={280} maxHeight={200} showScrollbar>
              <SelectItem disabled>Item 1</SelectItem>
              <SelectItem>Item 2</SelectItem>
              <SelectItem selected>Item 3</SelectItem>
              <SelectItem selected>Item 4</SelectItem>
              <SelectItem>Item 5</SelectItem>
            </SelectList>
          </div>

          {/* ── Col 3 : 유형=라벨 ──────────────────────────────────── */}
          <div style={{ flexShrink: 0 }}>
            <p style={anatColHeader}>유형=라벨</p>

            {/* Trigger ⑦ */}
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <NumBadge
                n={7}
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
              />
              <ConnLine
                style={{
                  left: 20, top: "50%", transform: "translateY(-50%)",
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <Select type="label" label="label" value="Text" style={{ width: 240 }} />
            </div>

            {/* 4px gap */}
            <div style={{ height: 4 }} />

            {/* Search list ⑧⑨ */}
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <NumBadge n={8} style={{ position: "absolute", left: 0, top: 8 }} />
              <ConnLine
                style={{
                  left: 20, top: 18,
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <NumBadge n={9} style={{ position: "absolute", left: 0, top: 48 }} />
              <ConnLine
                style={{
                  left: 20, top: 58,
                  width: 8, height: 1, borderTop: `1px dashed ${LINE_COLOR}`,
                }}
              />
              <SelectList
                type="search"
                searchValue=""
                onSearchChange={() => {}}
                searchPlaceholder="Text"
                width={240}
                maxHeight={220}
                showScrollbar
              >
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
                <SelectItem>Item 4</SelectItem>
                <SelectItem>Item 5</SelectItem>
              </SelectList>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 6 }}>
          <AnatLegendRow n={1}>입력 텍스트</AnatLegendRow>
          <AnatLegendRow n={2}>드롭다운 아이콘, <strong>16px</strong></AnatLegendRow>
          <AnatLegendRow n={3}>
            드롭다운 목록, 최대 <strong>10</strong>개 항목. 10개 초과 시 스크롤바 추가
          </AnatLegendRow>
          <AnatLegendRow n={4}>선택된 칩</AnatLegendRow>
          <AnatLegendRow n={5}>표시되지 않은 추가 칩 수 표시기</AnatLegendRow>
          <AnatLegendRow n={6}>전체 제거 아이콘</AnatLegendRow>
          <AnatLegendRow n={7}>라벨 텍스트</AnatLegendRow>
          <AnatLegendRow n={8}>검색창</AnatLegendRow>
          <AnatLegendRow n={9}>구분선</AnatLegendRow>
          <AnatLegendRow n={10}>
            기본 너비 : 목록 등 필터링 기능의 UI 요소에서는 기본 고정 너비값을 가져갑니다.
            (* 콘텐츠 영역에서는 콘텐츠에 맞춰 조정 가능)
            <br />— 다중 Select Box : <strong>280px</strong> (고정)
            <br />— 드롭다운 목록 : <strong>220px</strong> (고정)
            <br />— 검색 목록 : <strong>240px</strong> (고정)
          </AnatLegendRow>
        </div>
      </StoryDocsSection>

      {/* ── 개요 ──────────────────────────────────────────────────────── */}
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>Select</StoryDocsInlineCode>는 트리거(버튼) 역할만 담당합니다.
          클릭 시 <StoryDocsInlineCode>SelectList</StoryDocsInlineCode>를 trigger 아래{" "}
          <strong>4px 간격</strong>으로 배치해 드롭다운을 구성합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          SelectList 위치는 <StoryDocsInlineCode>position: absolute</StoryDocsInlineCode> +{" "}
          <StoryDocsInlineCode>top: calc(100% + 4px)</StoryDocsInlineCode>로 설정합니다.
          부모 컨테이너에 <StoryDocsInlineCode>position: relative</StoryDocsInlineCode>가 필요합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      {/* ── Select Props ──────────────────────────────────────────────── */}
      <StoryDocsSection title="Select Props">
        <StoryDocsParagraph><strong>size</strong>: "medium"(32px) | "large"(40px)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>tone</strong>: "normal" | "success" | "error" — border 색상 변경</StoryDocsParagraph>
        <StoryDocsParagraph><strong>type</strong>: "normal" | "label" — label 타입은 좌측에 meta 라벨 노출</StoryDocsParagraph>
        <StoryDocsParagraph><strong>open</strong>: true일 때 chevron 회전 + focus 스타일 적용</StoryDocsParagraph>
        <StoryDocsParagraph><strong>value</strong>: 단일 선택값 표시</StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>chips</strong>: 다중 선택 시 InputChip 배열. Select size에 맞춰 chip size도 동일하게 전달합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph><strong>moreCount</strong>: 1line 모드에서 넘치는 chip 수 표시 (+N)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>multiline</strong>: true이면 chip을 2줄로 wrap. height auto로 전환됩니다.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>clearable</strong>: chip 모드에서 전체 지우기(×) 버튼 노출</StoryDocsParagraph>
      </StoryDocsSection>

      {/* ── SelectList Props ──────────────────────────────────────────── */}
      <StoryDocsSection title="SelectList Props">
        <StoryDocsParagraph>
          <strong>type</strong>: "1-level"(기본) | "2-levels"(우측 chevron) | "search"(검색 input 포함)
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>width</strong>: 드롭다운 너비(px). 기본값 — Single 220px, Multiple 280px, Search 240px.
        </StoryDocsParagraph>
        <StoryDocsParagraph><strong>maxHeight</strong>: items 영역 최대 높이. 초과 시 내부 스크롤 발생합니다.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>showScrollbar</strong>: true이면 커스텀 스크롤바 노출 (기본 true)</StoryDocsParagraph>
      </StoryDocsSection>

      {/* ── SelectItem Props ──────────────────────────────────────────── */}
      <StoryDocsSection title="SelectItem Props">
        <StoryDocsParagraph><strong>selected</strong>: true이면 민트 배경 + 우측 체크 아이콘 노출</StoryDocsParagraph>
        <StoryDocsParagraph><strong>disabled</strong>: 비활성 텍스트, 클릭 불가</StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>type</strong>: "1-level"(기본) | "2-level"(우측 ChevronRight — 하위 메뉴용)
        </StoryDocsParagraph>
        <StoryDocsParagraph><strong>badge</strong>: 우측에 Badge 노드 추가 노출</StoryDocsParagraph>
        <StoryDocsParagraph><strong>onClick</strong>: 선택 이벤트 핸들러</StoryDocsParagraph>
      </StoryDocsSection>

      {/* ── 사용 패턴 ──────────────────────────────────────────────────── */}
      <StoryDocsSection title="사용 패턴">
        <StoryDocsParagraph>
          외부 클릭 감지는{" "}
          <StoryDocsInlineCode>document.addEventListener(&quot;mousedown&quot;, ...)</StoryDocsInlineCode>로 구현합니다.
          Select의 <StoryDocsInlineCode>open</StoryDocsInlineCode> prop과 상태를 동기화하여 chevron 방향을 제어합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          단일 선택: <StoryDocsInlineCode>value</StoryDocsInlineCode> state로 관리. 항목 클릭 시 값을 갱신하고 드롭다운을 닫습니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          다중 선택: 선택된 항목을 <StoryDocsInlineCode>InputChip</StoryDocsInlineCode> 배열로 변환해{" "}
          <StoryDocsInlineCode>chips</StoryDocsInlineCode>에 전달합니다.
          항목 클릭 시 드롭다운을 닫지 않고 선택 상태만 토글합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
