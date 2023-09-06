import { CommandMenu } from "@shared/ui/src/command-menu";
import { Dialog, DialogTrigger } from "@shared/ui/src/dialog";

import React from "react";
import { useEditorStore } from "../../engine/editor";
import { createNode } from "../../engine/nodes";
import { Icon } from "@shared/ui/src/icon";
import { widgetFactory } from "../../widget/factory";
import proposalsTable from "../../widgets/proposals-table";
import proposalsAreaChart from "../../widgets/proposals-area-chart";
import proposalsBarChart from "../../widgets/proposals-bar-chart";
import categoriesBarChart from "../../widgets/categories-bar-chart";

export const CreateWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectNode = useEditorStore.use.select();
  const add = useEditorStore.use.create();

  console.log(widgetFactory.widgets.entries, "widgets");
  const creteNode = (name: string) => {
    const component = widgetFactory.getWidget(name);
    if (!component) throw new Error("Component not found");
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
        items={Array.from(widgetFactory.widgets.entries()).map(
          ([ket, { node }]) => {
            return {
              grup: node.group || "Other",
              handler: () => {
                creteNode(node.name);
              },
              icon: node.icon,
              id: node.name,
              name: node.displayName || node.name,
            };
          }
        )}
        onDismiss={() => {}}
      />
    </Dialog>
  );
};
