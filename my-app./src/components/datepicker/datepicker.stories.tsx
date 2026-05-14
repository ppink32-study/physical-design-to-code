import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { DatePicker } from "./datepicker";
import type { DatePickerForcedState, DatePickerTone } from "./datepicker";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    tone: {
      control: "inline-radio",
      options: ["normal", "success", "error"],
    },
    forcedState: {
      control: "inline-radio",
      options: [undefined, "default", "focus", "filled", "disable", "readonly"],
    },
    range: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    clearable: { control: "boolean" },
    disabled: { table: { disable: true } },
    readOnly: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: { size: "medium", tone: "normal" },
};

/* =========================================================================
 * Matrix — Figma: Single / Range 각각 5×4 (행: 상태, 열: Default·Success·Error·Label)
 * ========================================================================= */

const RANGE_PLACEHOLDER = "yyyy-mm-dd -> yyyy-mm-dd";

type ColSpec = { key: string; header: string; tone: DatePickerTone; label?: string };

const MATRIX_COLS: ColSpec[] = [
  { key: "default", header: "Default", tone: "normal" },
  { key: "success", header: "Success", tone: "success" },
  { key: "error", header: "Error", tone: "error" },
  { key: "label", header: "Label", tone: "normal", label: "label" },
];

/** Figma 행: Normal → Focus(clear) → Filled → Disabled → Read-only */
const MATRIX_ROWS: Array<{
  label: string;
  forcedState?: DatePickerForcedState;
  disabled?: boolean;
  readOnly?: boolean;
  /** 값 있음 (filled / focus / disable / ro 행) */
  withValue: boolean;
  /** focus 행에서만 clear 버튼 노출 */
  clearable?: boolean;
}> = [
  { label: "Normal", withValue: false },
  {
    label: "Focus",
    forcedState: "focus",
    withValue: true,
    clearable: true,
  },
  { label: "Filled", forcedState: "filled", withValue: true },
  { label: "Disabled", disabled: true, withValue: true },
  { label: "Read-only", readOnly: true, withValue: true },
];

const cornerStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--on-surface-hint, #787a88)",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const colHeaderStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--on-surface-base, #141518)",
};

const rowHeaderStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--on-surface-base, #141518)",
};

function FigmaStateMatrixFixedGrid({ range }: { range: boolean }) {
  const filledRange: [string, string] = ["2026-04-01", "2026-04-17"];
  const filledSingle = "2026-04-17";

  /** Range 행은 넓어서 20px 간격 + 열 최소 너비로 겹침 방지 */
  const gridStyle: CSSProperties = range
    ? {
        display: "grid",
        gridTemplateColumns: "112px repeat(4, minmax(268px, 1fr))",
        columnGap: 20,
        rowGap: 20,
        alignItems: "center",
      }
    : {
        display: "grid",
        gridTemplateColumns: "112px repeat(4, minmax(200px, 1fr))",
        gap: "16px 20px",
        alignItems: "center",
      };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: range ? 20 : 16,
        maxWidth: range ? 1280 : 1100,
      }}
    >
      <div style={gridStyle}>
        <div style={cornerStyle}>State</div>
        {MATRIX_COLS.map((c) => (
          <div key={c.key} style={colHeaderStyle}>
            {c.header}
          </div>
        ))}
      </div>

      {MATRIX_ROWS.map((row) => (
        <div key={row.label} style={gridStyle}>
          <div style={rowHeaderStyle}>{row.label}</div>
          {MATRIX_COLS.map((col) => {
            const hasVal = row.withValue;
            const common = {
              size: "medium" as const,
              disabled: row.disabled,
              readOnly: row.readOnly,
              forcedState: row.forcedState,
              clearable: row.clearable !== false,
            };
            const tone = col.tone;
            const label = col.label;

            const cellWrap: CSSProperties = range
              ? { minWidth: 0, width: "100%", boxSizing: "border-box" }
              : { minWidth: 0 };

            if (range) {
              const defaultRangeValue = hasVal ? filledRange : (["", ""] as [string, string]);
              return (
                <div key={col.key} style={cellWrap}>
                  <DatePicker
                    {...common}
                    range
                    tone={tone}
                    label={label}
                    placeholder={RANGE_PLACEHOLDER}
                    defaultRangeValue={defaultRangeValue}
                  />
                </div>
              );
            }

            return (
              <div key={col.key} style={cellWrap}>
                <DatePicker
                  {...common}
                  tone={tone}
                  label={label}
                  placeholder="Select date"
                  defaultValue={hasVal ? filledSingle : ""}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="DatePicker"
      description={locale === "en"
        ? "Shows the same 5×4 matrix as Figma — single and range pickers across tone · state · label columns."
        : "단일·구간 선택 각각 tone·state·라벨 열과 Figma와 동일한 5×4 매트릭스를 보여줍니다."}
      figmaNode="5132-60197"
    >
      <FigmaLinkCard
        nodeId="5132-60197"
        caption="Components / DatePicker — Variant 매트릭스 원본"
      />
      <section>
        <h3
          style={{
            margin: "0 0 16px",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-family-korean)",
          }}
        >
          Single date picker
        </h3>
        <FigmaStateMatrixFixedGrid range={false} />
      </section>

      <section>
        <h3
          style={{
            margin: "0 0 16px",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-family-korean)",
          }}
        >
          Date range picker
        </h3>
        <FigmaStateMatrixFixedGrid range />
      </section>
    </StoryDocsMatrixPage>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Figma 매트릭스: **열** Default / Success / Error / Label · **행** Normal · Focus(+clear) · Filled · Disabled · Read-only. Medium 단일 크기. Large 는 Default 스토리 Controls 로 확인.",
      },
    },
  },
};
