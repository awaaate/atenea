"use client";

import { SelectProject } from "@/db";
import { trpc } from "@/lib/trpcClient";
import { CommandMenu, Dialog, DialogTrigger, Icon } from "@shared/ui";
import React from "react";

type Project = SelectProject;
interface ProjectCommandMenuProps {
  addProject: (project: Project) => void;
}
export const ProjectCommandMenu = ({ addProject }: ProjectCommandMenuProps) => {
  const { isLoading, data } = trpc.getProjects.useQuery();

  const [isOpen, setIsOpen] = React.useState(false);

  if (isLoading || !data) return <div>Loading...</div>;

  const addProjectHandler = async (project: Project) => {
    addProject(project);
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={(value) => setIsOpen(value)} open={isOpen}>
      <DialogTrigger className="ml-2 inline-flex ">
        Look up existing project
      </DialogTrigger>
      <CommandMenu
        onDismiss={() => console.log("dismissed")}
        items={[
          ...data.map((project) => ({
            handler: () => {
              addProjectHandler(project);
            },
            id: project.title,
            name: project.title,
            icon: "Users" as const,
            group: "Projects",
          })),
        ]}
      />
    </Dialog>
  );
};
