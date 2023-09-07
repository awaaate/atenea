import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";

const ProposalVotesView = lazy(() =>
  import("@shared/views/src/votes/proposal-votes").then((module) => ({
    default: module.ProposalVotesView,
  }))
);
export default WidgetFactory.createWidget({
  name: "Proposal Votes",
  displayName: "Proposal Votes",
  icon: "Users",
  group: "Proposal",
  View: ProposalVotesView,
  dataFetcher: {
    key: "proposal-votes",
    collector(props) {
      return {
        requestVariables: {
          proposalId: props.proposalId as number,
        },
      };
    },
    async fetcher(args) {
      if (!args) {
        return {
          votes: [],
        };
      }

      const proposalVotes = await sourceFetcher.getProposalVotes.query(
        args.requestVariables.proposalId
      );

      return {
        votes: proposalVotes,
      };
    },
  },
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
    />
  ),
  FullScreenView: ProposalVotesView,
  skeleton: <div>Proposal Team</div>,
  initialProps: {
    proposalId: 340,
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
});
