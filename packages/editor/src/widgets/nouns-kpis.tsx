import {} from "@shared/api/src/utils/reducer";
import { joinViews } from "@shared/views/src/join-views";
import { ComponentPropsWithoutRef, lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { ProposalStatus } from "@shared/api/src/api/data-source/proposals-meta/types";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { ViewColorsConfig } from "@shared/views/src/view-config/chart-color/view-colors";
import { date } from "@shared/ui/src/date";

const BarChartView = lazy(() =>
  import("@shared/views/src/bar-chart/bar-chart").then((module) => ({
    default: module.BarChartView,
  }))
);

export default WidgetFactory.createWidget({
  name: "nouns-kpis",
  displayName: "Nouns Proposals Stats",
  group: "general",
  icon: "BarChartHorizontal",

  dataFetcher: {
    key: "nouns-kpis",
    async fetcher(args) {
      const currentDate = new Date();
      currentDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);

      const createdTimestamp = Math.ceil(currentDate.getTime() / 1000);
      const data = await sourceFetcher.proposalsMeta.query({
        orderBy: "createdTimestamp",
        first: 1000,
        createdTimestamp,
      });

      //group by month
      const groupedByMonth = data.reduce(
        (acc, curr) => {
          const month = curr.createdTimestamp.getMonth();

          if (!acc[month]) {
            acc[month] = {
              denied: 0,
              executed: 0,
              canceled: 0,
              active: 0,
              date: new Date(curr.createdTimestamp),
            };
          }
          if (curr.status === ProposalStatus.Defeated) {
            acc[month].denied++;
          }
          if (curr.status === ProposalStatus.Succeeded) {
            acc[month].executed++;
          }
          if (curr.status === ProposalStatus.Cancelled) {
            acc[month].canceled++;
          }
          if (curr.status === ProposalStatus.Pending) {
            acc[month].active++;
          }

          return acc;
        },
        {} as Record<
          number,
          {
            denied: number;
            executed: number;
            canceled: number;
            active: number;
            date: Date;
          }
        >
      );

      return {
        data: Object.entries(groupedByMonth)
          .map(([key, value]) => ({
            name: date(value.date).format("MMMYY"),
            ...value,
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime()),
        index: "name",
        categories: ["denied", "executed", "canceled", "active"],
        valueFormatter(number) {
          return `${number} Proposals`;
        },
      };
    },
  },
  View: BarChartView,
  initialProps: {
    title: "Nouns Proposals Stats",
    colors: ["red", "green", "yellow", "blue"],
    layout: {
      w: Infinity,
      h: 7,
      x: 0,
      y: 0,
    },
  },
  Config: () => <ViewColorsConfig />,
});
