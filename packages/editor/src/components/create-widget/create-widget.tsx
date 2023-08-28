import { ROOT_NODE, useEditor } from "@craftjs/core";
import { CommandMenu, Dialog, DialogTrigger, Icon } from "@shared/ui";
import React from "react";
import {
  UserComponents,
  UserComponentsType,
  getComponentTypes,
} from "../../user-components";
import { nanoid } from "nanoid";

export const CreateWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    actions: { add, selectNode },
    query,
  } = useEditor();

  const creteNode = (name: UserComponentsType) => {
    const component = UserComponents[name];
    const nodeToAdd = query
      .parseFreshNode({
        id: nanoid(),
        data: {
          type: component,
          props: {
            ...component.craft?.defaultProps,
          },
        },
      })
      .toNode();

    add(nodeToAdd, ROOT_NODE, 1);

    selectNode(nodeToAdd.id);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger className="shadow-[0]">
        <Icon name="Plus" className="mr-2" />
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
