"use client";
import { SiteSwitcher } from "@shared/templates/src/components/site-switcher/site-switcher";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";

import { signOut } from "next-auth/react";

import { useTheme } from "next-themes";
import { BoardsSidebar } from "./board-sidebar";
import { useEffect, useState } from "react";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Sidebar, SidebarFooter } from "@shared/ui/src/sidebar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@shared/ui/src/tooltip";
import { CreateWorkspaceModal } from "@/components/create-workspace-modal/create-worksapce-modal";
import {
  getAccentColor,
  getTextAccentColor,
} from "@shared/ui/src/accent-picker";

interface WorkspaceLayoutWrapperProps {
  children: React.ReactNode;
  workspaces: { id: string; name: string | null }[];
  boards: { id: string; name: string | null }[];
  accentColor?: string;
  workspaceId: string;
}
export default function WorkspaceLayoutWrapper({
  children,
  boards,
  workspaceId,
  accentColor,
  workspaces,
}: WorkspaceLayoutWrapperProps) {
  const { theme, setTheme } = useTheme();
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    useState(false);
  useEffect(() => {
    useLayoutStore.setState({ boards: boards as any, workspaceId });
  }, [workspaceId, boards]);

  //set the accent color variable
  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty(
        "--theme-color-accent",
        getAccentColor(accentColor as any)
      );
      document.documentElement.style.setProperty(
        "--theme-color-accent-text",
        getTextAccentColor(accentColor as any)
      );
    }
  }, [accentColor]);

  return (
    <main className="flex h-screen w-screen overflow-hidden " style={{}}>
      <Sidebar
        className=" border-r  flex flex-col px-0 h-full w-max"
        style={{
          transition: "width 0.2s ease-in-out",
        }}
      >
        <div className="justify-end h-[50px] border-b">
          <SiteSwitcher
            workspaces={workspaces}
            workspaceId={workspaceId}
            onSignout={signOut}
            theme={(theme as "light" | "dark") || "light"}
            setTheme={setTheme}
            createWorkspace={() => {
              console.log("create workspace");
              setCreateWorkspaceModalOpen(true);
            }}
          />
        </div>
        <BoardsSidebar />
        <SidebarFooter className="pt-2 pb-4 flex justify-end">
          <Tooltip>
            <TooltipTrigger>
              <Button variant={"ghost"} onClick={toggleSidebar}>
                <Icon
                  name={!collapsedSidebar ? "PanelLeftClose" : "PanelLeft"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>
                {!collapsedSidebar ? "Collapse Sidebar" : "Expand Sidebar"}
              </span>
            </TooltipContent>
          </Tooltip>
        </SidebarFooter>
      </Sidebar>
      {children}
      <CreateWorkspaceModal
        isOpen={createWorkspaceModalOpen}
        setIsOpen={setCreateWorkspaceModalOpen}
      />
    </main>
  );
}
