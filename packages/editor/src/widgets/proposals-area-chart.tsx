import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/data-fetchers";
import { lazy } from "react";
import { date } from "@shared/ui/src/date";
import { dataAdapter } from "../lib/utils";

const AreaView = lazy(() =>
  import("@shared/views/src/area/area").then((module) => ({
    default: module.AreaView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposals-area-chart",

  Config: () => <ViewColorsConfig />,
  skeleton: <div>Proposals Ares Chart</div>,
  dataFetcher: {
    key: "proposals-ares-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const proposals = await sourceFetcher.proposalsMeta.query({
        first: 100,
        orderBy: "createdTimestamp",
      });

      const acumulated = {
        PENDING: 0,
        ACTIVE: 0,
        CANCELLED: 0,
        VETOED: 0,
        QUEUED: 0,
        EXECUTED: 0,
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
            ).format("DD/MM/YYYY"),
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
  View: AreaView,
  FullScreenView: AreaView,
});
