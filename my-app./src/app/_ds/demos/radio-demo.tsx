"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/components/radio/radio";
import { DemoSection, demoStyles as s } from "../demo-block";

export function RadioDemo() {
  const [value, setValue] = useState("one");
  return (
    <>
      <DemoSection title="States" description="unchecked · checked · disabled · focus">
        <RadioGroup name="basic" orientation="horizontal">
          <Radio value="a">Unchecked</Radio>
          <Radio value="b" defaultChecked>
            Checked
          </Radio>
          <Radio value="c" disabled>
            Disabled
          </Radio>
          <Radio value="d" forceState="focused">
            Focused
          </Radio>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Group — controlled" description="단일 선택은 value로 관리.">
        <RadioGroup
          name="level"
          value={value}
          onChange={(v) => setValue(v)}
          orientation="vertical"
        >
          <Radio value="one">One</Radio>
          <Radio value="two">Two</Radio>
          <Radio value="three">Three</Radio>
        </RadioGroup>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Selected: {value}</div>
      </DemoSection>
    </>
  );
}

export default RadioDemo;
