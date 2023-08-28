import { useNode } from "@craftjs/core";

import { Input } from "@shared/ui";

import { WidgetConfig } from "../../widget/widget-config";
import { WidgetConfigSection } from "../../widget/widget-config-section";
import { type ProposalBudgetWidgetProps } from "./proposal-budget-widget";

function getLinkId(link: string) {
  const id = link.split("/").pop();
  return id;
}

export const ProposalBudgetWidgetConfig = () => {
  const {
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <WidgetConfig>
      <WidgetConfigSection title="Proposal">
        <WidgetConfigSection.Title />
        <Input
          placeholder="https://nouns.wtf/vote/320"
          onChange={(e) => {
            const value = e.target.value;

            const id = getLinkId(value) || "";

            setProp(
              (props: ProposalBudgetWidgetProps) =>
                (props.proposalId = parseInt(id)),
              300
            );
          }}
        />
        <span className="mt-2 text-xs text-primary/60">
          Copy and paste the link of the proposal you want to knwo the budget of
        </span>
      </WidgetConfigSection>
    </WidgetConfig>
  );
};
