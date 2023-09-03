import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "circle", "rect"],
    },
  },

  tags: ["autodocs"],
};

const Template = (args: any) => {
  return (
    <div className="w-[500px]">
      <Skeleton {...args} />
    </div>
  );
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
  },
  render: Template,
};

export const Card = () => {
  return (
    <div className="w-[500px] flex gap-4">
      <Skeleton type="rect" />
      <div className="flex flex-col gap-2 w-1/3">
        <div className="flex justify-between">
          <Skeleton type="circle" className="icon-l" />

          <Skeleton type="text" className="max-w-[100px]" />
        </div>
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
    </div>
  );
};
