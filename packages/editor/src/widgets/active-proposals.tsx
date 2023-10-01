import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { lazy } from "react";
import { arrayReducer, mapReducer } from "@shared/api/src/utils/reducer";
import { date } from "@shared/ui/src/date";

const ProposalTable = lazy(() =>
  import("@shared/views/src/table/proposal-table").then((module) => ({
    default: module.ProposalTable,
  }))
);
export default WidgetFactory.createWidget({
  name: "active-proposals",
  displayName: "Active Proposals",
  icon: "Table",
  group: "General",
  dataFetcher: {
    key: "proposalsMeta",
    collector: (props) => {
      return {
        requestVariables: {
          first: props.first as number,
          orderBy: "createdTimestamp",
          orderDirection: "desc",
          status: "ACTIVE",
        } as const,
      };
    },
    fetcher: async (args) => {
      if (!args) {
        return {
          data: [],
        };
      }

      const proposalsMeta = await sourceFetcher.proposalsMeta.query(
        args.requestVariables
      );
      return {
        proposalsMeta,
      };
    },
    mapper({ proposalsMeta }) {
      if (!proposalsMeta) {
        return {
          data: [],
        };
      }

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
          .sort((a, b) => {
            return (
              new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
            );
          }),
      };
    },
  },
  View: ProposalTable,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "first", type: "number", label: "Show me last" }]}
    />
  ),
  initialProps: {
    first: 5,
    title: "Active Proposals",
    className: "",
    layout: {
      w: Infinity,
      h: 23,
      x: 0,
      y: 0,
    },
  },
});
