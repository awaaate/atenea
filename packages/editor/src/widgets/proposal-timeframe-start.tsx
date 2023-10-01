import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { Badge } from "@shared/ui/src/badge";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { sourceFetcher } from "../lib/source-fetcher";

const ProposalTimeFrameView = lazy(() =>
  import("@shared/views/src/proposals/proposal-timeframe").then((module) => ({
    default: module.ProposalTimeFrameView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-timeframe-start",
  displayName: "Proposal Start Timeframe",
  group: "proposal",
  icon: "Clock",

  View: ProposalTimeFrameView,
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
    title: "Proposal Timeframe Start",
    proposalId: 320,
    layout: {
      w: 6,
      x: 0,
      y: 0,
      h: 6,
    },
  },
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
      const proposalMeta = await sourceFetcher.proposalsMeta.query({
        idIn: [args?.requestVariables.proposalId.toString() || "320"],
      });
      return {
        proposalMeta,
      };
    },
    mapper({ proposalMeta }) {
      if (!proposalMeta)
        return {
          time: new Date(),
          status: "",
        };
      return {
        time: proposalMeta[0].startsAt,
        status: proposalMeta[0].status,
      };
    },
  },
});
