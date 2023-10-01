import { ComponentPropsWithoutRef, lazy } from "react";
import { widgetFactory } from "../widget/factory";
import { WidgetFactory } from "../widget/widget-factory";
import { joinViews } from "@shared/views/src/join-views";
import { BAR_CHART_SKELETON } from "../widget/skeletons";
import { trpc } from "../lib/trpc";
import { arrayReducer, mapReducer } from "@shared/api/src/utils/reducer";
import { sourceFetcher } from "../lib/source-fetcher";
import {} from "@shared/api/src/utils/reducer";
import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";

const Proposal4InOneView = lazy(() =>
  import("@shared/views/src/proposals/proposal-4-in-one").then((module) => ({
    default: module.Proposal4InOneView,
  }))
);

export default WidgetFactory.createWidget({
  name: "proposal-4-in-one",
  displayName: "Proposal for in one",
  group: "proposal",
  icon: "Star",

  dataFetcher: {
    key: "getPrposal4inOne",
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
          viewsProps: Array.from({ length: 4 }, () => ({
            name: "",
            metric: "",
            icon: "Bell" as const,
          })),
        };
      }
      const data = await sourceFetcher.proposalsMeta.query({
        idIn: [args.requestVariables.proposalId.toString()],
      });

      const teamMembers = await sourceFetcher.getProposalTeamMembers.query(
        args.requestVariables.proposalId
      );
      return {
        data: {
          proposal: data[0],
          teamMembers,
        },
      };
    },
    //@ts-expect-error
    mapper({ data }) {
      if (!data)
        return {
          againstVotes: 0,
          forVotes: 0,
          teamMembers: 0,
          budgetRequested: 0,
          categories: [],
          status: "",
          title: "",
          endDate: "",
          startDate: "",
        };

      let budgetRequested: string = data.proposal.budgetUsd
        ? data.proposal.budgetUsd.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : data.proposal.totalBudget.toLocaleString("en-US", {}) + " ETH";

      return {
        againstVotes: data.proposal.againstVotes,
        forVotes: data.proposal.forVotes,
        teamMembers: data.teamMembers.length,
        budgetRequested: budgetRequested,
        categories: data.proposal.categories || [],
        status: data.proposal.status,
        title: data.proposal.title,
        endDate: data.proposal.endsAt,
        startDate: data.proposal.startsAt,
      };
    },
  },
  View: Proposal4InOneView,
  initialProps: {
    proposalId: 340,
    layout: {
      w: Infinity,
      h: 8,
      x: 0,
      y: 0,
    },
  },
  FullScreenView: () => null,
  Config: () => (
    <ViewPropsConfig
      props={[{ name: "proposalId", type: "number", label: "Proposal ID" }]}
    />
  ),
});
