import type { StoryObj } from "@storybook/react";

import { Icon, IconNames } from "./icon";
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: IconNames,
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "s", "m", "l", "xl", "xxl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "ArrowRight",
    size: "m",
  },
};
