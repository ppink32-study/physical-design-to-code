import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { ProjectCardB, type ProjectCardBState } from "./projectcardB";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ProjectCardB> = {
  title: "Components/Card/ProjectCardB",
  component: ProjectCardB,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "hover"] },
    title: { control: "text" },
    description: { control: "text" },
    members: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ProjectCardB>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    state: "default",
    imageSrc: "/robot/Unitree G1.jpg",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    members: "16 members",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — default / hover 세로 배치
 * ----------------------------------------------------------------- */
const STATES: ProjectCardBState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="ProjectCardB"
      description={locale === "en"
        ? "Project Card B — default · hover state comparison."
        : "프로젝트 카드 B — default · hover 상태 비교."}
      figmaNode="18403-1736"
    >
      <FigmaLinkCard nodeId="18403-1736" caption="Components / Project Card B" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
              <ProjectCardB state={s} />
            </div>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
