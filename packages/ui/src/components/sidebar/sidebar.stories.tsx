import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "../dropdown-menu";
import { Sidebar, SidebarHeader, SidebarNav } from "./sidebar";
import { Avatar } from "../avatar";
import { Icon } from "../icon";
import { NavItem, NavItemProps } from "../nav-item/nav-item";

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
  properties: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

const NAV: NavItemProps[] = [
  {
    children: "Home",
    active: true,
    href: "#",
    icon: "Home",
  },
  {
    children: "Notifications",
    active: false,
    href: "#",
    icon: "Bell",
  },
  {
    children: "Boards",
    active: false,
    icon: "Folder",
    subnav: [
      {
        children: "main",
        active: false,
        href: "#",
        icon: "FileText",
      },
      {
        children: "nouns",
        active: false,
        href: "#",
        icon: "FileText",
      },
      {
        children: "my second board",
        active: false,
        href: "#",
        icon: "FileText",
      },
    ],
  },
];
const Template = (args: any) => (
  <Sidebar>
    <SidebarHeader className="p-0 border-b-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full bg-nav-surface border-none p-6 py-8 hover:bg-nav-hover rounded-none">
          <span className="flex items-center gap-2">
            <Avatar size="sm" name="jose luis" />
            Jose Luis
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel>My Spaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Space 1</DropdownMenuItem>
            <DropdownMenuItem>Space 2</DropdownMenuItem>
            <DropdownMenuItem>Space 3</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="Settings2" className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="Plus" className="mr-2" />
              Create a space
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
    <SidebarNav>
      {NAV.map((item) => (
        <NavItem {...item} />
      ))}
    </SidebarNav>
  </Sidebar>
);

export const Default = Template.bind({});
