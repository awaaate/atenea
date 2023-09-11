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
  name: "categories-donut-chart",
  displayName: "Props by category",
  group: "general",
  icon: "PieChart",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "proposals-meta",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const data = await sourceFetcher.proposalsMeta.query({
        status: "EXECUTED",
        first: 1000,
      });
      const categories = mapReducer(
        {} as Record<string, number>,
        (acc, curr) => {
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
      console.log("categories: ", categories);
      const finalData = Object.keys(categories).map((key) => ({
        name: key,
        "Number of proposals": categories[key],
      }));
      console.log("finalData: ", finalData);

      return {
        data: finalData,
        index: "name",
        category: "Number of proposals",
        valueFormatter(number) {
          return ` ${number} Proposals`;
        },
      };
    },
  },
  initialProps: {
    colors: ["stone" as const],
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
