import { Meta } from "@storybook/react";
import { SiteSwitcher } from "./site-switcher";
export default {
  title: "Dashboard/Site Switcher",
  component: SiteSwitcher,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof SiteSwitcher>;

export const Default = () => (
  <SiteSwitcher
    siteId="cll7sfwmp0000fvqa83xdcnsu"
    sites={[
      {
        id: "cll7sfwmp0000fvqa83xdcnsu",
        name: "Workspace",
      },
      {
        id: "cll7sfwmp0000fvqa83xdcns1u",
        name: "My thoughts",
      },
      {
        id: "cll7sfwmp0000fvqa283xdcnsu",
        name: "My first board",
      },
    ]}
  />
);
