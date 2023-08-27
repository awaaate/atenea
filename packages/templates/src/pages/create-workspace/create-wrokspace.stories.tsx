import { CreateWorspacePage } from "./create-wroskapce-page";
import { Meta } from "@storybook/react";
export default {
  title: "Pages/Create Wroskapce Page",
  component: CreateWorspacePage,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof CreateWorspacePage>;

export const Default = () => {
  return <CreateWorspacePage />;
};
