import { Meta } from "@storybook/react";
import { SidebarSiteSwitcher } from "./sidebar-site-swicther";

export default {
  title: "Dashboard/Sidebar Site Switcher",
  component: SidebarSiteSwitcher,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SidebarSiteSwitcher>;

const Template = (args) => <SidebarSiteSwitcher {...args} />;

export const Default = Template.bind({});

Default.args = {
  siteId: "cll7sfwmp0000fvqa83xdcnsu",
  sites: [
    {
      id: "cll7sfwmp0000fvqa83xdcnsu",
      name: "Workspace from the future",
    },
    {
      id: "cll7sfwmp0000fvqa83xdcns1u",
      name: "My thoughts",
    },
    {
      id: "cll7sfwmp0000fvqa283xdcnsu",
      name: "My first board",
    },
  ],
};
