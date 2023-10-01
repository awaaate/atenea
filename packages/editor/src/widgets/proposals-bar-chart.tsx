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
  displayName: "Last 2 Months Proposals Analysis",
  icon: "BarChart",
  group: "General",
  Config: () => <ViewColorsConfig />,
  dataFetcher: {
    key: "proposalsMeta",
    collector(props) {
      const currentDate = new Date();

      // Subtract 2 months from the current date
      currentDate.setMonth(currentDate.getMonth() - 2);

      // Get the timestamp for the date 2 months ago
      const timestamp = currentDate.getTime();
      return {
        requestVariables: {
          first: 1000,
          orderBy: "createdTimestamp" as const,
          createdTimestamp: parseInt((timestamp / 1000).toString()),
        },
      };
    },
    async fetcher(args) {
      if (!args) {
        return {
          data: [],
        };
      }
      const proposals = await sourceFetcher.proposalsMeta.query(
        args.requestVariables
      );
      return {
        data: proposals,
      };
    },
    mapper({ data }) {
      const proposals = data;

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
    colors: ["indigo", "blue", "green", "red", "gray" as const],
    title: "Last 2 Months Proposals Analysis",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: AreaView,
});
