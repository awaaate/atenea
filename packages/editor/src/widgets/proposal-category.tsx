import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";

const ProposalCategoryView = lazy(() =>
  import("@shared/views/src/proposals/proposal-category").then((module) => ({
    default: module.ProposalCategoryView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-category",
  displayName: "Proposal Category",
  group: "proposal",
  icon: "FileText",

  View: ProposalCategoryView,
  Config: () => (
    <ViewPropsConfig
      props={[
        {
          name: "proposalId",
          type: "number",
          label: "Proposal ID",
        },
      ]}
    />
  ),
  initialProps: {
    title: "Proposal Category",
    proposalId: 320,
    layout: {
      w: 6,
      x: 0,
      y: 0,
      h: 6,
    },
  },
  dataFetcher: {
    key: "proposal-category",
    collector(props) {
      return {
        requestVariables: {
          proposalId: props.proposalId as number,
        },
      };
    },
    async fetcher(args) {
      const proposalMeta = await sourceFetcher.proposalsMeta.query({
        idIn: [args?.requestVariables.proposalId.toString() || "320"],
      });

      console.log("proposalMeta: ", proposalMeta);
      if (!proposalMeta) return { categories: [] };
      return {
        categories: proposalMeta[0].categories || [],
      };
    },
  },
});
