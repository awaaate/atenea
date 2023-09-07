import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";

const ProposalContentView = lazy(() =>
  import("@shared/views/src/proposal-content-view/proposal-content-view").then(
    (module) => ({
      default: module.ProposalContentView,
    })
  )
);
export default WidgetFactory.createWidget({
  name: "proposal-view",
  displayName: "Proposal Content ",
  icon: "Eye",
  group: "Proposal",
  View: ProposalContentView,
  dataFetcher: {
    key: "proposal-view",
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
          content: "",
          title: "",
          description: "",
        };
      }

      const proposalTeam = await sourceFetcher.getProposalContent.query(
        args.requestVariables.proposalId
      );

      return {
        content: proposalTeam.content,
        title: proposalTeam.title,
        description: proposalTeam.description,
      };
    },
  },
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
    />
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
});
