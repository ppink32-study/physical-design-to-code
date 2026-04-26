"use client";

import { Select } from "@/components/select/select";
import { SelectList } from "@/components/select/selectlist";
import { SelectItem } from "@/components/select/selectitem";
import { DemoSection, demoStyles as s } from "../demo-block";

export function SelectDemo() {
  return (
    <>
      <DemoSection title="Sizes · States" description="medium · large / default · focus · filled · disable · readonly">
        <div className={s.grid2}>
          <Select placeholder="Default" />
          <Select placeholder="Focus" state="focus" />
          <Select value="Filled value" />
          <Select value="Disabled" state="disable" disabled />
          <Select value="Readonly" state="readonly" readOnly />
        </div>
      </DemoSection>

      <DemoSection title="Tones" description="normal · success · error">
        <div className={s.row}>
          <Select value="Normal" />
          <Select value="Success" tone="success" />
          <Select value="Error" tone="error" />
        </div>
      </DemoSection>

      <DemoSection title="Label · Multi · Clear" description="meta 라벨 + 다중선택 chips + clearable">
        <div className={s.col}>
          <Select type="label" label="Label" placeholder="Choose..." />
          <Select
            chips={["Tag 1", "Tag 2", "Tag 3"]}
            moreCount={2}
            clearable
          />
        </div>
      </DemoSection>

      <DemoSection title="SelectList + SelectItem" description="드롭다운 리스트와 아이템 시각화">
        <div style={{ width: 240 }}>
          <SelectList>
            <SelectItem>Option one</SelectItem>
            <SelectItem selected>Option two (selected)</SelectItem>
            <SelectItem>Option three</SelectItem>
            <SelectItem disabled>Option four (disabled)</SelectItem>
          </SelectList>
        </div>
      </DemoSection>
    </>
  );
}

export default SelectDemo;
