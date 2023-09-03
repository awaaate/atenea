import { CommandMenu } from "@shared/ui/src/command-menu";
import { Dialog, DialogTrigger } from "@shared/ui/src/dialog";

import React from "react";
import { useEditorStore } from "../../engine/editor";
import { createNode } from "../../engine/nodes";
import { WidgetComponentsType, getWidget } from "../../user-components";
import { Icon } from "@shared/ui/src/icon";

export const CreateWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectNode = useEditorStore.use.select();
  const add = useEditorStore.use.create();

  const creteNode = (name: WidgetComponentsType) => {
    const component = getWidget(name)?.component;
    if (!component) return console.error("Component not found");
    const nodeToAdd = createNode({
      data: {
        type: component,
      },
    });

    add(nodeToAdd);

    selectNode(nodeToAdd.id);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger className="shadow-[0] bg-accent text-text-on-accent hover:bg-accent/70">
        <Icon name="Plus" className="mr-2  text-text-on-accent h" />
        Add section
      </DialogTrigger>
      <CommandMenu
        items={[
          /*           {
            handler: () => {},
            icon: "Search",
            id: "1",
            name: "Account",
            group: "Basic",
          }, */
          {
            group: "Suggested",
            handler: () => {
              creteNode("Text");
            },
            icon: "Type",
            id: "2",
            name: "Text Block",
          },

          {
            handler: () => {
              creteNode("ProposalBudgetWidget");
            },
            icon: "PieChart",
            id: "3",
            name: "Proposal Budget",
            group: "Charts",
          },
          {
            handler: () => {
              creteNode("BarListCategoriesWidget");
            },
            icon: "BarChartHorizontal",
            id: "4",
            name: "Amount expent by Category",
            group: "Charts",
          },
          /*      {
            handler: () => {
              creteNode("ProposalBudgetWidget");
            },
            icon: "PieChart",
            id: "3",
            name: "Proposal Budget",
            group: "Charts",
          }, */
        ]}
        onDismiss={() => {}}
      />
    </Dialog>
  );
};
