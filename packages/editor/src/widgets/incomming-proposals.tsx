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
  name: "incomming-proposals",
  displayName: "Incomming Proposals",
  icon: "Table",
  group: "General",
  dataFetcher: {
    key: "incomming-proposals",
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
        status: "PENDING",
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
            endAt: date(proposal.endsAt).fromNow(),
            startAt: date(proposal.startsAt).fromNow(),
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
      props={[{ name: "first", type: "number", label: "First" }]}
    />
  ),
  initialProps: {
    first: 5,
    title: "Incomming Proposals",
    background: "#fffae1",
    headerMap: {
      nounId: "Builder",
      title: "Title",
      status: "Status",
      categories: "Categories",
      budget: "Budget",
      startAt: "Starts In",
    },
    className: "",
    layout: {
      w: Infinity,
      h: 23,
      x: 0,
      y: 0,
    },
  },
});
