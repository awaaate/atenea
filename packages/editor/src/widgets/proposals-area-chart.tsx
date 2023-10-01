import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { lazy } from "react";
import { date } from "@shared/ui/src/date";
import { dataAdapter } from "../lib/utils";
import { joinViews } from "@shared/views/src/join-views";

const AreaView = lazy(() =>
  import("@shared/views/src/area/area").then((module) => ({
    default: module.AreaView,
  }))
);

const JoinedViews = joinViews(AreaView, AreaView, AreaView);
export default WidgetFactory.createWidget({
  name: "proposals-area-chart",

  Config: () => <ViewColorsConfig />,
  skeleton: <div>Proposals Ares Chart</div>,
  displayName: "Proposals Area Chart",
  icon: "AreaChart",
  group: "Proposal",
  dataFetcher: {
    key: "proposalsMeta",
    collector(props) {
      return {
        requestVariables: {
          first: 100,
          orderBy: "createdTimestamp" as const,
        },
      };
    },
    async fetcher(args) {
      if (!args) {
        return {
          data: [],
        };
      }
      const proposals = await sourceFetcher.proposalsMeta.query(
        args.requestVariables
      );
      return {
        data: proposals,
      };
    },
    mapper({ data }) {
      const acumulated = {
        Succeed: 0,
        Pending: 0,
        Cancelled: 0,
        Defeated: 0,
        Active: 0,
        Voting: 0,
      };
      const getValueFromProposal = (proposal: any) =>
        proposal.values.reduce((acc, curr) => acc + Number(curr), 0);

      return {
        data: proposals.map((proposal) => {
          acumulated[proposal.status] =
            getValueFromProposal(proposal) + acumulated[proposal.status];

          return {
            date: date(
              new Date(Number(proposal.createdTimestamp) * 1000)
            ).format("MM"),
            [proposal.status]: acumulated[proposal.status],
          };
        }),
        index: "date",
        categories: [
          "PENDING",
          "ACTIVE",
          "CANCELLED",
          "VETOED",
          "QUEUED",
          "EXECUTED",
        ],
      };
    },
  },
  initialProps: {
    colors: [
      "indigo" as const,
      "cyan" as const,
      "red" as const,
      "green" as const,
      "yellow" as const,
      "purple" as const,
    ],
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: JoinedViews,
  FullScreenView: AreaView,
});
