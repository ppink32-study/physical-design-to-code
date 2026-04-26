"use client";

import { Divider } from "@/components/divider/divider";
import { DemoSection, demoStyles as s } from "../demo-block";

export function DividerDemo() {
  return (
    <>
      <DemoSection title="Horizontal" description="수평 구분선. 섹션 사이를 나눕니다.">
        <div className={s.col} style={{ width: "100%" }}>
          <div style={{ padding: "8px 0" }}>Section A</div>
          <Divider />
          <div style={{ padding: "8px 0" }}>Section B</div>
          <Divider />
          <div style={{ padding: "8px 0" }}>Section C</div>
        </div>
      </DemoSection>

      <DemoSection title="Vertical" description="수직 구분선. 인라인 요소 사이를 나눕니다.">
        <div className={s.row} style={{ alignItems: "center", height: 24 }}>
          <span>Home</span>
          <Divider orientation="vertical" />
          <span>Profile</span>
          <Divider orientation="vertical" />
          <span>Settings</span>
        </div>
      </DemoSection>
    </>
  );
}

export default DividerDemo;
