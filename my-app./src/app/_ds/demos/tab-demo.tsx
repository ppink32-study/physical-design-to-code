"use client";

import { useState } from "react";
import { Tab, TabList } from "@/components/tab/tab";
import { DemoSection, demoStyles as s } from "../demo-block";

export function TabDemo() {
  const [active, setActive] = useState("overview");

  return (
    <>
      <DemoSection title="TabList — horizontal" description="기본 수평 탭">
        <TabList orientation="horizontal">
          {["overview", "usage", "tokens", "history"].map((v) => (
            <Tab
              key={v}
              selected={active === v}
              onClick={() => setActive(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Tab>
          ))}
          <Tab tabType="more" aria-label="more tabs" />
        </TabList>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Active: {active}</div>
      </DemoSection>

      <DemoSection
        title="States"
        description="default · hover · selected · disabled · with icon · count · closable"
        more={
          <TabList>
            <Tab state="default">Default</Tab>
            <Tab state="hover">Hover</Tab>
            <Tab state="selected">Selected</Tab>
            <Tab disabled>Disabled</Tab>
            <Tab leadingIcon count="12">
              With extras
            </Tab>
            <Tab closable>Closable</Tab>
          </TabList>
        }
      >
        <TabList>
          <Tab selected>With icon</Tab>
          <Tab count={3}>With count</Tab>
          <Tab closable>Closable</Tab>
        </TabList>
      </DemoSection>
    </>
  );
}

export default TabDemo;
