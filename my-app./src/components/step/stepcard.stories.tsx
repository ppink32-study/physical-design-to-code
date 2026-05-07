import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
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
    <StoryDocsPage
      title="StepCard"
      description="세로 step 목록의 단위 행. StepItem(좌)과 정보 카드(우)로 구성됩니다."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <code>StepItem</code>과 정보 카드를 가로로 조합한 행 컴포넌트.
          여러 <code>StepCard</code>를 세로로 쌓아 step 목록(파이프라인)을 구성합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph>
          <strong>numState</strong> — StepItem에 전달. Num 배지 시각 상태 결정.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>hasLine</strong> — true: 하단 연결선 표시 (중간 항목), false: 선 없음 (마지막 항목).
          연결선은 카드 높이에 맞춰 끝까지 채워집니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>statusLabel / statusColor</strong> — 우측 상태 배지 텍스트·색상.
          Badge <code>variant="solid"</code> 사용.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="목록 사용법">
        <StoryDocsParagraph>
          여러 <code>StepCard</code>를 나열할 때는 <code>StepCardList</code>로 감싸세요.
          카드 간 간격 <code>spacing-md(12px)</code>이 자동 적용됩니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          {`<StepCardList>
  <StepCard hasLine numState="success" ... />
  <StepCard hasLine numState="current" ... />
  <StepCard hasLine={false} numState="next" ... />
</StepCardList>`}
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
