import {} from "@shared/api/src/utils/reducer";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";

const ProposalKPIView = lazy(() =>
  import("@shared/views/src/proposals/proposal-kpi").then((module) => ({
    default: module.ProposalKPIView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-kpi",
  displayName: "Proposals KPIs",
  group: "proposal",
  icon: "Star",

  dataFetcher: {
    key: "proposalsMeta",
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
          proposalMeta: [],
        };
      }
      const proposalMeta = await sourceFetcher.proposalsMeta.query({
        idIn: [args?.requestVariables.proposalId.toString() || "320"],
      });
      return {
        proposalMeta,
      };
    },
    mapper({ proposalMeta }) {
      const proposal = proposalMeta[0];

      return {
        abstainVotes: proposal?.abstainVotes,
        forVotes: proposal?.forVotes,
        againstVotes: proposal?.againstVotes,
      };
    },
  },
  View: ProposalKPIView,
  initialProps: {
    proposalId: 340,
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  FullScreenView: ProposalKPIView,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
    />
  ),
});
