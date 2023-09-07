import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { BAR_CHART_SKELETON } from "../widget/skeletons";

const BarChartView = lazy(() =>
  import("@shared/views/src/bar-chart/bar-chart").then((module) => ({
    default: module.BarChartView,
  }))
);

export default WidgetFactory.createWidget({
  name: "categories-bar-chart",
  displayName: "Categories Bar Chart",
  group: "general",
  icon: "BarChart",
  Config: () => <ViewColorsConfig />,
  skeleton: BAR_CHART_SKELETON,
  dataFetcher: {
    key: "categories-bar-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const data = await sourceFetcher.categories.query();

      return {
        data,
        index: "name",
        categories: ["totalBudget"],
      };
    },
  },
  initialProps: {
    colors: ["indigo" as const],
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
