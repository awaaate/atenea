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
import { useDragStore } from "../../hooks/use-drag-store";
import { Button } from "@shared/ui/src/button";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import {
  WidgetComponent,
  WidgetComponentConfig,
} from "../../engine/interfaces";
import { WidgetConfigSection } from "../../widget/widget-config-section";
import { Separator } from "@shared/ui/src/separator";

export const CreateWidgetPannel = () => {
  const selectNode = useEditorStore.use.select();
  const add = useEditorStore.use.create();
  const { setDragNode } = useDragStore();
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
  };

  const groupedWidgets = Array.from(widgetFactory.widgets.entries()).reduce(
    (acc, [key, { node }]) => {
      const group = node.group?.toUpperCase() || "Other";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(node);
      return acc;
    },
    {} as Record<string, any>
  );
  console.log(groupedWidgets, "groupedWidgets");
  return (
    <ScrollArea className=" h-[calc(100vh-50px)]">
      <div className="flex flex-col gap-2">
        {Object.entries(groupedWidgets).map(([key, value]) => {
          console.log(key, value, "key, value");
          return (
            <>
              <WidgetConfigSection title={key} className="flex flex-col gap-2">
                <WidgetConfigSection.Title />
                {value.map((node: WidgetComponentConfig<any>) => {
                  return (
                    <Button
                      className="justify-between rounded-default w-full h-auto"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", node.name);
                        setDragNode(node.name);
                      }}
                      onClick={() => {
                        creteNode(node.name);
                      }}
                      key={key}
                    >
                      <div className="w-1/6">
                        <Icon
                          name={node.icon || "AlertCircle"}
                          className="ml-2 "
                        />
                      </div>
                      <span>{node.displayName || node.name}</span>
                    </Button>
                  );
                })}
              </WidgetConfigSection>
              <Separator />
            </>
          );
        })}
      </div>
    </ScrollArea>
  );
};
