"use client";

import { PageTitle } from "@/components/title/pagetitle";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import { ContentsTitleSub } from "@/components/title/contentstitlesub";
import { ContentsTitleSub2D } from "@/components/title/contentstitlesub2d";
import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button";
import { DemoSection, demoStyles as s } from "../demo-block";

export function TitleDemo() {
  return (
    <>
      <DemoSection title="PageTitle" description="페이지 최상단 헤더. 1d(단순) / 2d(배지·액션 포함).">
        <div className={s.col}>
          <PageTitle title="Dashboard" type="1d" />
          <PageTitle
            title="Playbooks"
            type="2d"
            badges={<Badge variant="solid" color="primary">NEW</Badge>}
            actions={<Button variant="primary-solid">Create</Button>}
          />
        </div>
      </DemoSection>

      <DemoSection title="ContentsTitleMain" description="메인 섹션 제목. 배지/토글/hint/액션 슬롯 제공.">
        <div className={s.col}>
          <ContentsTitleMain title="실시간 모니터링" />
          <ContentsTitleMain
            title="실시간 모니터링"
            badge={<Badge variant="status" color="green">Live</Badge>}
            hint="5초마다 자동 갱신됩니다."
            actions={<Button size="small" variant="secondary-outline">Refresh</Button>}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="ContentsTitleSub"
        description="서브 섹션 제목. count · accordion · button 옵션."
        more={
          <div className={s.col}>
            <ContentsTitleSub title="With required" required />
            <ContentsTitleSub title="With count" count={12} />
            <ContentsTitleSub title="Accordion" accordion expanded />
            <ContentsTitleSub title="With button" button />
          </div>
        }
      >
        <div className={s.col}>
          <ContentsTitleSub title="Default Sub Title" />
          <ContentsTitleSub title="필수 항목" required count={3} />
        </div>
      </DemoSection>

      <DemoSection title="ContentsTitleSub2D" description="2-depth 서브 타이틀. bullet · badge · add · toggle 슬롯.">
        <div className={s.col}>
          <ContentsTitleSub2D title="Child section" count={5} />
          <ContentsTitleSub2D title="Child section" addBtn onAdd={() => {}} />
        </div>
      </DemoSection>
    </>
  );
}

export default TitleDemo;
