import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { Badge } from "@shared/ui/src/badge";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { sourceFetcher } from "../lib/source-fetcher";
import { ProposalTimeFrameView } from "@shared/views/src/proposals/proposal-timeframe";
const PopularTeamsView = lazy(() =>
  import("@shared/views/src/team/popular-teams").then((module) => ({
    default: module.PopularTeamsView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-timeframe-end",
  displayName: "Proposal End Timeframe",
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
    title: "Proposal Timeframe End",
    proposalId: 368,
    layout: {
      w: 6,
      x: 0,
      y: 0,
      h: 6,
    },
  },
  dataFetcher: {
    key: "proposal-time-frame",
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
      if (!proposalMeta)
        return {
          time: new Date(),
          status: "",
        };
      return {
        time: proposalMeta[0].endsAt,
        status: proposalMeta[0].status,
      };
    },
  },
});
