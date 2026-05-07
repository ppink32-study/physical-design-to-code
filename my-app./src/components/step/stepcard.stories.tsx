import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { StepCard, StepCardList } from "./stepcard";
import type { NumState } from "./num";

const meta: Meta<typeof StepCard> = {
  title: "Components/Step/StepCard",
  component: StepCard,
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    numState: {
      control: "inline-radio",
      options: ["finish", "current", "next", "complete", "error", "success", "stop"],
    },
    mode: { control: "inline-radio", options: ["light", "brand"] },
    hasLine: { control: "boolean" },
    statusColor: {
      control: "inline-radio",
      options: ["green", "red", "orange", "blue", "gray", "purple", "cyan"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof StepCard>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    numState: "success",
    hasLine: true,
    title: "Collect",
    description: "Collected through teleoperation.",
    owner: "Team Alpha",
    ownerId: "Team Alpha",
    date: "2025-11-15",
    duration: "2h 30m",
    statusLabel: "Completed",
    statusColor: "green",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — numState 별 상태 변화
 * ----------------------------------------------------------------- */
const ROWS: {
  numState: NumState;
  number?: number;
  statusLabel: string;
  statusColor: "green" | "red" | "orange" | "blue" | "gray";
  hasLine: boolean;
}[] = [
  { numState: "finish",   number: 1, statusLabel: "Completed", statusColor: "green",  hasLine: true },
  { numState: "current",  number: 2, statusLabel: "Running",   statusColor: "blue",   hasLine: true },
  { numState: "next",     number: 3, statusLabel: "Pending",   statusColor: "gray",   hasLine: true },
  { numState: "success",  statusLabel: "Completed",  statusColor: "green",  hasLine: true },
  { numState: "error",    statusLabel: "Error",      statusColor: "red",    hasLine: true },
  { numState: "stop",     statusLabel: "Stopped",    statusColor: "orange", hasLine: true },
  { numState: "complete", statusLabel: "Completed",  statusColor: "green",  hasLine: false },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="StepCard"
      description="StepItem + 카드. numState별 시각 상태 조합."
      figmaNode="16861-17888"
    >
      <FigmaLinkCard nodeId="16861-17888" caption="Components / Step / Step Card" />

      <section style={{ maxWidth: 900 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          numState 별 StepCard
        </h3>
        <StepCardList>
          {ROWS.map(({ numState, number, statusLabel, statusColor, hasLine }) => (
            <StepCard
              key={numState}
              numState={numState}
              number={number}
              hasLine={hasLine}
              title="Collect"
              description="Collected through teleoperation."
              owner="Team Alpha"
              ownerId="Team Alpha"
              date="2025-11-15"
              duration="2h 30m"
              statusLabel={statusLabel}
              statusColor={statusColor}
            />
          ))}
        </StepCardList>
      </section>
    </StoryDocsMatrixPage>
  ),
};
