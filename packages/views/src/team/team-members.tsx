import React from "react";
import { TeamMemberViewProps, TeamMemberView } from "./team-member";
import { Separator } from "@shared/ui/src/separator";
export const TeamMembersViews: React.FC<{
  teamMembers: TeamMemberViewProps[];
}> = ({ teamMembers }) => {
  return (
    <div className="flex gap-2 flex-col">
      {teamMembers.map((teamMember) => (
        <>
          <TeamMemberView {...teamMember} />
          {/* Add separator if it's not the last */}
          {teamMember !== teamMembers[teamMembers.length - 1] && (
            <Separator orientation="horizontal" className=" " />
          )}
        </>
      ))}
    </div>
  );
};
