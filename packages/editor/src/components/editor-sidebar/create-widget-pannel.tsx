import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { Separator } from "@shared/ui/src/separator";
import { useEditorStore } from "../../engine/editor";
import { WidgetComponentConfig } from "../../engine/interfaces";
import { createNode } from "../../engine/nodes";
import { useDragStore } from "../../hooks/use-drag-store";
import { widgetFactory } from "../../widget/factory";
import { WidgetConfigSection } from "../../widget/widget-config-section";

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
      <p className="p-4 text-text-weaker text-sm">
        You can drag and drop widgets from here to the editor or click
      </p>
      <div className="flex flex-col gap-2">
        {Object.entries(groupedWidgets).map(([key, value]) => {
          console.log(key, value, "key, value");
          return (
            <>
              <WidgetConfigSection title={key} className="flex flex-col gap-2">
                <WidgetConfigSection.Title />
                {value.map((node: WidgetComponentConfig<any>) => {
                  if (node.image) {
                    return (
                      <div
                        className="flex cursor-grabbing flex-col gap-2 shadow-card-default rounded-default p-2 w-full h-auto borde bg-surface-lowered"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", node.name);
                          setDragNode(node.name);
                        }}
                        onClick={() => {
                          creteNode(node.name);
                        }}
                      >
                        <div className="w-full h-auto bg-background-default rounded-default flex items-center justify-center">
                          <img
                            src={node.image}
                            className="w-full rounded-md"
                            draggable
                            onDragStart={(e) => {
                              e.stopPropagation();
                              e.dataTransfer.setData("text/plain", node.name);
                              setDragNode(node.name);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
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
