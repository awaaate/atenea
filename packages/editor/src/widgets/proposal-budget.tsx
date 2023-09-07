import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { arrayReducer } from "@shared/api/src/utils/reducer";
import { WidgetConfigSection } from "../widget/widget-config-section";
const Donut = lazy(() =>
  import("@shared/views/src/donut/donut").then((module) => ({
    default: module.Donut,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-budget",
  displayName: "Proposal Budget",
  group: "proposal",
  icon: "PieChart",
  Config: () => (
    <>
      <ViewPropsConfig
        props={[
          { name: "proposalId", type: "number", label: "Proposal ID" },
          { name: "colors", type: "chart-colors", label: "Chart Colors" },
        ]}
      />
    </>
  ),
  dataFetcher: {
    key: "proposal-budget",
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
          data: [],
          index: "name",
          category: "amount",
        };
      }

      const data = await sourceFetcher.getProposalBudget.query(
        args.requestVariables.proposalId
      );
      return {
        data: data,
        index: "name",
        category: "amount",
      };
    },
  },
  initialProps: {
    colors: ["indigo" as const],
    proposalId: 340,
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: Donut,
});
