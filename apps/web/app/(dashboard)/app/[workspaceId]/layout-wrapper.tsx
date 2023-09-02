"use client";
import { SiteSwitcher } from "@shared/templates/src/components/site-switcher/site-switcher";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import {
  Button,
  Icon,
  Sidebar,
  SidebarFooter,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui";
import { signOut } from "next-auth/react";

import { useTheme } from "next-themes";
import { BoardsSidebar } from "./board-sidebar";
import { useEffect } from "react";

interface WorkspaceLayoutWrapperProps {
  children: React.ReactNode;
  workspaces: { id: string; name: string | null }[];
  boards: { id: string; name: string | null }[];

  workspaceId: string;
}
export default function WorkspaceLayoutWrapper({
  children,
  boards,
  workspaceId,
  workspaces,
}: WorkspaceLayoutWrapperProps) {
  const { theme, setTheme } = useTheme();
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  useEffect(() => {
    useLayoutStore.setState({ boards: boards as any, workspaceId });
  }, [workspaceId, boards]);

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
    </main>
  );
}
