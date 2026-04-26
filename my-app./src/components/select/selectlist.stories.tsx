import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useMemo, useState } from "react";

import { SelectList } from "./selectlist";
import { SelectItem } from "./selectitem";
import { Select } from "./select";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SelectList> = {
  title: "Components/Select/SelectList",
  component: SelectList,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "radio",
      options: ["1-level", "2-levels", "search"],
    },
    showScrollbar: { control: "boolean" },
    maxHeight: { control: { type: "number", min: 0 } },
    search: { control: "boolean" },
  },
  args: {
    type: "1-level",
    showScrollbar: true,
    width: 220,
  },
};
export default meta;

type Story = StoryObj<typeof SelectList>;

const defaultItems = [
  { key: "1", label: "Item 1" },
  { key: "2", label: "Item 2" },
  { key: "3", label: "Item 3" },
  { key: "4", label: "Item 4" },
  { key: "5", label: "Item 5" },
];

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: (args) => (
    <SelectList {...args}>
      {defaultItems.map((it) => (
        <SelectItem key={it.key}>{it.label}</SelectItem>
      ))}
    </SelectList>
  ),
};

function SearchDemo() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => defaultItems.filter((it) => it.label.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  return (
    <SelectList
      type="search"
      searchValue={q}
      onSearchChange={setQ}
      searchPlaceholder="Search items"
    >
      {filtered.length > 0 ? (
        filtered.map((it) => <SelectItem key={it.key}>{it.label}</SelectItem>)
      ) : (
        <SelectItem disabled>결과가 없습니다</SelectItem>
      )}
    </SelectList>
  );
}

function WithTriggerDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ width: 280, position: "relative" }}>
      <Select
        placeholder="옵션 선택"
        value={selected ?? undefined}
        open={open}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <div style={{ marginTop: 4 }}>
          <SelectList maxHeight={220}>
            {defaultItems.map((it) => (
              <SelectItem
                key={it.key}
                selected={selected === it.label}
                onClick={() => {
                  setSelected(it.label);
                  setOpen(false);
                }}
              >
                {it.label}
              </SelectItem>
            ))}
          </SelectList>
        </div>
      )}
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="SelectList"
      description="1-level·2-levels·검색·스크롤·Select와의 연동 등 SelectList 구성을 비교합니다."
      figmaNode="11959-26477"
    >
      <FigmaLinkCard
        nodeId="11959-26477"
        caption="Components / Select · SelectList — 구성 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Type / 1-level</h4>
        <SelectList>
          {defaultItems.map((it, i) => (
            <SelectItem key={it.key} selected={i === 1}>
              {it.label}
            </SelectItem>
          ))}
        </SelectList>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Type / 2-levels</h4>
        <SelectList type="2-levels">
          {defaultItems.map((it) => (
            <SelectItem key={it.key} type="2-level">
              {it.label}
            </SelectItem>
          ))}
        </SelectList>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Type / Search</h4>
        <SearchDemo />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Scrollable</h4>
        <SelectList maxHeight={160}>
          {Array.from({ length: 20 }).map((_, i) => (
            <SelectItem key={i}>Item {i + 1}</SelectItem>
          ))}
        </SelectList>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Integration · Select + List</h4>
        <WithTriggerDemo />
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
    <StoryDocsPage title="SelectList" description="선택 목록 컨테이너 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>SelectList</StoryDocsInlineCode> 는{" "}
          <StoryDocsInlineCode>SelectItem</StoryDocsInlineCode> children 과{" "}
          <StoryDocsInlineCode>type</StoryDocsInlineCode> 으로 1단·2단·검색 레이아웃을 전환합니다.
          트리거와의 연동 예시는 Matrix 하단 Integration 섹션을 참고하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
