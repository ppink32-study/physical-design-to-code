import { Fragment, type CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Badge } from "../badge/badge";
import { ChipButton } from "../chips/chip-button/chip-button";
import { Checkbox, CheckboxGroup } from "../checkbox/checkbox";
import { Input } from "../Input/input";
import { TextArea } from "../Input/textarea";
import { Radio, RadioGroup } from "../radio/radio";
import { Select } from "../select/select";
import { Toggle } from "../toggle/toggle";

import { Form, FormField } from "./form";
import formMatrixStyles from "./form-matrix.module.css";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsNote,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

const FORM_MATRIX_LABEL_WIDTH = 160;
const FORM_MATRIX_INPUT_WIDTH = 240;
/** TextArea Figma 기본 폭; 셀·열 최소값은 이 값 + 여백 기준 */
const FORM_MATRIX_TEXTAREA_WIDTH = 340;
/** 매트릭스 셀(div) 패딩 — 컨트롤 바깥 여백은 여기서만 조정 (상하 / 좌우) */
const FORM_MATRIX_CELL_PAD_X = 20;
const FORM_MATRIX_CELL_PAD_Y = 16;

/** 세로 매트릭스 열 최소: textarea(340) + 셀 좌우 패딩 */
const FORM_MATRIX_COL_MIN_VERTICAL =
  FORM_MATRIX_TEXTAREA_WIDTH + FORM_MATRIX_CELL_PAD_X * 2 + 16;
/** 가로 매트릭스 열 최소: 라벨(160) + 컨트롤 최대(340) + Form 간격 여유 */
const FORM_MATRIX_COL_MIN_HORIZONTAL =
  FORM_MATRIX_LABEL_WIDTH + FORM_MATRIX_TEXTAREA_WIDTH + 72;
/** 셀·열 공통 최소 (세로·가로 중 더 넓은 쪽 = 겹침 방지) */
const FORM_MATRIX_CELL_MIN = Math.max(
  FORM_MATRIX_COL_MIN_VERTICAL,
  FORM_MATRIX_COL_MIN_HORIZONTAL,
);

const matrixCellShell: CSSProperties = {
  padding: `${FORM_MATRIX_CELL_PAD_Y}px ${FORM_MATRIX_CELL_PAD_X}px`,
  border:
    "1px dashed var(--border-surface-secondary, #ececee)",
  borderRadius: 10,
  minWidth: FORM_MATRIX_CELL_MIN,
  boxSizing: "border-box",
};

const matrixCellShellVertical: CSSProperties = {
  ...matrixCellShell,
  minWidth: FORM_MATRIX_COL_MIN_VERTICAL,
};

const matrixHdr: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--on-surface-secondary)",
  padding: "12px 10px",
  textAlign: "center",
};

const matrixRowHdr: CSSProperties = {
  ...matrixHdr,
  textAlign: "left",
  whiteSpace: "nowrap",
};

const matrixGridVertical: CSSProperties = {
  display: "grid",
  gridTemplateColumns: `minmax(104px, auto) repeat(2, minmax(${FORM_MATRIX_COL_MIN_VERTICAL}px, 1fr))`,
  gap: 16,
  rowGap: 20,
  alignItems: "start",
  paddingBottom: 16,
};

const matrixGridHorizontal: CSSProperties = {
  display: "grid",
  gridTemplateColumns: `minmax(96px,auto) repeat(2, minmax(${FORM_MATRIX_CELL_MIN}px, 1fr))`,
  gap: 16,
  rowGap: 20,
  alignItems: "start",
  overflowX: "auto",
  paddingBottom: 16,
};

type MatrixControlKind =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "toggle"
  | "badge"
  | "chip";

function MatrixFieldControl({
  kind,
  nameSuffix,
}: {
  kind: MatrixControlKind;
  nameSuffix: string;
}) {
  switch (kind) {
    case "input":
      return (
        <Input
          type="search"
          leadingIcon
          placeholder="Text"
          width={FORM_MATRIX_INPUT_WIDTH}
        />
      );
    case "textarea":
      return (
        <TextArea placeholder="Text" width={FORM_MATRIX_TEXTAREA_WIDTH} />
      );
    case "select":
      return (
        <Select
          size="medium"
          placeholder="Select"
          style={{ width: FORM_MATRIX_INPUT_WIDTH }}
        />
      );
    case "checkbox":
      return (
        <CheckboxGroup
          className={formMatrixStyles.groupNowrap}
          name={`cb-${nameSuffix}`}
          defaultValue={["a"]}
          orientation="horizontal"
        >
          <Checkbox value="a">Option</Checkbox>
          <Checkbox value="b">Option</Checkbox>
          <Checkbox value="c">Option</Checkbox>
        </CheckboxGroup>
      );
    case "radio":
      return (
        <RadioGroup
          className={formMatrixStyles.groupNowrap}
          name={`rd-${nameSuffix}`}
          defaultValue="a"
          orientation="horizontal"
        >
          <Radio value="a">Option</Radio>
          <Radio value="b">Option</Radio>
          <Radio value="c">Option</Radio>
        </RadioGroup>
      );
    case "toggle":
      return <Toggle defaultChecked />;
    case "badge":
      return (
        <div className={formMatrixStyles.rowNowrapBadge}>
          <Badge variant="solid" color="blue">
            Tag
          </Badge>
          <Badge variant="solid" color="blue">
            Tag
          </Badge>
          <Badge variant="solid" color="blue">
            Tag
          </Badge>
        </div>
      );
    case "chip":
      return (
        <div className={formMatrixStyles.rowNowrap}>
          <ChipButton>Tag</ChipButton>
          <ChipButton>Tag</ChipButton>
          <ChipButton>Tag</ChipButton>
        </div>
      );
    default:
      return null;
  }
}

const VERTICAL_COLUMNS: Array<{ key: string; kind: MatrixControlKind }> = [
  { key: "Input", kind: "input" },
  { key: "Text area", kind: "textarea" },
  { key: "Select", kind: "select" },
  { key: "Checkbox", kind: "checkbox" },
  { key: "Radio", kind: "radio" },
  { key: "Toggle", kind: "toggle" },
  { key: "Badge", kind: "badge" },
];

const HORIZONTAL_ROWS: Array<{ key: string; kind: MatrixControlKind }> = [
  { key: "Input", kind: "input" },
  { key: "Text area", kind: "textarea" },
  { key: "Select", kind: "select" },
  { key: "Checkbox", kind: "checkbox" },
  { key: "Radio", kind: "radio" },
  { key: "Toggle", kind: "toggle" },
  { key: "Badge", kind: "badge" },
];

const FIGMA_FORM_GUIDELINE = figmaNodeUrl("7119:411152");
const FIGMA_FORM_MATRIX = figmaNodeUrl("5714:108005");

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "padded",
    figma: FIGMA_FORM_GUIDELINE,
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
    figma: FIGMA_FORM_GUIDELINE,
  },
  render: () => (
    <StoryDocsPage
      title="Form"
      description={
        <>
          라벨·필드·헬퍼·검증 메시지를 한 규칙으로 묶는 레이아웃 프리미티브입니다. 상세 스펙은
          Physical AI Platform Design Guideline의 Form 섹션을 따릅니다.
        </>
      }
    >
      <FigmaLinkCard
        nodeId="7119-411152"
        caption="Physical AI Platform Design Guideline — Form (Dev Mode)"
      />

      <StoryDocsSection
        title="역할"
        description={
          <>
            <StoryDocsInlineCode>Form</StoryDocsInlineCode>은 여러{" "}
            <StoryDocsInlineCode>FormField</StoryDocsInlineCode>의 공통 레이아웃(라벨 위치·라벨
            폭·라벨 크기·필드 간 방향)을 컨텍스트로 넘기고,{" "}
            <StoryDocsInlineCode>FormField</StoryDocsInlineCode>는 라벨·필수·info·helper·
            error/success/warning 과 실제 컨트롤 한 덩어리를 만듭니다.
          </>
        }
      >
        <StoryDocsParagraph>
          Figma의 Label vertical / horizontal, 필드 타입별 조합, 간격·정렬 규칙은 아래 링크와
          동일합니다. 구현 예시는 <strong>Matrix</strong> 스토리에서 컴포넌트별로 확인할 수
          있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="레이아웃 API"
        description={
          <>
            <StoryDocsInlineCode>Form</StoryDocsInlineCode>의 주요 props입니다. Figma Form 프레임과
            1:1에 가깝게 맞춰 두었습니다.
          </>
        }
      >
        <StoryDocsParagraph>
          <strong>layout</strong> — <StoryDocsInlineCode>&quot;top&quot;</StoryDocsInlineCode>
          : 라벨이 컨트롤 위(세로형).{" "}
          <StoryDocsInlineCode>&quot;left&quot;</StoryDocsInlineCode>: 라벨이 좌측(가로형).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>labelWidth</strong> — <StoryDocsInlineCode>layout=&quot;left&quot;</StoryDocsInlineCode>
          일 때 라벨 영역 너비(기본 160px, Figma max-width와 동일하게 사용 가능).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>labelSize</strong> — 라벨 타이포 크기{" "}
          <StoryDocsInlineCode>medium</StoryDocsInlineCode> /{" "}
          <StoryDocsInlineCode>small</StoryDocsInlineCode>.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>direction</strong> — 폼 안에서 여러 필드를 쌓을 때{" "}
          <StoryDocsInlineCode>vertical</StoryDocsInlineCode>(기본) 또는{" "}
          <StoryDocsInlineCode>horizontal</StoryDocsInlineCode> 배치.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Figma 대응"
        description="Matrix 스토리는 컴포넌트 상태 표를, 아래 노드는 가이드라인 문서 전체를 가리킵니다."
      >
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--on-surface-base)",
          }}
        >
          <li>
            가이드라인(본 페이지 상단 링크):{" "}
            <a
              href={FIGMA_FORM_GUIDELINE}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--on-primary-hover)" }}
            >
              node 7119:411152
            </a>
          </li>
          <li>
            Label 매트릭스 시각 참고:{" "}
            <a
              href={FIGMA_FORM_MATRIX}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--on-primary-hover)" }}
            >
              node 5714:108005
            </a>{" "}
            — <strong>Matrix</strong> 스토리의 그리드와 짝을 이룹니다.
          </li>
        </ul>
      </StoryDocsSection>

      <StoryDocsNote>
        Storybook 상단 Figma 패널은 이 파일의 <StoryDocsInlineCode>parameters.figma</StoryDocsInlineCode>
        (7119:411152)로 연결됩니다. Chromatic·디자인 리뷰 시 동일 노드를 기준으로 삼으면 됩니다.
      </StoryDocsNote>
    </StoryDocsPage>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", figma: FIGMA_FORM_MATRIX },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Form"
      description={locale === "en"
        ? "Label placement matrix following the Figma Form spec. Vertical: rows are Label size (small / medium), columns are control type. Horizontal: columns are Label size (max-width 160px), rows are control type."
        : "Figma Form 스펙에 맞춘 라벨 배치 매트릭스입니다. 세로형은 행이 Label 크기(small / medium), 열이 컨트롤 종류입니다. 가로형은 열이 Label 크기(라벨 영역 max-width 160px), 행이 컨트롤 종류입니다."}
      figmaNode="5714-108005"
    >
      <FigmaLinkCard
        nodeId="5714-108005"
        caption="Components / Form — Layout 매트릭스 원본"
      />

      <section style={{ marginTop: 8 }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>
          Form / Label vertical
        </h4>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            color: "var(--on-surface-hint)",
          }}
        >
          <code>layout=&quot;top&quot;</code> — 행: Input · Text area · Select · Checkbox · Radio · Toggle ·
          Badge, 열: <code>Label=small</code> / <code>Label=medium</code>
        </p>
        <div style={matrixGridVertical}>
          <div />
          <div style={matrixHdr}>Label=small</div>
          <div style={matrixHdr}>Label=medium</div>
          {VERTICAL_COLUMNS.map((col) => (
            <Fragment key={col.key}>
              <div style={matrixRowHdr}>{col.key}</div>
              {(["small", "medium"] as const).map((labelSize) => {
                const suffix = `v-${labelSize}-${col.kind}`;
                return (
                  <div key={suffix} style={matrixCellShellVertical}>
                    <Form layout="top" labelSize={labelSize}>
                      <FormField label="Label" mandatory>
                        <MatrixFieldControl kind={col.kind} nameSuffix={suffix} />
                      </FormField>
                    </Form>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>
          Form / Label horizontal
        </h4>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            color: "var(--on-surface-hint)",
          }}
        >
          <code>layout=&quot;left&quot;</code>, <code>labelWidth={FORM_MATRIX_LABEL_WIDTH}</code>{" "}
          — 열: <code>Label=small</code> / <code>Label=medium</code> (라벨 영역 max-width{" "}
          {FORM_MATRIX_LABEL_WIDTH}px), 행: Input · Text area · Select · Checkbox · Radio · Toggle ·
          Badge
        </p>
        <div style={matrixGridHorizontal}>
          <div />
          <div style={matrixHdr}>
            Label=small
            <br />
            <span style={{ fontWeight: 400, fontSize: 10 }}>
              (max {FORM_MATRIX_LABEL_WIDTH}px)
            </span>
          </div>
          <div style={matrixHdr}>
            Label=medium
            <br />
            <span style={{ fontWeight: 400, fontSize: 10 }}>
              (max {FORM_MATRIX_LABEL_WIDTH}px)
            </span>
          </div>
          {HORIZONTAL_ROWS.map((row) => (
            <Fragment key={row.kind}>
              <div style={matrixRowHdr}>{row.key}</div>
              {(["small", "medium"] as const).map((labelSize) => {
                const suffix = `h-${row.kind}-${labelSize}`;
                return (
                  <div key={suffix} style={matrixCellShell}>
                    <Form
                      layout="left"
                      labelWidth={FORM_MATRIX_LABEL_WIDTH}
                      labelSize={labelSize}
                    >
                      <FormField label="Label" mandatory>
                        <MatrixFieldControl kind={row.kind} nameSuffix={suffix} />
                      </FormField>
                    </Form>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
