import { Meta, StoryObj } from "@storybook/react";
import { UserAccountDropdown } from "./user-account-dropdown";

export default {
  title: "Dashboard/User Account Dropdown",
  component: UserAccountDropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserAccountDropdown>;

export const Default = {
  args: {
   session: {
     user: {
      id: "cll7sfwmp0000fvqa83xdcnsu",
      name: "John Doe",
      walletAddress: "0x1234567890",
      avatarUrl: "https://avatars.githubusercontent.com/u/263385",
    },
   }
  },
} as StoryObj<typeof UserAccountDropdown>;
