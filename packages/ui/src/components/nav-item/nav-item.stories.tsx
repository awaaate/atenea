import React from "react";
import { NavItem } from "./nav-item";
import { Meta } from "@storybook/react";

const meta: Meta<typeof NavItem> = {
  title: "Components/NavItem",
  tags: ["autodocs"],
  component: NavItem,
};
export default meta;

type Story = typeof meta;

export const Default: Story = {
  args: {
    className: "",
    children: "NavItem",
    active: false,
    icon: "Home",
    subnav: [
      {
        children: "Subnav 1",
        active: false,
        href: "#",
        icon: "Bell",
      },
      {
        children: "Subnav 2",
        active: false,
        icon: "Users",
        subnav: [
          {
            children: "Subnav 2.1",
            active: false,
            href: "#",
            icon: "Settings",
          },
          {
            children: "Subnav 2.2",
            active: false,
            href: "#",
            icon: "LayoutDashboard",
          },
        ],
      },
    ],
  },
};
