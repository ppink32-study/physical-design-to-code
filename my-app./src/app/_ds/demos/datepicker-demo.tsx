"use client";

import { useState } from "react";
import { DatePicker } from "@/components/datepicker/datepicker";
import { DemoSection, demoStyles as s } from "../demo-block";

export function DatePickerDemo() {
  const [single, setSingle] = useState<string>("");
  const [range, setRange] = useState<[string, string]>(["", ""]);

  return (
    <>
      <DemoSection title="States" description="default · focus · filled · disable · readonly">
        <div className={s.grid2}>
          <DatePicker placeholder="Default" />
          <DatePicker placeholder="Focus" forcedState="focus" />
          <DatePicker value="2025-01-15" />
          <DatePicker value="2025-01-15" disabled />
          <DatePicker value="2025-01-15" readOnly />
        </div>
      </DemoSection>

      <DemoSection title="Tones" description="normal · success · error">
        <div className={s.row}>
          <DatePicker value="2025-02-01" />
          <DatePicker value="2025-02-01" tone="success" />
          <DatePicker value="2025-02-01" tone="error" />
        </div>
      </DemoSection>

      <DemoSection title="Sizes · Label" description="medium · large, 좌측 label 옵션">
        <div className={s.col}>
          <DatePicker size="medium" placeholder="Medium" />
          <DatePicker size="large" placeholder="Large" />
          <DatePicker label="Due date" placeholder="Choose..." />
        </div>
      </DemoSection>

      <DemoSection
        title="Range"
        description="range=true 로 시작·종료 날짜 입력. rangeValue는 [start, end] 튜플."
      >
        <div className={s.col}>
          <DatePicker range placeholder="yyyy-mm-dd" />
          <DatePicker range rangeValue={["2025-01-01", "2025-01-31"]} />
          <DatePicker range label="Period" placeholder="yyyy-mm-dd" />
        </div>
      </DemoSection>

      <DemoSection title="Interactive" description="단일/범위 모두 간단한 onOpen·clear 데모">
        <div className={s.col}>
          <DatePicker
            value={single}
            onChange={setSingle}
            clearable
            onOpen={() => {
              const today = new Date().toISOString().slice(0, 10);
              setSingle(today);
            }}
            placeholder="Click to set today"
          />
          <DatePicker
            range
            rangeValue={range}
            onRangeChange={setRange}
            clearable
            onOpen={() => {
              setRange(["2025-03-01", "2025-03-15"]);
            }}
            placeholder="yyyy-mm-dd"
          />
        </div>
      </DemoSection>
    </>
  );
}

export default DatePickerDemo;
