"use client";

import { Label } from "@/components/label/label";
import { DemoSection, demoStyles as s } from "../demo-block";

export function LabelDemo() {
  return (
    <>
      <DemoSection title="Sizes" description="medium(default) · small">
        <div className={s.col}>
          <Label size="medium">Medium Label</Label>
          <Label size="small">Small Label</Label>
        </div>
      </DemoSection>

      <DemoSection title="Mandatory · Info" description="필수 항목 표시, info 아이콘 토글">
        <div className={s.col}>
          <Label mandatory>필수 항목</Label>
          <Label infoIcon={false}>인포 아이콘 없음</Label>
          <Label mandatory infoIcon>
            복합 옵션
          </Label>
        </div>
      </DemoSection>

      <DemoSection
        title="Types"
        description="normal · outline-button · ghost-button (라벨 옆 보조 액션)"
      >
        <div className={s.col}>
          <Label type="normal">Normal</Label>
          <Label type="outline-button">Outline Button</Label>
          <Label type="ghost-button">Ghost Button</Label>
        </div>
      </DemoSection>
    </>
  );
}

export default LabelDemo;
