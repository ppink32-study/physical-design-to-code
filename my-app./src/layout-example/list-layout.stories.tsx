import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ListLayoutPage } from "./list-layout";

const meta: Meta<typeof ListLayoutPage> = {
  title: "Layout Example/List Layout",
  component: ListLayoutPage,
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
type Story = StoryObj<typeof ListLayoutPage>;

/**
 * Default — Storybook iframe 전체를 채워 실제 페이지처럼 렌더링.
 * 브라우저(또는 storybook iframe) 폭을 줄이면 clamp 반응형이 그대로 동작합니다.
 *  · ≥1920: 좌우 여백 240, content 1440 (Phase 1)
 *  · 1488 : 좌우 24, content 1440 (Phase 1 → 2 경계)
 *  · <1488: 좌우 24 고정, content 가 비율로 축소 (Phase 2)
 *
 * iframe 외 chrome(addons panel 등) 까지 숨기려면 URL 의 `?path=...` 부분을
 * `iframe.html?id=...` 로 바꾸어 진입하면 됩니다.
 */
export const Default: Story = {
  name: "Default",
  render: () => <ListLayoutPage />,
};
