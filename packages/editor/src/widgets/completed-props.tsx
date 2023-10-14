import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
const CompletedPropsList = lazy(() =>
  import("@shared/views/src/prop-updates/completed-props").then((module) => ({
    default: module.CompletedPropsList,
  }))
);

export default WidgetFactory.createWidget({
  name: "completed-props",
  displayName: "Completed Props",
  group: "Prop updates",
  icon: "Check",
  Config: () => (
    <>
      <ViewPropsConfig
        props={[{ name: "first", type: "number", label: "First" }]}
      />
    </>
  ),
  dataFetcher: {
    key: "proposal-updates",
    collector(props) {
      return {
        first: props.first as number,
      };
    },
    async fetcher(args) {
      if (!args) {
        return {
          data: [] as any[],
        };
      }
      const data = await sourceFetcher.getPropUpdates.query({
        first: 500,
        executed: true,
      });

      return {
        data,
      };
    },
    mapper({ data }, { first }) {
      return {
        props: data
          .map((p) => ({
            proposer: p.proposer,
            title: p.title,
            id: parseInt(p.id),
          }))
          .sort((a, b) => b.id - a.id)
          .slice(0, first),
      };
    },
  },
  initialProps: {
    first: 5,
    title: "Completed Proposals",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: CompletedPropsList,
});
