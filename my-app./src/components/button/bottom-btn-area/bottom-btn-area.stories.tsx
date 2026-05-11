import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Button } from "../button/button";
import { BottomBtnArea } from "./bottom-btn-area";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPanelInset,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

/* -----------------------------------------------------------------
 * Mask icon helper — currentColor 상속 단색 SVG
 * --------------------------------------------------------------- */
function MaskIcon({ src }: { src: string }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: "100%",
    height: "100%",
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden="true" style={style} />;
}

const CheckIcon = () => <MaskIcon src="/icon/Check.svg" />;

const meta: Meta<typeof BottomBtnArea> = {
  title: "Components/Button/BottomBtnArea",
  component: BottomBtnArea,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof BottomBtnArea>;

/* =================================================================
 * Playground — 좌·우 그룹의 가장 일반적인 형태
 * =============================================================== */
export const Playground: Story = {
  args: {
    leftActions: (
      <>
        <Button variant="secondary-outline">취소</Button>
        <Button variant="secondary-outline">이전</Button>
      </>
    ),
    rightActions: (
      <>
        <Button variant="secondary-outline">임시저장</Button>
        <Button variant="primary-solid" leftIcon={<CheckIcon />}>
          저장
        </Button>
      </>
    ),
  },
};

/* =================================================================
 * Matrix — Figma node 9813:896
 *   Default (leftButtons true / false) · Custom 슬롯
 * =============================================================== */

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="BottomBtnArea"
      description={locale === "en"
        ? "Compares left / right button groups and the Custom slot variant of the action area at the bottom of pages and modals."
        : "페이지·모달 하단 액션 영역의 좌·우 버튼 그룹과 Custom 슬롯 형태를 비교합니다."}
      figmaNode="9813-896"
    >
      <FigmaLinkCard
        nodeId="9813-896"
        caption="Components / Button / BottomBtnArea — Default × Custom 매트릭스 원본"
      />

      <StoryDocsSection
        title="Default — leftActions + rightActions"
        description="좌측은 보조 액션, 우측은 메인 CTA. 우측 마지막 버튼을 primary-solid 로 강조합니다."
      >
        <StoryDocsPanelInset>
          <BottomBtnArea
            leftActions={
              <>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
              </>
            }
            rightActions={
              <>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="primary-solid" leftIcon={<CheckIcon />}>
                  Button
                </Button>
              </>
            }
          />
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection
        title="Default — rightActions only"
        description="좌측 그룹이 없을 때는 우측 그룹만 우측 정렬됩니다."
      >
        <StoryDocsPanelInset>
          <BottomBtnArea
            rightActions={
              <>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="secondary-outline">Button</Button>
                <Button variant="primary-solid" leftIcon={<CheckIcon />}>
                  Button
                </Button>
              </>
            }
          />
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection
        title="Custom — children 슬롯"
        description="children 을 넘기면 좌·우 그룹 대신 자유 콘텐츠가 들어갑니다."
      >
        <StoryDocsPanelInset>
          <BottomBtnArea>
            <div
              style={{
                width: "100%",
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#E7F1FF",
                border: "1px dashed #6EA8FE",
                color: "#0A58CA",
                fontSize: 12,
                borderRadius: 6,
              }}
            >
              Custom slot — 자유 콘텐츠
            </div>
          </BottomBtnArea>
        </StoryDocsPanelInset>
      </StoryDocsSection>
    </StoryDocsMatrixPage>
    );
  },
};

