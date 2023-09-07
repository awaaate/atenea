import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";

const TeamMembersViews = lazy(() =>
  import("@shared/views/src/team/team-members").then((module) => ({
    default: module.TeamMembersViews,
  }))
);
export default WidgetFactory.createWidget({
  name: "Proposal Team",
  displayName: "Proposal Team",
  icon: "Users",
  group: "Proposal",
  View: TeamMembersViews,
  dataFetcher: {
    key: "proposal-team",
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
          teamMembers: [],
        };
      }

      const proposalTeam = await sourceFetcher.getProposalTeamMembers.query(
        args.requestVariables.proposalId
      );

      return {
        teamMembers: proposalTeam,
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
