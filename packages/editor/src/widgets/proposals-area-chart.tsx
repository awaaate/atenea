import { ViewColorsConfig } from "@shared/views/src/view-config/view-colors";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/data-fetchers";
import { lazy } from "react";
import { date } from "@shared/ui/src/date";

const AreaView = lazy(() =>
  import("@shared/views/src/area/area").then((module) => ({
    default: module.AreaView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposals-ares-chart",
  Config: () => <ViewColorsConfig />,
  skeleton: <div>Proposals Ares Chart</div>,
  dataFetcher: {
    key: "proposals-ares-chart",
    collector(props) {
      return {
        colors: props.colors,
      };
    },
    async fetcher(args) {
      const proposals = await sourceFetcher.proposalsMeta.query({
        first: 100,
        orderBy: "createdTimestamp",
      });

      console.log(proposals);
      return {
        data: proposals.map((proposal) => ({
          date: date(new Date(Number(proposal.createdTimestamp) * 1000)).format(
            "DD/MM/YYYY"
          ),
          [proposal.status]: proposal.values
            .reduce((acc, curr) => acc + Number(curr), 0)
            .toString(),
        })),
        colors: args?.colors as any,
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
    colors: ["indigo" as const, "cyan" as const],
  },
  View: AreaView,
  FullScreenView: AreaView,
});
