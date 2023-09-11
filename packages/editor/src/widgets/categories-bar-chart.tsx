import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { BAR_CHART_SKELETON } from "../widget/skeletons";

const DonutView = lazy(() =>
  import("@shared/views/src/donut/donut").then((module) => ({
    default: module.Donut,
  }))
);

export default WidgetFactory.createWidget({
  name: "categories-donut-chart",
  displayName: "Categories donut Chart",
  group: "general",
  icon: "PieChart",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "categories-donut-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const data = await sourceFetcher.categories.query();

      return {
        data,
        index: "name",
        category: "totalBudget",
        valueFormatter(number) {
          return `ETH${number}`;
        },
      };
    },
  },
  initialProps: {
    colors: ["indigo" as const],
    title: "Props founded by category",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: DonutView,
});
