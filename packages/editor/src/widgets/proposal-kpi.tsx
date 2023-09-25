import { ComponentPropsWithoutRef, lazy } from "react";
import { widgetFactory } from "../widget/factory";
import { WidgetFactory } from "../widget/widget-factory";
import { joinViews } from "@shared/views/src/join-views";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { trpc } from "../lib/trpc";
import { arrayReducer, mapReducer } from "@shared/api/src/utils/reducer";
import { sourceFetcher } from "../lib/source-fetcher";
import {} from "@shared/api/src/utils/reducer";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";

const MetricAndCard = lazy(() =>
  import("@shared/views/src/kip-card/card-metric").then((module) => ({
    default: module.MetricAndCard,
  }))
);

const ComposedViews = joinViews(MetricAndCard, MetricAndCard, MetricAndCard);

export default WidgetFactory.createWidget({
  name: "proposal-kpi",
  displayName: "Proposals KPIs",
  group: "proposal",
  icon: "Star",

  dataFetcher: {
    key: "proposal-kpis",
    collector(props) {
      return {
        requestVariables: {
          proposalId: props.proposalId as number,
        },
      };
    },
    //@ts-expect-error
    async fetcher(args) {
      if (!args) {
        return {
          viewsProps: Array.from({ length: 4 }, () => ({
            name: "",
            metric: "",
            icon: "Bell" as const,
          })),
        };
      }
      const data = await sourceFetcher.getProposalVotes.query(
        args.requestVariables.proposalId
      );

      const mappedData = mapReducer(
        {
          against: 0,
          for: 0,
        },
        (acc, vote) => {
          if (!vote) return acc;

          if (vote.support === true) {
            acc.for += Number(vote.votes);
          } else {
            acc.against += Number(vote.votes);
          }
          return acc;
        },

        data
      );

      return {
        viewsProps: [
          {
            name: "Total Votes",
            metric: `${mappedData.against + mappedData.for} votes`,
            className: "bg-accent/10 text-accent",
          },
          {
            name: "For Votes",
            metric: `${mappedData.for} votes`,
            className: "bg-status-success-weak text-status-success",
          },
          {
            name: "Against Votes",
            metric: `${mappedData.against} votes`,
            className: "bg-status-danger-weak text-status-danger",
          },
        ],
      };
    },
  },
  View: (props: ComponentPropsWithoutRef<typeof ComposedViews>) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3  mx-4">
      <ComposedViews {...props} />
    </div>
  ),
  initialProps: {
    proposalId: 340,
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  FullScreenView: () => null,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
    />
  ),
});
