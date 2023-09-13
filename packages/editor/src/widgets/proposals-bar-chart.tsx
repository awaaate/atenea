import { date } from "@shared/ui/src/date";
import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";

const AreaView = lazy(() =>
  import("@shared/views/src/area/area").then((module) => ({
    default: module.AreaView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposals-bar-chart",
  displayName: "Last 100 Proposals Analysis",
  icon: "BarChart",
  group: "General",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "proposals-bar-chart",
    collector(props) {
      return {};
    },
    async fetcher(args) {
      const proposals = await sourceFetcher.proposalsMeta.query({
        first: 1000,
        orderBy: "createdTimestamp",
      });
      const chardata = [] as Record<string, any>[];

      let acumulativeBudgetMap = {} as Record<string, number>;

      for (let i = 0; i < proposals.length; i++) {
        const proposal = proposals[i];

        if (!acumulativeBudgetMap[proposal.status]) {
          acumulativeBudgetMap[proposal.status] = 0;
        }
        acumulativeBudgetMap[proposal.status] += proposal.totalBudget;
        let acumulativeBudget = acumulativeBudgetMap[proposal.status];

        chardata.push({
          date: date(proposal.createdTimestamp).format("YYYY:MM"),
          acumulativeBudget,
          ...acumulativeBudgetMap,
        });
      }

      console.log("chardata: ", chardata);

      return {
        data: chardata.map((value) => ({
          ...value,
        })),
        valueFormatter(number) {
          return `${number.toLocaleString()} ETH`;
        },

        index: "date",
        categories: ["Pending", "Voting", "Succeeded", "Defeated", "Cancelled"],
      };
    },
  },
  initialProps: {
    colors: ["indigo", "blue", "green", "red", "stone" as const],
    title: "Last 100 Proposals Analysis",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: AreaView,
});
