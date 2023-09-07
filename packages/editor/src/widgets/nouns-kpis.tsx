import { ComponentPropsWithoutRef, lazy } from "react";
import { widgetFactory } from "../widget/factory";
import { WidgetFactory } from "../widget/widget-factory";
import { joinViews } from "@shared/views/src/join-views";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { trpc } from "../lib/trpc";
import { dataSourceRouter } from "@shared/api/src/api/data-source";
import { sourceFetcher } from "../lib/source-fetcher";
import {} from "@shared/api/src/utils/reducer";

const CardAndMetricAndIcon = lazy(() =>
  import("@shared/views/src/kip-card/card-metric-icon").then((module) => ({
    default: module.CardAndMetricAndIcon,
  }))
);

const ComposedViews = joinViews(
  CardAndMetricAndIcon,
  CardAndMetricAndIcon,
  CardAndMetricAndIcon,
  CardAndMetricAndIcon
);

export default WidgetFactory.createWidget({
  name: "nouns-kpis",
  displayName: "Nouns KPIs",
  group: "general",
  icon: "Star",

  dataFetcher: {
    key: "nouns-kpis",
    //@ts-expect-error
    async fetcher(args) {
      const data = await sourceFetcher.proposalsMeta.query({
        orderBy: "createdTimestamp",
        first: 100,
      });

      const totalProposals = data.length;
      const totalActiveProposals = data.filter(
        (proposal) => proposal.status === "ACTIVE"
      ).length;

      const totalExecutedProposals = data.filter(
        (proposal) => proposal.status === "EXECUTED"
      ).length;

      const winRate = totalExecutedProposals / totalProposals;

      return {
        viewsProps: [
          {
            name: "Total Proposals",
            metric: `${totalProposals} Proposals`,
            icon: "Star" as const,
          },
          {
            name: "Total Active Proposals",
            metric: `${totalActiveProposals} Proposals`,
            icon: "BarChart" as const,
          },
          {
            name: "Total Executed Proposals",
            metric: `${totalExecutedProposals} Proposals`,
            icon: "Check" as const,
          },
          {
            name: "Win Rate",
            metric: `${winRate} %`,
            icon: "Trophy" as const,
          },
        ],
      };
    },
  },
  View: (props: ComponentPropsWithoutRef<typeof ComposedViews>) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mx-4">
      <ComposedViews {...props} />
    </div>
  ),
  initialProps: {
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  Config: () => null,
});
