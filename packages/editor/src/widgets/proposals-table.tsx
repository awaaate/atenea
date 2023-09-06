import { sourceFetcher } from "../lib/data-fetchers";
import { WidgetFactory } from "../widget/widget-factory";
import { lazy } from "react";

const BasicTableView = lazy(() =>
  import("@shared/views/src/table/basic").then((module) => ({
    default: module.BasicTableView,
  }))
);
export default WidgetFactory.createWidget({
  name: "Proposals Table",
  dataFetcher: {
    key: "proposals-table",
    collector: (props) => {
      return {};
    },
    fetcher: async (args) => {
      const proposalsMeta = await sourceFetcher.proposalsMeta.query({
        first: 10,
      });

      return {
        data: proposalsMeta.map((proposal) => ({
          id: proposal.id,
          title: proposal.title,
          status: proposal.status,
        })),
        headerMap: {
          title: "Title",
          status: "Status",
        },
        className: "",
      };
    },
  },
  View: BasicTableView,
  FullScreenView: BasicTableView,
  Config: () => <div>Config</div>,
  skeleton: <div>Proposals Table</div>,
  initialProps: {
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
});
