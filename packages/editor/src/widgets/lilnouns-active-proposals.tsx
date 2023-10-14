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
  name: "lilnouns-active-prposals",
  displayName: "Lil Nouns Proposals",
  icon: "Table",
  group: "Lil Nouns",
  dataFetcher: {
    key: "lilnounsProposalsMeta",
    collector: (props) => {
      return {
        requestVariables: {
          orderBy: "createdTimestamp",
          orderDirection: "desc",
          first: props.first,
        } as const,
      };
    },
    fetcher: async (args) => {
      if (!args) {
        return {
          data: [],
        };
      }

      const proposalsMeta = await sourceFetcher.getLilNounsProposalsMeta.query(
        args.requestVariables as any
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
        lilNouns: true,
        data: proposalsMeta.map((proposal) => ({
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
        })),
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
