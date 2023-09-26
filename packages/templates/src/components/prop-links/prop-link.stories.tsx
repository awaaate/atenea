import { StoryFn } from "@storybook/react";
import { PropLinks } from "./prop-links";

export default {
  title: "Components/Prop Links",
  component: PropLinks,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};
export const Default: StoryFn = () => {
  return (
    <div className="bg-surface-lowered w-screen h-screen flex justify-center items-center">
      <PropLinks id="123" />
    </div>
  );
};
