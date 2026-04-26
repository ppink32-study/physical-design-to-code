import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { SelectItem, type SelectItemProps } from "./selectitem";
import { Badge } from "../badge/badge";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SelectItem> = {
  title: "Components/Select/SelectItem",
  component: SelectItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "radio", options: ["medium", "large"] },
    type: { control: "radio", options: ["1-level", "2-level"] },
    state: {
      control: "radio",
      options: [undefined, "default", "hover", "select"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "medium",
    type: "1-level",
    children: "Text",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 226, padding: 4 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SelectItem>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {},
};

const rows: Array<{ label: string; args: Partial<SelectItemProps> }> = [
  { label: "Default", args: {} },
  { label: "Hover", args: { state: "hover" } },
  { label: "Selected", args: { selected: true } },
  { label: "Disabled", args: { disabled: true } },
];

function MatrixRow({
  label,
  args,
}: {
  label: string;
  args: Partial<SelectItemProps>;
}) {
  return (
    <>
      <div style={{ fontWeight: 500, fontSize: 13 }}>{label}</div>
      <SelectItem {...args} type="1-level">
        {label}
      </SelectItem>
      <SelectItem {...args} type="2-level">
        {label}
      </SelectItem>
    </>
  );
}

function InteractiveList() {
  const [picked, setPicked] = useState<string | null>("B");
  const options = ["Option A", "Option B", "Option C", "Option D"];
  return (
    <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 2 }}>
      {options.map((label) => {
        const key = label.slice(-1);
        return (
          <SelectItem key={key} selected={picked === key} onClick={() => setPicked(key)}>
            {label}
          </SelectItem>
        );
      })}
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="SelectItem"
      description="상태·1-level/2-level·뱃지·Large·인터랙티브 리스트 조합을 비교합니다."
      figmaNode="4811-36049"
    >
      <FigmaLinkCard
        nodeId="4811-36049"
        caption="Components / Select · SelectItem — State 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>States × type</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(2, 260px)",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div />
          <div style={{ fontWeight: 600 }}>1-level</div>
          <div style={{ fontWeight: 600 }}>2-level</div>
          {rows.map((r) => (
            <MatrixRow key={r.label} label={r.label} args={r.args} />
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Badge · Large</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
          <SelectItem badge={<Badge variant="line">Badge</Badge>}>With badge</SelectItem>
          <SelectItem size="large">Large</SelectItem>
          <SelectItem size="large" selected>
            Large selected
          </SelectItem>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Interactive list</h4>
        <InteractiveList />
      </section>
    </StoryDocsMatrixPage>
  ),
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="SelectItem" description="선택 목록의 한 줄 옵션 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          드롭다운·리스트 내 한 줄 옵션입니다.{" "}
          <StoryDocsInlineCode>type=&quot;2-level&quot;</StoryDocsInlineCode> 은 하위 메뉴가 있는 항목에
          사용합니다. 상태·사이즈·뱃지 조합은 Matrix 에서 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
