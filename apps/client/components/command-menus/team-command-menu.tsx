"use client";

import React from "react";
import { Dialog, DialogTrigger, CommandMenu, Icon } from "@shared/ui";
import { db, SelectTeamMember, SelectSocialHandle } from "@/db";
import { trpc } from "@/lib/trpcClient";

type Team = SelectTeamMember & { socialHandles: SelectSocialHandle[] };
interface TeamCommanMennuProps {
  addTeam: (team: Team) => void;
}
export const TeamCommanMennu = ({ addTeam }: TeamCommanMennuProps) => {
  const { isLoading, data } = trpc.getTeamMembers.useQuery();

  const [isOpen, setIsOpen] = React.useState(false);

  if (isLoading || !data) return <div>Loading...</div>;

  const addTeamHandler = async (team: Team) => {
    addTeam(team);
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={(value) => setIsOpen(value)} open={isOpen}>
      <DialogTrigger className="ml-2 inline-flex ">
        <Icon name="Plus" className="" />
      </DialogTrigger>
      <CommandMenu
        onDismiss={() => console.log("dismissed")}
        items={[
          {
            handler: () => {
              addTeamHandler({
                name: "Team 1",
                what: "",
                walletAddress: "",
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
                socialHandles: [
                  {
                    id: 1,
                    name: "Twitter",
                    url: "https://twitter.com/1",
                    teamMemberName: "Team 1",
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString(),
                  },
                ],
              });
            },
            id: "create-team",
            name: "Create Team",
            icon: "Plus",
          },
          ...data.map((team) => ({
            handler: () => {
              addTeamHandler(team);
            },
            id: team.name,
            name: team.name,
            icon: "Users" as const,
            group: "Teams",
          })),
        ]}
      />
    </Dialog>
  );
};
