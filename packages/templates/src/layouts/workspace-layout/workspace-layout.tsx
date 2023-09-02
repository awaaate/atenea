"use client";
import React from "react";
import {
  SiteSwitcher,
  SitesList,
} from "../../components/site-switcher/site-switcher";

import {
  Button,
  Icon,
  Sidebar,
  SidebarFooter,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui";
import { SidebarBoardsNav } from "../../components/sideboard-boards-nav/sidebar-boards-nav";
import { useLayoutStore } from "../../stores/layoutStore";
import type { Session } from "../../types";

interface DashboardLayout {
  children: React.ReactNode;
  workspaces: SitesList;
  workspaceId: string;
  session: Session;
  onSignout: () => void;
}

const WorkspaceLayout: React.FC<DashboardLayout> = ({
  children,
  workspaces,
  workspaceId,
  onSignout,
}) => {
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  return (
    <main className="flex h-screen w-screen overflow-hidden " style={{}}>
      <Sidebar
        className="w-full border-r  flex flex-col px-0 h-full max-w-min  "
        style={{
          transition: "width 0.2s ease-in-out",
        }}
      >
        <div className="justify-end h-[50px] border-b">
          <SiteSwitcher
            workspaces={workspaces}
            workspaceId={workspaceId}
            onSignout={onSignout}
            theme="dark"
            setTheme={() => {}}
          />
        </div>
        <SidebarBoardsNav siteId="2" />
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
    </main>
  );
};

export { WorkspaceLayout };
