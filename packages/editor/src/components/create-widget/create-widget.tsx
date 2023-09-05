import { CommandMenu } from "@shared/ui/src/command-menu";
import { Dialog, DialogTrigger } from "@shared/ui/src/dialog";

import React from "react";
import { useEditorStore } from "../../engine/editor";
import { createNode } from "../../engine/nodes";
import { Icon } from "@shared/ui/src/icon";
import { widgetFactory } from "../../widget/factory";
import proposalsTable from "../../widgets/proposals-table";
import proposalsAreaChart from "../../widgets/proposals-area-chart";

export const CreateWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectNode = useEditorStore.use.select();
  const add = useEditorStore.use.create();

  const creteNode = (name: string) => {
    const component = widgetFactory.getWidget(name);
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
              creteNode("Donut Test");
            },
            icon: "PieChart",
            id: "4",
            name: "Donut test",
            group: "Charts",
          },
          {
            handler: () => {
              creteNode(proposalsTable.node.name);
            },
            icon: "ScatterChart",
            id: "5",
            name: "Proposals Table",
            group: "Charts",
          },
          {
            handler: () => {
              creteNode(proposalsAreaChart.node.name);
            },
            icon: "ScatterChart",
            id: "4",
            name: "Proposals Area Chart",
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
