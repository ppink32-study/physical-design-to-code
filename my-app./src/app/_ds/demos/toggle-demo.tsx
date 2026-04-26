"use client";

import { useState } from "react";
import { Toggle } from "@/components/toggle/toggle";
import { DemoSection, demoStyles as s } from "../demo-block";

export function ToggleDemo() {
  const [on, setOn] = useState(true);
  return (
    <>
      <DemoSection title="States" description="off · on · disabled · focus">
        <div className={s.row}>
          <Toggle>Off</Toggle>
          <Toggle defaultChecked>On</Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled defaultChecked>
            Disabled On
          </Toggle>
          <Toggle forceState="focused" defaultChecked>
            Focused
          </Toggle>
        </div>
      </DemoSection>

      <DemoSection title="Reverse · Controlled" description="reverse=true는 라벨·스위치 위치 반전">
        <div className={s.col}>
          <Toggle
            checked={on}
            onChange={(next) => setOn(next)}
          >
            Notification
          </Toggle>
          <Toggle reverse defaultChecked>
            Enable dark mode
          </Toggle>
        </div>
      </DemoSection>
    </>
  );
}

export default ToggleDemo;
