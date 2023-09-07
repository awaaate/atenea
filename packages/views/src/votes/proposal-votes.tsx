import React from "react";
import { ProposalVoteView, ProposalVoteViewProps } from "./proposal-vote";
import { useNodeActions } from "@shared/editor/src/engine/nodes";

export const ProposalVotesView: React.FC<{
  votes: ProposalVoteViewProps[];
}> = ({ votes }) => {
  const { setNode } = useNodeActions();
  React.useEffect(() => {
    setNode((node) => {
      node.data.props.title = `Votes (${votes.length})`;
      return node;
    });
  }, [votes]);
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {votes.map((vote) => {
        return <ProposalVoteView {...vote} key={vote.id} />;
      })}
    </div>
  );
};
