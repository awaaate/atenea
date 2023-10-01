"use client";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { useSession } from "next-auth/react";
import { WorkspacesPage } from "@shared/templates/src/pages/workspaces";
import { useCallback, useMemo, useState } from "react";
import { CreateWorkspaceModal } from "@/components/create-workspace-modal/create-worksapce-modal";
import { WorkspaceCard } from "@shared/templates/src/components/workspace-card/workspace-card";
import { Icon } from "@shared/ui/src/icon";
import { cn } from "@shared/ui/src/utils";

interface WorkspacesPageWrapperProps {
  workspaces: {
    name: string;
    description: string;
    accentColor: string;
    id: string;
  }[];
}

export async function WorkspacesPageWrapper({
  workspaces,
}: WorkspacesPageWrapperProps) {
  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    useState(false);

  const workspacesMapped = useMemo(
    () =>
      workspaces.map((w) => ({
        id: w.id,
        title: w.name,
        description: w.description,
        accentColor: w.accentColor,
      })),
    [workspaces]
  );
  return (
    <>
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
          {workspacesMapped.map((workspace) => {
            return <WorkspaceCard {...workspace} />;
          })}
          <CreateWorkspaceCard />
        </div>
      </div>
    </>
  );
}

const CreateWorkspaceCard = () => {
  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    useState(false);
  return (
    <>
      <div
        className={
          " transition-all bg-accent/5 p-2 rounded-default border-2 border-accent/10 hover:bg-accent/20 cursor-pointer  flex flex-col items-center justify-center"
        }
        onClick={() => setCreateWorkspaceModalOpen(true)}
      >
        <Icon name="Plus" className="text-text-weakest " variant={"button"} />
        <span>New Workspace</span>
      </div>
      <CreateWorkspaceModal
        isOpen={createWorkspaceModalOpen}
        setIsOpen={setCreateWorkspaceModalOpen}
      />
    </>
  );
};
