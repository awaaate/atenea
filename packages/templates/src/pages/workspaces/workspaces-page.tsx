import { Icon } from "@shared/ui/src/icon";
import { cn } from "@shared/ui/src/utils";
import React from "react";
import {
  CreateWorkspaceCard,
  WorkspaceCard,
} from "../../components/workspace-card/workspace-card";

interface WorkspacesPageProps {
  workspaces: {
    title: string;
    description: string;
    accentColor: string;
    id: string;
  }[];
  createWorkspace: () => void;
}
export const WorkspacesPage: React.FC<WorkspacesPageProps> = ({
  workspaces,
  createWorkspace,
}) => {
  return (
    <div className="w-screen h-screen  ">
      <div
        className={cn(
          "w-full  border-b h-[50px]  px-4 flex items-center max-w-5xl mx-auto mb-8 "
        )}
      >
        <div className="flex items-center mx-4 gap-2">
          <Icon name="Home" className="text-text-weakest" size="s" />
          <h2 className="text-xl font-semibold text-text-weaker">
            My Workspaces
          </h2>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto  gap-4 flex-wrap grid grid-cols-1 md:grid-cols-3 ">
        {workspaces.map((workspace) => {
          return <WorkspaceCard {...workspace} />;
        })}
        <CreateWorkspaceCard clickHandler={createWorkspace} />
      </div>
    </div>
  );
};
