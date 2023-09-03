import { ScrollArea } from "@shared/ui/src/scroll-area";
import React from "react";
import { WorkspaceTobar } from "../..";
interface WorkspacePageProps {
  children: React.ReactNode;
  workspaceName: string;
}
export const WorkspacePage: React.FC<WorkspacePageProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-col font-medium">
      <WorkspaceTobar />
      <ScrollArea>{children}</ScrollArea>
    </div>
  );
};
