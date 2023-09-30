import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { mapReducer } from "@shared/api/src/utils/reducer";
import { IconName } from "@shared/ui/src/icon";

const BarListView = lazy(() =>
  import("@shared/views/src/bar-chart/bar-list").then((module) => ({
    default: module.BarListView,
  }))
);

export default WidgetFactory.createWidget({
  name: "categories-bar-list-chart",
  displayName: "Props by category",
  group: "general",
  icon: "BarChartHorizontal",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "categories-bar-list-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const data = await sourceFetcher.proposalsMeta.query({
        first: 1000,
      });
      const countedProposals = new Set<string>();
      const categories = mapReducer(
        {} as Record<string, number>,
        (acc, curr) => {
          if (!curr) return acc;
          if (countedProposals.has(curr.id)) return acc;
          countedProposals.add(curr.id);
          if (!curr?.categories) {
            acc["Uncategorized"] = acc["Uncategorized"]
              ? acc["Uncategorized"] + 1
              : 1;
            return acc;
          }
          curr.categories.forEach((category: string) => {
            const currentValue = acc[category];
            acc[category] =
              typeof currentValue === "number" ? currentValue + 1 : 1;
          });
          return acc;
        },
        data
      );
      const finalData = Object.keys(categories)
        .map((key) => ({
          name: key,
          value: categories[key],
        }))
        .sort((a, b) => b.value - a.value);

      return {
        data: finalData,
        index: "name",
        categories: ["Number of proposals"],
        valueFormatter(number) {
          return ` ${number}`;
        },
      };
    },
  },
  initialProps: {
    colors: ["lime" as const],
    title: "Props founded by category",
    layout: {
      w: 7,
      h: 16,
      x: 0,
      y: 0,
    },
  },
  View: BarListView,
});
