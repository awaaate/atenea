import { ComponentPropsWithoutRef, lazy } from "react";
import { widgetFactory } from "../widget/factory";
import { WidgetFactory } from "../widget/widget-factory";
import { joinViews } from "@shared/views/src/join-views";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { trpc } from "../lib/trpc";
import { arrayReducer, mapReducer } from "@shared/api/src/utils/reducer";
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
  name: "proposal-kpi",
  displayName: "Proposals KPIs",
  group: "proposals",
  icon: "Bell",

  dataFetcher: {
    key: "nouns-kpis",
    collector(props) {
      return {
        requestVariables: {
          proposalId: props.proposalId as number,
        },
      };
    },
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

      const totalVotes = data.length;
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
            icon: "Bell" as const,
          },
          {
            name: "For Votes",
            metric: `${mappedData.for} votes`,
            icon: "Bell" as const,
          },
          {
            name: "Against Votes",
            metric: `${mappedData.against} votes`,
            icon: "Bell" as const,
          },
          {
            name: "Win Rate",
            metric: `${(
              mappedData.for /
              (mappedData.against + mappedData.for)
            ).toFixed(2)} %`,
            icon: "Bell" as const,
          },
        ],
      };
    },
  },
  View: (props: ComponentPropsWithoutRef<typeof ComposedViews>) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4 my-4 mx-4">
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
  Config: () => null,
  skeleton: BAR_CHART_SKELETON,
});
