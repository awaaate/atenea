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
  displayName: "Executed Proposals",
  icon: "Table",
  group: "General",
  dataFetcher: {
    key: "active-proposals",
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
            budget: proposal.totalBudget.toLocaleString() + " ETH",
            startAt: date(proposal.startsAt).fromNow(),
            endAt: date(proposal.endsAt).fromNow(),
          }))
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
    headerMap: {
      nounId: "Builder",
      title: "Title",
      status: "Status",
      endAt: "Ended",
      categories: "Categories",
      budget: "Budget",
    },
    className: "",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
});
