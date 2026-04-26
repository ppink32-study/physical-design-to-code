"use client";

import { Input } from "@/components/Input/input";
import { TextArea } from "@/components/Input/textarea";
import { InlineMessage } from "@/components/Input/inlinemessage";
import { DemoSection, demoStyles as s } from "../demo-block";

export function InputDemo() {
  return (
    <>
      <DemoSection title="Sizes" description="medium · large">
        <div className={s.row}>
          <Input size="medium" placeholder="Medium" />
          <Input size="large" placeholder="Large" />
        </div>
      </DemoSection>

      <DemoSection
        title="States"
        description="default · focus · filled · disabled · readonly"
        more={
          <div className={s.grid2}>
            <Input placeholder="default" />
            <Input placeholder="focus" forceState="focus" />
            <Input defaultValue="filled" />
            <Input defaultValue="disabled" disabled />
            <Input defaultValue="readonly" readOnly />
          </div>
        }
      >
        <div className={s.row}>
          <Input placeholder="Type something" />
          <Input defaultValue="Hello world" clearable />
          <Input defaultValue="disabled" disabled />
        </div>
      </DemoSection>

      <DemoSection title="Tones" description="normal · success · error">
        <div className={s.row}>
          <Input defaultValue="Normal" />
          <Input defaultValue="Success" tone="success" />
          <Input defaultValue="Error" tone="error" />
        </div>
      </DemoSection>

      <DemoSection title="Affix · Counter" description="leading/trailing icon, clearable, counter">
        <div className={s.row}>
          <Input placeholder="search" leadingIcon />
          <Input defaultValue="Delete me" clearable />
          <Input defaultValue="Count" counter={{ max: 20 }} />
        </div>
      </DemoSection>

      <DemoSection title="TextArea · InlineMessage">
        <div className={s.col} style={{ width: 320 }}>
          <TextArea placeholder="Leave a comment..." />
          <InlineMessage type="info">기본 안내 메시지입니다.</InlineMessage>
          <InlineMessage type="success">저장되었습니다.</InlineMessage>
          <InlineMessage type="error">필수 항목입니다.</InlineMessage>
        </div>
      </DemoSection>
    </>
  );
}

export default InputDemo;
