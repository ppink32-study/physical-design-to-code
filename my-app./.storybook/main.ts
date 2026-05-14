import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // `src/layout-example/**` 는 의도적으로 제외 — 코드는 남기되 Storybook 사이드바에는 노출하지 않는다.
  stories: [
    "../src/commons/**/*.stories.@(ts|tsx|js|jsx|mdx)",
    "../src/components/**/*.stories.@(ts|tsx|js|jsx|mdx)",
    "../src/stories/**/*.stories.@(ts|tsx|js|jsx|mdx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  staticDirs: ["../public"],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
