import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../badge/badge";
import { Checkbox, CheckboxGroup } from "../checkbox/checkbox";
import { Input } from "../Input/input";
import { TextArea } from "../Input/textarea";
import { Radio, RadioGroup } from "../radio/radio";
import { Select } from "../select/select";
import { Toggle } from "../toggle/toggle";

import { Form, FormField } from "./form";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Form 은 신규 시각 컴포넌트가 아니라 기존 컨트롤들을 일관된 라벨/메시지/간격 규칙으로 배치하기 위한 layout primitive 입니다.\n\n**Spacing (Figma node 5714:108005 실측)**\n- label ↔ control : **4px**\n- fields 세로 간격 : **16px**\n- fields 가로 간격 : **24px**\n\n**API 매트릭스**\n- `FormField.layout` : 라벨 위치 — `\"top\"`(vertical) / `\"left\"`(horizontal)\n- `Form.direction` : fields 배치 방향 — `\"vertical\"` / `\"horizontal\"`",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "inline-radio",
      options: ["top", "left"],
      description: "FormField 내부 라벨 위치",
    },
    direction: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
      description: "Form 안의 fields 배치 방향",
    },
    labelWidth: { control: "number" },
    labelSize: {
      control: "inline-radio",
      options: ["medium", "small"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    layout: "top",
    direction: "vertical",
    labelWidth: 160,
    labelSize: "medium",
  },
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Form"
      description="라벨 상단·좌측과 필드 그룹 세로·가로 배치 등 Form 레이아웃 패턴을 비교합니다."
      figmaNode="5714-108005"
    >
      <FigmaLinkCard
        nodeId="5714-108005"
        caption="Components / Form — Layout 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Label / Vertical</h4>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
          <code>layout=&quot;top&quot;</code> — 라벨이 컨트롤 위, gap 4px
        </p>
        <div style={{ width: 240 }}>
          <Form layout="top">
            <FormField label="Label" mandatory>
              <Input placeholder="Text" />
            </FormField>
          </Form>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Label / Horizontal</h4>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
          <code>layout=&quot;left&quot;</code> — 라벨 좌측, label width 160
        </p>
        <div style={{ width: 400 }}>
          <Form layout="left" labelWidth={160}>
            <FormField label="Label" mandatory>
              <Input placeholder="Text" />
            </FormField>
          </Form>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Group / Vertical</h4>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
          <code>direction=&quot;vertical&quot;</code> — fields 간 16px
        </p>
        <div style={{ width: 400 }}>
          <Form layout="top" direction="vertical">
            <FormField label="Input">
              <Input placeholder="Text" />
            </FormField>
            <FormField label="Text Area">
              <TextArea placeholder="Text" />
            </FormField>
            <FormField label="Select">
              <Select size="medium" placeholder="Select" />
            </FormField>
            <FormField label="Checkbox">
              <CheckboxGroup name="cb-vert" defaultValue={["a"]} orientation="horizontal">
                <Checkbox value="a">Option</Checkbox>
                <Checkbox value="b">Option</Checkbox>
                <Checkbox value="c">Option</Checkbox>
              </CheckboxGroup>
            </FormField>
            <FormField label="Radio">
              <RadioGroup name="rd-vert" defaultValue="a" orientation="horizontal">
                <Radio value="a">Option</Radio>
                <Radio value="b">Option</Radio>
                <Radio value="c">Option</Radio>
              </RadioGroup>
            </FormField>
            <FormField label="Toggle">
              <Toggle defaultChecked />
            </FormField>
            <FormField label="Badge">
              <div style={{ display: "flex", gap: 4 }}>
                <Badge variant="solid" color="primary">
                  Tag
                </Badge>
                <Badge variant="solid" color="primary">
                  Tag
                </Badge>
                <Badge variant="solid" color="primary">
                  Tag
                </Badge>
              </div>
            </FormField>
          </Form>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Group / Horizontal</h4>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
          <code>direction=&quot;horizontal&quot;</code> — fields 간 24px
        </p>
        <Form layout="top" direction="horizontal">
          <FormField label="Input" width={240}>
            <Input placeholder="Text" />
          </FormField>
          <FormField label="Text Area" width={340}>
            <TextArea placeholder="Text" />
          </FormField>
          <FormField label="Select" width={220}>
            <Select size="medium" placeholder="Select" />
          </FormField>
          <FormField label="Checkbox" width={230}>
            <CheckboxGroup name="cb-horz" defaultValue={["a"]} orientation="horizontal">
              <Checkbox value="a">Option</Checkbox>
              <Checkbox value="b">Option</Checkbox>
              <Checkbox value="c">Option</Checkbox>
            </CheckboxGroup>
          </FormField>
          <FormField label="Radio" width={230}>
            <RadioGroup name="rd-horz" defaultValue="a" orientation="horizontal">
              <Radio value="a">Option</Radio>
              <Radio value="b">Option</Radio>
              <Radio value="c">Option</Radio>
            </RadioGroup>
          </FormField>
          <FormField label="Toggle" width={79}>
            <Toggle defaultChecked />
          </FormField>
          <FormField label="Badge" width={170}>
            <div style={{ display: "flex", gap: 4 }}>
              <Badge variant="solid" color="primary">
                Tag
              </Badge>
              <Badge variant="solid" color="primary">
                Tag
              </Badge>
              <Badge variant="solid" color="primary">
                Tag
              </Badge>
            </div>
          </FormField>
        </Form>
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
    <StoryDocsPage title="Form" description="폼 레이아웃 프리미티브 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          Form 은 라벨·컨트롤 간격과 필드 그룹 방향만 통일합니다. 실제 입력 검증·에러 메시지는 각
          컨트롤(Input, Select 등)과 조합해 사용합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          네 가지 핵심 패턴(라벨 상하·좌우 × 그룹 세로·가로)은 Matrix 에서 한 화면으로 비교할 수
          있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
