import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";
const ProposalRoadmapView = lazy(() =>
  import("@shared/views/src/proposals/proposal-roadmap").then((module) => ({
    default: module.ProposalRoadmapView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-roadmap",
  displayName: "Proposal Roadmap",
  group: "proposal",
  icon: "Code",
  Config: () => (
    <>
      <ViewPropsConfig
        props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
      />
    </>
  ),
  dataFetcher: {
    key: "proposal-roadmap",
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
          roadmap: [],
        };
      }

      const data = await sourceFetcher.getProposalRoadmap.query(
        args.requestVariables.proposalId
      );
      return {
        roadmap: data,
      };
    },
  },
  initialProps: {
    colors: ["indigo" as const],
    proposalId: 340,
    title: "Proposal Roadmap",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: ProposalRoadmapView,
});
