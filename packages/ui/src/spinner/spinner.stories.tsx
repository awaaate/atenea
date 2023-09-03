import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  render: () => {
    return (
      <div className="flex items-center justify-center gap-4 ">
        <Spinner size="xxs" />
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
        <Spinner size="xxl" />
      </div>
    );
  },
};
