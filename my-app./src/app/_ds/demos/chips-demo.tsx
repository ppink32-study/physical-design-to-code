"use client";

import { useState } from "react";
import { SelectableChip } from "@/components/chips/selectable-chip/selectable-chip";
import { SelectChip } from "@/components/chips/select-chip/select-chip";
import { InputChip } from "@/components/chips/input-chip/input-chip";
import { SearchChip } from "@/components/chips/search-chip/search-chip";
import { ChipButton } from "@/components/chips/chip-button/chip-button";
import { DemoSection, demoStyles as s } from "../demo-block";

export function ChipsDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["b"]));
  const toggle = (v: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  return (
    <>
      <DemoSection
        title="SelectableChip"
        description="토글 가능한 필터 칩. default · selected · disable · readonly · error(kind)."
      >
        <div className={s.row}>
          {["a", "b", "c", "d"].map((v) => (
            <SelectableChip
              key={v}
              selected={selected.has(v)}
              onToggle={() => toggle(v)}
            >
              {`Option ${v.toUpperCase()}`}
            </SelectableChip>
          ))}
          <SelectableChip state="disable">Disabled</SelectableChip>
          <SelectableChip kind="error" selected>
            Error
          </SelectableChip>
        </div>
      </DemoSection>

      <DemoSection title="SelectChip · InputChip" description="드롭다운 · 입력 태그형 칩">
        <div className={s.row}>
          <SelectChip>Select chip</SelectChip>
          <SelectChip error>Error</SelectChip>
          <SelectChip state="disable">Disabled</SelectChip>
          <InputChip>Input</InputChip>
          <InputChip type="error">Error</InputChip>
        </div>
      </DemoSection>

      <DemoSection title="SearchChip · ChipButton" description="검색 결과 칩 / 버튼형 칩">
        <div className={s.row}>
          <SearchChip>Keyword</SearchChip>
          <SearchChip label="Category">Brand</SearchChip>
          <SearchChip state="error">Invalid</SearchChip>
          <ChipButton icon>Search</ChipButton>
          <ChipButton icon selected>
            Applied
          </ChipButton>
        </div>
      </DemoSection>
    </>
  );
}

export default ChipsDemo;
