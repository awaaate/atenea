import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { lazy } from "react";

const ProposalTable = lazy(() =>
  import("@shared/views/src/table/proposal-table").then((module) => ({
    default: module.ProposalTable,
  }))
);
export default WidgetFactory.createWidget({
  name: "executed-proposals",
  displayName: "Executed Proposals",
  icon: "Table",
  group: "General",
  dataFetcher: {
    key: "executed-proposals",
    collector: (props) => {
      return {
        requestVariables: {
          first: props.first as number,
        },
      };
    },
    fetcher: async (args) => {
      if (!args) {
        return {
          data: [],
        };
      }

      const proposalsMeta = await sourceFetcher.proposalsMeta.query({
        first: args.requestVariables.first,
        orderBy: "createdTimestamp",
        orderDirection: "desc",
        status: "EXECUTED",
      });

      return {
        data: proposalsMeta
          .map((proposal) => ({
            id: proposal.id,
            nounId: proposal.nounId || undefined,
            title: proposal.title,
            status: proposal.status,
            categories: proposal.categories,
            proposer: proposal.proposer,
            budget: proposal.totalBudget,
            votesFor: proposal.forVotes,
            votesAgainst: proposal.againstVotes,
            endAt: proposal.endsAt,
            startAt: proposal.startsAt,
            projectStatus: proposal.projectStatus,
            budgetEth: proposal.budgetEth,
            budgetUsd: proposal.budgetUsd,
          }))
          .filter((proposal) => proposal.status === "Succeeded")
          .sort((a, b) => {
            return new Date(b.endAt).getTime() - new Date(a.endAt).getTime();
          }),
      };
    },
  },
  View: ProposalTable,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "first", type: "number", label: "First" }]}
    />
  ),
  initialProps: {
    first: 5,
    title: "Last executed proposals",

    className: "",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
});
