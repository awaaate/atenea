import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { mapReducer } from "@shared/api/src/utils/reducer";

const DonutView = lazy(() =>
  import("@shared/views/src/donut/donut").then((module) => ({
    default: module.Donut,
  }))
);

export default WidgetFactory.createWidget({
  name: "categories-budget-donut-chart",
  displayName: "Props budget by category",
  group: "general",
  icon: "PieChart",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "proposals-meta-2",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const data = await sourceFetcher.proposalsMeta.query({
        first: 1000,
      });
      const categories = mapReducer(
        {} as Record<string, number>,
        (acc, curr) => {
          if (!curr?.categories) {
            acc["Uncategorized"] = acc["Uncategorized"]
              ? acc["Uncategorized"] + curr?.totalBudget || 0
              : 0;
            return acc;
          }
          curr.categories.forEach((category: string) => {
            console.log("curr: ", curr);
            category = category.toLocaleLowerCase().trim() || "Uncategorized";
            const currentValue = acc[category];
            console.log("currentValue: ", currentValue);
            acc[category] =
              typeof currentValue === "number"
                ? currentValue + curr.totalBudget
                : 0;
          });
          return acc;
        },
        data
      );
      console.log("categories: ", categories);
      const finalData = Object.keys(categories).map((key) => ({
        name: key.trim() || "Uncategorized",
        Budget: categories[key],
      }));
      console.log("finalData: ", finalData);

      return {
        data: finalData,
        index: "name",
        category: "Budget",
        valueFormatter(number) {
          return `${number} Eth`;
        },
      };
    },
  },
  initialProps: {
    colors: ["stone" as const],
    title: "Props budget founded by category",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: DonutView,
});
