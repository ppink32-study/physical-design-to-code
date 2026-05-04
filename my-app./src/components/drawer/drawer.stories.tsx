import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button/button";
import { Toggle } from "@/components/toggle/toggle";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import { Drawer, type DrawerSize } from "./drawer";
import styles from "./drawer.module.css";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    open: { control: "boolean" },
    title: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    title: "Drawer Title",
    size: "medium",
  },
  render: function PlaygroundRender(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary-solid" size="large" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>
            드로어 본문 영역입니다. 원하는 콘텐츠를 이곳에 배치하세요.
          </p>
        </Drawer>
      </>
    );
  },
};

/* -----------------------------------------------------------------
 *  Size Matrix — 3가지 사이즈
 * ----------------------------------------------------------------- */
const SIZES: { label: string; size: DrawerSize }[] = [
  { label: "Small (420px)", size: "small" },
  { label: "Medium (720px)", size: "medium" },
  { label: "Large (max 1140px)", size: "large" },
];

function DrawerPreview({ size }: { size: DrawerSize }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary-outline" size="small" onClick={() => setOpen(true)}>
        {size}
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        size={size}
        footer={
          <>
            <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>
              확인
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>
          Swap content
        </p>
      </Drawer>
    </>
  );
}

/* -----------------------------------------------------------------
 *  Full Header Preview — Back + Badges + Edit Actions + Toggle
 *  Figma 8256:8490 의 모든 헤더 옵션이 켜진 케이스
 * ----------------------------------------------------------------- */
function DrawerFullPreview({ size }: { size: DrawerSize }) {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <Button variant="secondary-outline" size="small" onClick={() => setOpen(true)}>
        {size} · Full
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        size={size}
        onBack={() => setOpen(false)}
        badges={
          <>
            <Badge variant="solid" color="gray" size="sm">Solid</Badge>
            <Badge variant="solid" color="teal" size="sm">Teal</Badge>
          </>
        }
        titleActions={
          <>
            <button type="button" className={styles.iconBtn} aria-label="편집">
              <span className={styles.iconBtnGlyph} data-icon="pencil" aria-hidden="true" />
            </button>
            <button type="button" className={styles.iconBtn} aria-label="펼치기">
              <span className={styles.iconBtnGlyph} data-icon="chevron-down" aria-hidden="true" />
            </button>
          </>
        }
        headerControls={
          <Toggle
            checked={toggled}
            onChange={(checked) => setToggled(checked)}
            aria-label="토글"
          />
        }
        footer={
          <>
            <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>
              확인
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>
          Back · Badges · Edit Actions · Toggle 이 모두 활성화된 케이스입니다.
        </p>
      </Drawer>
    </>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Drawer"
      description="3가지 사이즈(small · medium · large)의 Side Drawer 매트릭스입니다."
      figmaNode="8256-8490"
    >
      <FigmaLinkCard
        nodeId="8256-8490"
        caption="Components / Drawer — Small·Medium·Large 매트릭스 원본"
      />

      {/* Size 매트릭스 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Size
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {SIZES.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {SIZES.map(({ size }) => (
                <td key={size} style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle", textAlign: "center" }}>
                  <DrawerPreview size={size} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      {/* 전체 케이스 매트릭스 — Back + Badges + Edit + Toggle */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Full Header (Back · Badges · Edit Actions · Toggle)
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-secondary)" }}>
          Figma node 8256:8490 — Back Button / Badge / Edit / Toggle 옵션이 모두 활성화된 케이스
        </p>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {SIZES.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label} · Full</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {SIZES.map(({ size }) => (
                <td key={size} style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle", textAlign: "center" }}>
                  <DrawerFullPreview size={size} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
  ),
};

/* -----------------------------------------------------------------
 *  Guideline
 * ----------------------------------------------------------------- */
export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Drawer" description="사이드 드로어 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          createPortal을 사용해 document.body에 직접 마운트합니다.
          오버레이 클릭 또는 ESC 키로 닫힙니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="사이즈">
        <StoryDocsParagraph>
          <strong>small</strong> — 420px. 짧은 폼·필터·상세보기 등.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>medium</strong> — 720px. 기본값. 일반적인 폼·정보 입력.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>large</strong> — max-width 1140px. 복잡한 콘텐츠·테이블 표시.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="헤더 슬롯">
        <StoryDocsParagraph>
          <strong>onBack</strong>: 제공 시 Back(ChevronLeft) 버튼을 타이틀 앞에 표시합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>badges</strong>: 타이틀 옆 Badge 슬롯입니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>titleActions</strong>: 타이틀 옆 아이콘 액션 슬롯입니다 (Pencil-Line, ChevronDown 등).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>headerControls</strong>: X 버튼 앞 우측 슬롯입니다 (Toggle 등).
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="콘텐츠 슬롯">
        <StoryDocsParagraph>
          <strong>children</strong>: body 콘텐츠 슬롯. overflow-y: auto로 스크롤됩니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>footer</strong>: 버튼 행 슬롯. justify-end 정렬입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
