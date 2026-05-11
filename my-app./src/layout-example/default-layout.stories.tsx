import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DefaultLayoutPage } from "./default-layout";

const meta: Meta<typeof DefaultLayoutPage> = {
  title: "Layout Example/Default",
  component: DefaultLayoutPage,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: { disable: true },
    options: { showPanel: false },
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultLayoutPage>;

/**
 * Default — GNB + LNB 만 있는 가장 단순한 페이지.
 *  · Standard / Focus 모드는 GNB 우측의 SearchToggle 로 전환
 *  · 콘텐츠 영역은 비어 있어 background 가 그대로 노출됨
 */
export const Default: Story = {
  name: "Default",
  render: () => <DefaultLayoutPage />,
};
