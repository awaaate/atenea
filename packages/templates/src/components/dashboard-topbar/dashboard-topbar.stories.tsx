import { DashboardTopbar } from "./dashboard-topbar";

import { StoryFn } from "@storybook/react";

export default {
  title: "Dashboard/Topbar",
  component: DashboardTopbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};
export const Default: StoryFn = () => {
  return (
    <DashboardTopbar
      session={{
        user: {
          id: "cll7sfwmp0000fvqa83xdcnsu",
          name: "John Doe",
          walletAddress: "0x1234567890",
          avatarUrl: "https://avatars.githubusercontent.com/u/263385",
        },
      }}
      onSignout={() => {}}
    />
  );
};
