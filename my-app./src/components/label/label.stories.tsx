import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import {
  Label,
  type LabelSize,
  type LabelType,
} from "./label";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["medium", "small"],
    },
    type: {
      control: "inline-radio",
      options: ["normal", "outline-button", "ghost-button"],
    },
    mandatory: { control: "boolean" },
    infoIcon: { control: "boolean" },
    children: { control: "text" },
    buttonLabel: {
      control: "text",
      description:
        "outline-button / ghost-button variant 의 버튼 텍스트. 기본값: outline-button='설정', ghost-button='' (icon-only)",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Label>;

/* =================================================================
 * 0. Playground — Figma Properties 패널과 동일
 *   Type · Size · Label · Mandatory · Info Icon
 * =============================================================== */

type LabelPlaygroundArgs = {
  type: LabelType;
  size: LabelSize;
  children: string;
  mandatory: boolean;
  infoIcon: boolean;
};

export const Playground: StoryObj<LabelPlaygroundArgs> = {
  parameters: {
    controls: {
      sort: "none",
      include: ["Type", "Size", "Label", "Mandatory", "Info Icon"],
    },
  },
  argTypes: {
    type: {
      name: "Type",
      description: "Normal, + Outline Btn, + Ghost Btn",
      options: ["Normal", "+ Outline Btn", "+ Ghost Btn"],
      mapping: {
        Normal: "normal",
        "+ Outline Btn": "outline-button",
        "+ Ghost Btn": "ghost-button",
      } satisfies Record<string, LabelType>,
      control: "inline-radio",
    },
    size: {
      name: "Size",
      description: "Medium, Small",
      options: ["Medium", "Small"],
      mapping: {
        Medium: "medium",
        Small: "small",
      } satisfies Record<string, LabelSize>,
      control: "inline-radio",
    },
    children: {
      name: "Label",
      control: "text",
    },
    mandatory: {
      name: "Mandatory",
      description: "True / False",
      control: "boolean",
    },
    infoIcon: {
      name: "Info Icon",
      description: "True / False",
      control: "boolean",
    },
  },
  render: function PlaygroundRender(args) {
    return (
      <StoryPlaygroundFrame>
        <Label
          type={args.type}
          size={args.size}
          mandatory={args.mandatory}
          infoIcon={args.infoIcon}
        >
          {args.children}
        </Label>
      </StoryPlaygroundFrame>
    );
  },
  args: {
    type: "normal",
    size: "medium",
    children: "항목명",
    mandatory: true,
    infoIcon: true,
  },
};

/* =================================================================
 * Matrix — Figma: 열 Medium / Small · 행 Normal / Ghost / Outline
 * =============================================================== */

const matrixCornerTh: CSSProperties = {
  ...storyMatrixColHeaderStyle,
  width: 120,
};

const matrixEmptyTd: CSSProperties = {
  ...storyMatrixCellStyle,
  color: "var(--context-foreground-surface-on-surface-hint)",
  fontSize: 12,
  textAlign: "center",
};

/** Figma 스펙: Ghost·Outline 버튼 변형은 Small 열에만 정의 (Medium 셀은 비움) */
function LabelVariantMatrixTable() {
  return (
    <table style={storyMatrixTableBase}>
      <thead>
        <tr>
          <th style={matrixCornerTh} />
          <th style={storyMatrixColHeaderStyle}>Medium</th>
          <th style={storyMatrixColHeaderStyle}>Small</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" style={storyMatrixRowHeaderStyle}>
            Normal
          </th>
          <td style={storyMatrixCellStyle}>
            <Label size="medium" mandatory infoIcon>
              Label
            </Label>
          </td>
          <td style={storyMatrixCellStyle}>
            <Label size="small" mandatory infoIcon>
              Label
            </Label>
          </td>
        </tr>
        <tr>
          <th scope="row" style={storyMatrixRowHeaderStyle}>
            Ghost Button
          </th>
          <td style={matrixEmptyTd}>—</td>
          <td style={storyMatrixCellStyle}>
            <Label
              size="small"
              type="ghost-button"
              mandatory
              infoIcon
              buttonAriaLabel="add"
            >
              Label
            </Label>
          </td>
        </tr>
        <tr>
          <th scope="row" style={storyMatrixRowHeaderStyle}>
            Outline Button
          </th>
          <td style={matrixEmptyTd}>—</td>
          <td style={storyMatrixCellStyle}>
            <Label size="small" type="outline-button" mandatory infoIcon>
              Label
            </Label>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Label"
      description={
        <>
          열은 <strong>Medium</strong> / <strong>Small</strong>, 행은 <strong>Normal</strong> /{" "}
          <strong>Ghost Button</strong> / <strong>Outline Button</strong> 입니다. Figma 기준
          Ghost·Outline 은 <strong>Small</strong> 만 정의되어 Medium 셀은 비웁니다.
        </>
      }
      figmaNode="5691-20257"
    >
      <FigmaLinkCard
        nodeId="5691-20257"
        caption="Components / Label — Type × Size 매트릭스 원본"
      />
      <LabelVariantMatrixTable />
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
    <StoryDocsPage title="Label" description="폼 라벨 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          폼 필드 라벨·필수 표시·정보 아이콘·outline/ghost 버튼 슬롯을 한 컴포넌트로 다룹니다.
          Type×Size 매트릭스(Normal / Ghost / Outline × Medium / Small)는 Matrix 스토리 표에서
          확인할 수 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
