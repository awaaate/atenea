import React from "react";
import { TeamMemberViewProps, TeamMemberView } from "./team-member";
import { Separator } from "@shared/ui/src/separator";
export const TeamMembersViews: React.FC<{
  teamMembers: TeamMemberViewProps[];
}> = ({ teamMembers }) => {
  return (
    <div className="flex flex-wrap gap-1 p-2">
      {teamMembers.map((teamMember) => (
        <TeamMemberView {...teamMember} key={teamMember.name} />
      ))}
    </div>
  );
};
