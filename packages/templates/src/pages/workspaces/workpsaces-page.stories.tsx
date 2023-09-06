import { Meta, StoryObj } from "@storybook/react";
import { WorkspacesPage } from "./workspaces-page";
import { trpc } from "@shared/editor/src/lib/trpc";
import { useEffect, useState } from "react";

const meta = {
  title: "Pages/Workspaces Page",
  component: WorkspacesPage,
} as Meta<typeof WorkspacesPage>;

export const Default: StoryObj<typeof meta> = {
  args: {
    workspaces: [
      {
        title: "Workspace 1",
        description: "Workspace 1 description",
        accentColor: "red",
        subdomain: "workspace1",
      },
      {
        title: "Workspace 2",
        description: "Workspace 2 description",
        accentColor: "blue",
        subdomain: "workspace2",
      },
      {
        title: "Workspace 3",
        description: "Workspace 3 description",
        accentColor: "green",
        subdomain: "workspace3",
      },
      {
        title: "Workspace 4",
        description: "Workspace 4 description",
        accentColor: "purple",
        subdomain: "workspace4",
      },
      {
        title: "Workspace 5",
        description: "Workspace 5 description",
        accentColor: "yellow",
        subdomain: "workspace5",
      },
    ],
  },
};
export default meta;
