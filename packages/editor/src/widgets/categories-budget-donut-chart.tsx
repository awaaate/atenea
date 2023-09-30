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
        status: "EXECUTED",
        first: 1000,
      });
      const countedProposals = new Set<string>();
      const categories = mapReducer(
        {} as Record<string, number>,
        (acc, curr) => {
          if (!curr?.categories) {
            acc["Uncategorized"] = acc["Uncategorized"]
              ? acc["Uncategorized"] +
                (curr && curr.totalBudget ? curr.totalBudget : 0)
              : 0;
            return acc;
          }
          curr.categories.forEach((category: string) => {
            category = category.toLocaleLowerCase().trim() || "Uncategorized";
            if (countedProposals.has(curr.id)) return;
            countedProposals.add(curr.id);
            const currentValue = acc[category];
            acc[category] =
              typeof currentValue === "number"
                ? currentValue + (curr.budgetEth || curr.totalBudget)
                : 0;
          });
          return acc;
        },
        data.filter((d) => d.status === "Succeeded")
      );
      const finalData = Object.keys(categories).map((key) => ({
        name: key.trim() || "Uncategorized",
        Budget: categories[key],
      }));

      return {
        data: finalData,
        index: "name",
        category: "Budget",
        valueFormatter(number) {
          return `${number.toLocaleString()} Eth`;
        },
      };
    },
  },
  initialProps: {
    colors: ["gray" as const],
    title: "Props budget founded by category",
    layout: {
      w: 7,
      h: 16,
      x: 0,
      y: 0,
    },
  },
  View: DonutView,
});
