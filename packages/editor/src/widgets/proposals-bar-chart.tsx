import { ViewColorsConfig } from "@shared/views/src/view-config/view-colors";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/data-fetchers";
import { lazy } from "react";
import { date } from "@shared/ui/src/date";
import { dataAdapter } from "../lib/utils";
import { BAR_CHART_SKELETON } from "../widget/skeletons";

const BarChartView = lazy(() =>
  import("@shared/views/src/bar-chart/bar-chart").then((module) => ({
    default: module.BarChartView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposals-bar-chart",
  displayName: "Proposals Bar Chart",
  Config: () => <ViewColorsConfig />,
  skeleton: BAR_CHART_SKELETON,
  dataFetcher: {
    key: "proposals-bar-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const proposals = await sourceFetcher.proposalsMeta.query({
        first: 100,
        orderBy: "createdTimestamp",
      });

      const data = dataAdapter(
        proposals,
        (proposal) => ({
          [proposal.status]: proposal.values.reduce(
            (acc, curr) => acc + Number(curr),
            0
          ),
        }),
        {
          PENDING: 0,
          ACTIVE: 0,
          CANCELLED: 0,
          VETOED: 0,
          QUEUED: 0,
          EXECUTED: 0,
        }
      );
      return {
        data: Object.keys(data).map((key) => ({
          name: key.toLowerCase(),
          value: data[key],
        })),

        index: "name",
        categories: ["value"],
      };
    },
  },
  initialProps: {
    colors: ["indigo" as const, "cyan" as const],
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: BarChartView,
  FullScreenView: BarChartView,
});
