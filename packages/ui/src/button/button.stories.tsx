import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

import { Icon } from "../icon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "default",
    children: "My button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    size: "default",
    children: (
      <>
        Next
        <Button.RightElement>
          <Icon name="ArrowRight" />
        </Button.RightElement>
      </>
    ),
  },
};
