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
} from "@/stories/story-docs-shell";

import { Drawer, DrawerHeader, type DrawerSize } from "./drawer";
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
 *  공용 슬롯 — 헤더 케이스별 재사용
 * ----------------------------------------------------------------- */
const BookmarkBtn = () => (
  <button
    type="button"
    aria-label="북마크"
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 32, height: 32, padding: 0, border: "none", background: "transparent",
      color: "var(--context-background-surface-bg-surface-quarernary)", cursor: "pointer",
      borderRadius: "var(--radius-xs, 2px)",
    }}
  >
    <span style={{
      display: "inline-block", width: 24, height: 24,
      backgroundColor: "currentColor",
      WebkitMaskImage: "url('/icon/StarFill.svg')", maskImage: "url('/icon/StarFill.svg')",
      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      WebkitMaskPosition: "center", maskPosition: "center",
      WebkitMaskSize: "contain", maskSize: "contain",
    }} aria-hidden="true" />
  </button>
);

const BadgeSlot = () => (
  <>
    <Badge variant="solid" color="purple" size="lg">12</Badge>
  </>
);

const EditActions = () => (
  <button type="button" className={styles.iconBtn} aria-label="편집">
    <span className={styles.iconBtnGlyph} data-icon="pencil" aria-hidden="true" />
  </button>
);

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
              <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>확인</Button>
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
 *  Size 미리보기 (drawer 열기 버튼)
 * ----------------------------------------------------------------- */
function DrawerPreview({ size }: { size: DrawerSize }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary-outline" size="small" onClick={() => setOpen(true)}>{size}</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        size={size}
        footer={
          <>
            <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>취소</Button>
            <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>확인</Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>Swap content</p>
      </Drawer>
    </>
  );
}

const SIZES: { label: string; size: DrawerSize }[] = [
  { label: "Small (420px)", size: "small" },
  { label: "Medium (720px)", size: "medium" },
  { label: "Large (max 1140px)", size: "large" },
];

/* -----------------------------------------------------------------
 *  Header 인라인 미리보기 케이스
 *  Figma 순서: [Back?] [titlePrefix?] [badges?] [title] [titleActions?] | [headerControls?] [X]
 * ----------------------------------------------------------------- */
type HeaderCase = {
  label: string;
  props: {
    title: string;
    onBack?: () => void;
    titlePrefix?: React.ReactNode;
    badges?: React.ReactNode;
    titleActions?: React.ReactNode;
    headerControls?: React.ReactNode;
  };
};

const HEADER_CASES: HeaderCase[] = [
  {
    label: "Full (모두)",
    props: {
      title: "Drawer Title",
      titlePrefix: <BookmarkBtn />,
      badges: <BadgeSlot />,
      titleActions: <EditActions />,
    },
  },
];

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Drawer"
      description={locale === "en"
        ? "Side Drawer — Size matrix and Header cases."
        : "Side Drawer — Size 매트릭스 및 Header 케이스입니다."}
      figmaNode="8256-8490"
    >
      <FigmaLinkCard nodeId="8256-8490" caption="Components / Drawer — 원본" />

      {/* Size 매트릭스 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Size
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>{SIZES.map(({ label }) => <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>)}</tr>
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

      {/* Header 케이스 인라인 미리보기 */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Header Cases
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-secondary)" }}>
          Figma node 8252-1461 — 순서: [Back] [Bookmark] [Badges] [Title] [Edit Actions] | [Toggle] [X]
        </p>
        <table style={{ ...storyMatrixTableBase, fontSize: 12, width: "100%" }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 120 }}>케이스</th>
              <th style={storyMatrixColHeaderStyle}>Header 미리보기</th>
            </tr>
          </thead>
          <tbody>
            {HEADER_CASES.map(({ label, props }) => (
              <tr key={label}>
                <td style={{ ...storyMatrixCellStyle, padding: "8px 16px", verticalAlign: "middle", fontWeight: 600 }}>
                  {label}
                </td>
                <td style={{ ...storyMatrixCellStyle, padding: 0, verticalAlign: "middle" }}>
                  <div style={{
                    background: "var(--context-background-surface-bg-surface-base)",
                    border: "1px solid var(--border-border-surface-border-surface-secondary)",
                    borderRadius: "var(--radius-lg, 8px)",
                    overflow: "hidden",
                  }}>
                    <DrawerHeader {...props} onClose={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
