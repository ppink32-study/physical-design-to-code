"use client";

import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@/components/checkbox/checkbox";
import { DemoSection, demoStyles as s } from "../demo-block";

export function CheckboxDemo() {
  const [values, setValues] = useState<string[]>(["a"]);
  return (
    <>
      <DemoSection title="States" description="unchecked · checked · indeterminate · disabled">
        <div className={s.row}>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox disabled defaultChecked>
            Disabled Checked
          </Checkbox>
        </div>
      </DemoSection>

      <DemoSection title="Group" description="CheckboxGroup으로 다중 선택 제어">
        <CheckboxGroup
          value={values}
          onChange={(next) => setValues(next)}
          name="items"
        >
          <div className={s.col}>
            <Checkbox value="a">Option A</Checkbox>
            <Checkbox value="b">Option B</Checkbox>
            <Checkbox value="c">Option C</Checkbox>
          </div>
        </CheckboxGroup>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Selected: {values.join(", ") || "(none)"}
        </div>
      </DemoSection>
    </>
  );
}

export default CheckboxDemo;
