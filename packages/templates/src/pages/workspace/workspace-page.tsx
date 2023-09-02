import { ScrollArea } from "@shared/ui";
import React from "react";
interface WorkspacePageProps {
  children: React.ReactNode;
  workspaceName: string;
}
export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  children,
  workspaceName,
}) => {
  return (
    <div className="flex w-full flex-col font-medium">
      <div className=" w-full  border-b h-[50px] flex items-center px-4 font-semibold">
        {workspaceName || "Workspace"}
      </div>
      <ScrollArea>{children}</ScrollArea>
    </div>
  );
};
