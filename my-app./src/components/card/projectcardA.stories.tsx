import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import {
  ProjectCardA,
  type ProjectCardAState,
  type ProjectCardAType,
} from "./projectcardA";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ProjectCardA> = {
  title: "Components/Card/ProjectCardA",
  component: ProjectCardA,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    type: { control: "inline-radio", options: ["brand", "light"] },
    state: { control: "inline-radio", options: ["default", "hover"] },
    title: { control: "text" },
    description: { control: "text" },
    members: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ProjectCardA>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    type: "light",
    state: "default",
    imageSrc: "/robot/Unitree G1.jpg",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    members: "8 members",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — type × state (2×2)
 * ----------------------------------------------------------------- */
const TYPES: ProjectCardAType[] = ["brand", "light"];
const STATES: ProjectCardAState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="ProjectCardA"
      description="프로젝트 카드 A — type(brand/light) × state(default/hover) 매트릭스."
      figmaNode="18404-696"
    >
      <FigmaLinkCard nodeId="18404-696" caption="Components / Project Card A (brand)" />
      <FigmaLinkCard nodeId="18404-755" caption="Components / Project Card A (light)" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Type × State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {TYPES.map((t) => (
            <div key={t}>
              <span style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                {t}
              </span>
              <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
                {STATES.map((s) => (
                  <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
                    <ProjectCardA type={t} state={s} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </StoryDocsMatrixPage>
  ),
};
