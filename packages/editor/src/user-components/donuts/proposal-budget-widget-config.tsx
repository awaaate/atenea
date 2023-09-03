import { Input } from "@shared/ui/src/input";

import { useNodeActions } from "../../engine/nodes";
import { WidgetConfig } from "../../widget/widget-config";
import { WidgetConfigSection } from "../../widget/widget-config-section";

function getLinkId(link: string) {
  const id = link.split("/").pop();
  return id;
}

export const ProposalBudgetWidgetConfig = () => {
  const { setNode } = useNodeActions();

  return (
    <WidgetConfig>
      <WidgetConfigSection title="Proposal">
        <WidgetConfigSection.Title />
        <Input
          placeholder="https://nouns.wtf/vote/320"
          onChange={(e) => {
            const value = e.target.value;

            const id = getLinkId(value) || "";

            //todo: validate if id is a valid proposal id
            setNode((node: any) => {
              node.data.props.proposalId = id;
              return node;
            });
          }}
        />
        <span className="mt-2 text-xs text-primary/60">
          Copy and paste the link of the proposal you want to knwo the budget of
        </span>
      </WidgetConfigSection>
    </WidgetConfig>
  );
};
