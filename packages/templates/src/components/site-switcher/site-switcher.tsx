"use client";

import { Avatar } from "@shared/ui/src/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@shared/ui/src/dropdown-menu";

import { Icon } from "@shared/ui/src/icon";
import { Link } from "@shared/ui/src/link";
import { SidebarHeader } from "@shared/ui/src/sidebar";

import { useEffect, useState } from "react";
import { useLayoutStore } from "../../stores/layoutStore";

export type SitesList = { id: string; name: string | null }[];
interface SiteSwitcherProps {
  workspaces: SitesList;
  workspaceId: string;
  onSignout: () => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  createWorkspace: () => void;
}
const SiteSwitcher = ({
  workspaceId,
  workspaces,
  onSignout,
  setTheme,
  theme,
  createWorkspace,
}: SiteSwitcherProps) => {
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentSite = workspaces.find(
    (workspace) => workspace.id === workspaceId
  )!;

  return (
    <SidebarHeader className="border-0 p-0 m-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex px-4 items-center shadow-none  border-0 h-min py-2 break-words  rounded-default gap-2   hover:bg-black/10 data-[state=open]:>svg">
          <span className="flex items-center gap-2">
            <Avatar size="sm" name={(currentSite && currentSite.name) || ""} />
            {!collapsedSidebar &&
              currentSite &&
              currentSite.name?.substring(0, 10)}
          </span>

          {!collapsedSidebar && (
            <Icon
              name="ChevronDown"
              className="ml-auto collapse-icon text-text-weakest "
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuRadioGroup value={currentSite.id}>
            {workspaces.map((workspace) => (
              <Link
                href={`/app/${workspace.id}`}
                key={workspace.id}
                className="w-full cursor-pointer"
              >
                <DropdownMenuRadioItem value={workspace.id}>
                  <div className="flex items-center gap-2 pl-2 data-[]:">
                    <Avatar
                      size="sm"
                      name={workspace.name || ""}
                      className="icon-l"
                    />
                    {workspace.name}
                  </div>
                </DropdownMenuRadioItem>
              </Link>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuItem onSelect={createWorkspace}>
            <Icon name="Plus" className="mr-2" />
            Create a Workspace
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === "light" ? (
                <Icon name="Moon" className="mr-2" />
              ) : (
                <Icon name="Sun" className="mr-2" />
              )}
              theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onSelect={() => {
                    setTheme("light");
                  }}
                >
                  <Icon name="Sun" className="mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  <Icon name="Moon" className="mr-2" />
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={onSignout}>
              <Icon name="LogOut" className="mr-2" />
              <Link href={`/app/${currentSite.id}`}>Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
  );
};
export { SiteSwitcher };
