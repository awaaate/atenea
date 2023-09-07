import React from "react";
import { Avatar } from "@shared/ui/src/avatar";
import { Badge } from "@shared/ui/src/badge";
export interface ProposalVoteViewProps {
  id: string;
  support: boolean;
  supportDetailed: number;
  votes: string;
  reason?: string;
  voter: {
    id: string;
  };
}
export const ProposalVoteView: React.FC<ProposalVoteViewProps> = ({
  id,
  support,
  supportDetailed,
  votes,
  reason,
  voter,
}) => {
  const badgeVariant =
    supportDetailed === 1
      ? "success"
      : supportDetailed === 0
      ? "danger"
      : "info";
  return (
    <div className="flex p-2 rounded-default border bg-surface-raised">
      <Avatar name={voter.id} className="mr-2" />
      <div className="flex flex-col">
        <div className="flex items-end">
          <div className="text-sm font-semibold">{voter.id.slice(0, 9)}</div>
          <Badge className="ml-2" variant={badgeVariant}>
            <span className="mr-1">{votes}</span>
            {supportDetailed == 1
              ? "FOR"
              : supportDetailed == 0
              ? "AGAINST"
              : "ABSTAIN"}
          </Badge>
        </div>
        <div className="text-sm text-text-weaker">
          {reason || "Reason no provided"}
        </div>
      </div>
    </div>
  );
};
