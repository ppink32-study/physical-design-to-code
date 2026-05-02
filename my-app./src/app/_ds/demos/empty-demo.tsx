"use client";

import { Empty } from "@/components/empty/empty";
import { Button } from "@/components/button/button/button";
import { DemoSection, demoStyles as s } from "../demo-block";

export function EmptyDemo() {
  return (
    <>
      <DemoSection title="Icon presets" description="data · image · table · upload">
        <div className={s.grid2}>
          <Empty icon="data" description="데이터가 없습니다" />
          <Empty icon="image" description="이미지를 찾을 수 없어요" />
          <Empty icon="table" description="테이블이 비어 있습니다" />
          <Empty icon="upload" description="파일을 업로드해 주세요" />
        </div>
      </DemoSection>

      <DemoSection title="Sizes" description="small · medium · large">
        <div className={s.col}>
          <Empty size="small" description="Small" />
          <Empty size="medium" description="Medium" />
          <Empty size="large" description="Large" subtext="추가 설명을 넣을 수 있어요." />
        </div>
      </DemoSection>

      <DemoSection title="With action" description="Empty 하단에 추가 액션 버튼을 배치">
        <div className={s.col} style={{ alignItems: "center" }}>
          <Empty
            icon="upload"
            description="업로드된 파일이 없습니다"
            subtext="파일을 끌어서 놓거나 아래 버튼을 누르세요."
          />
          <Button variant="primary-solid">업로드</Button>
        </div>
      </DemoSection>
    </>
  );
}

export default EmptyDemo;
