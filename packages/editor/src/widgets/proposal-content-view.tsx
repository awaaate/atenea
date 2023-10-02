import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { date } from "@shared/ui/src/date";

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

      const proposalMeta = await sourceFetcher.proposalsMeta.query({
        idIn: [args?.requestVariables.proposalId.toString() || "320"],
      });

      return {
        content: proposalTeam.content,
        title: proposalTeam.title,
        description: proposalTeam.description,
        status: proposalMeta[0].status,
        createdAt: date(proposalMeta[0].createdTimestamp).format("DD/MM/YYYY"),
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
