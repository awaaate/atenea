import { date } from "@shared/ui/src/date";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
const PropUpdates = lazy(() =>
  import("@shared/views/src/prop-updates/prop-updates").then((module) => ({
    default: module.PropUpdates,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-updates",
  displayName: "Proposal Updates",
  group: "Prop updates",
  icon: "Eye",
  Config: () => (
    <>
      <ViewPropsConfig
        props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
      />
    </>
  ),
  dataFetcher: {
    key: "proposal-updates",
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
          title: "",
          updates: [],
          isCompleted: false,
        };
      }
      const input = {
        ids: [args.requestVariables.proposalId.toString()],
      }
      const data = await sourceFetcher.getPropUpdates.query(input);

      const prop = data[0];
      return {
        title: prop.title,
        updates: prop.updates,
        isCompleted: prop.isCompleted,
      };
    },
  },
  initialProps: {
    proposalId: "376",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: PropUpdates,
});
