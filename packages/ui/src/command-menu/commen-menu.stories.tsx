import { Dialog, DialogTrigger } from "../dialog";
import { CommandMenu, CommandMenuProps } from "./command-menu";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommandMenu> = {
  title: "Components/CommandMenu",
  component: CommandMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

const Temaplate = (args: CommandMenuProps) => {
  return (
    <Dialog>
      <DialogTrigger>Menu</DialogTrigger>
      <CommandMenu {...args} />
    </Dialog>
  );
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "Account",
        icon: "Search",
        shortcut: "Ctrl+Shift+P",
        handler: () => {
          alert("Viva");
        },
      },
      {
        id: "2",
        name: "Profile",
        icon: "Info",
        group: "Settings",
        shortcut: "Ctrl+Shift+P",
        handler: () => {
          alert("Viva");
        },
      },
      {
        id: "3",
        name: "Help",
        icon: "HelpCircle",
        shortcut: "Ctrl+Shift+P",
        handler: () => {
          alert("Viva");
        },
      },
    ],
  },
  render: Temaplate,
};
