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

const ComposedViews = joinViews(CardAndMetric, CardAndMetric, CardAndMetric);

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
        first: 1000,
      });

      const totalProposals = data.length;

      const totalExecutedProposals = data.filter(
        (proposal) => proposal.status === ProposalStatus.Succeeded
      ).length;
      const hola = "hola";

      return {
        viewsProps: [
          {
            name: "Total Proposals",
            metric: `${totalProposals} Proposals`,
          },

          {
            name: "Executed Proposals",
            metric: `${totalExecutedProposals} Proposals`,
          },
          {
            name: "Denied Proposals",
            metric: `${totalProposals - totalExecutedProposals} Proposals`,
          },
        ],
      };
    },
  },
  View: (props: ComponentPropsWithoutRef<typeof ComposedViews>) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mx-4">
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
