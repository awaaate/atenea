import {} from "@shared/api/src/utils/reducer";
import { joinViews } from "@shared/views/src/join-views";
import { ComponentPropsWithoutRef, lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { ProposalStatus } from "@shared/api/src/api/data-source/proposals-meta/types";

const CardAndMetric = lazy(() =>
  import("@shared/views/src/kip-card/card-metric").then((module) => ({
    default: module.MetricAndCard,
  }))
);

const ComposedViews = joinViews(
  CardAndMetric,
  CardAndMetric,
  CardAndMetric,
  CardAndMetric
);

export default WidgetFactory.createWidget({
  name: "nouns-kpis",
  displayName: "Nouns Proposals Stats from the last 2 months",
  group: "general",
  icon: "BarChartHorizontal",

  dataFetcher: {
    key: "nouns-kpis",
    //@ts-expect-error
    async fetcher(args) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);

      const createdTimestamp = Math.ceil(currentDate.getTime() / 1000);
      const data = await sourceFetcher.proposalsMeta.query({
        orderBy: "createdTimestamp",
        first: 1000,
        createdTimestamp,
      });

      const totalExecutedProposals = data.filter(
        (proposal) => proposal.status === ProposalStatus.Succeeded
      ).length;

      const totalDeniedProposals = data.filter(
        (proposal) => proposal.status === ProposalStatus.Defeated
      ).length;

      const totalCanceledProposals = data.filter(
        (proposal) => proposal.status === ProposalStatus.Cancelled
      ).length;
      return {
        viewsProps: [
          {
            name: "Total Proposals",
            metric: `${
              totalExecutedProposals +
              totalDeniedProposals +
              totalCanceledProposals
            } Proposals`,
          },

          {
            name: "Executed Proposals",
            metric: `${totalExecutedProposals} Proposals`,
          },
          {
            name: "Denied Proposals",
            metric: `${totalDeniedProposals} Proposals`,
          },
          {
            name: "Canceled Proposals",
            metric: `${totalCanceledProposals} Proposals`,
          },
        ],
      };
    },
  },
  View: (props: ComponentPropsWithoutRef<typeof ComposedViews>) => (
    <div className="flex gap-2">
      <ComposedViews {...props} />
    </div>
  ),
  initialProps: {
    title: "Nouns Proposals Stats from the last 2 months",
    layout: {
      w: Infinity,
      h: 7,
      x: 0,
      y: 0,
    },
  },
  Config: () => null,
});
