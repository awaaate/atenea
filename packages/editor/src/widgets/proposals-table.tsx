import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
import { lazy } from "react";

const BasicTableView = lazy(() =>
  import("@shared/views/src/table/basic").then((module) => ({
    default: module.BasicTableView,
  }))
);
export default WidgetFactory.createWidget({
  name: "Proposals Table",
  displayName: "proposals table",
  icon: "Table",
  group: "General",
  dataFetcher: {
    key: "proposals-table",
    collector: (props) => {
      return {
        requestVariables: {
          first: props.first as number,
        },
      };
    },
    fetcher: async (args) => {
      if (!args) {
        return {
          data: [],
        };
      }

      const proposalsMeta = await sourceFetcher.proposalsMeta.query({
        first: args.requestVariables.first,
      });

      return {
        data: proposalsMeta.map((proposal) => ({
          id: proposal.id,
          title: proposal.title,
          status: proposal.status,
        })),
      };
    },
  },
  View: BasicTableView,
  FullScreenView: BasicTableView,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "first", type: "number", label: "First" }]}
    />
  ),
  skeleton: <div>Proposals Table</div>,
  initialProps: {
    first: 5,
    headerMap: {
      title: "Title",
      status: "Status",
    },
    className: "",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
});
