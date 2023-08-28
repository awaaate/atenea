import React from "react";
import { ROOT_NODE, useEditor } from "@craftjs/core";
import { nanoid } from "nanoid";
import { useDragStore } from "../../hooks/use-drag-store";
import { Widgets } from "../../user-components";
//drag with useDragStore
const EditorSidebar = () => {
  const {
    query,
    connectors: { create },
    actions: { add },
  } = useEditor();
  const { setDragNode } = useDragStore();
  return (
    <div className="flex max-w-full flex-col gap-4 ">
      <p>Widgets</p>
      {Widgets.map((widget) => {
        const Component = widget.component;

        return (
          <div
            className="cursor-pointer select-none rounded-lg bg-gray-100 p-2"
            draggable={true}
            onDragStart={(e) => {
              //set the data to be transfered
              console.log("drag start");
              setDragNode({
                id: nanoid(),
                data: {
                  type: Component as any,
                  props: {
                    ...Component.craft?.defaultProps,
                  },
                },
              });
            }}
            onClick={() => {
              /*  const nodeID = "helloworld"
              const freshNode = {
                id: nodeID,
                data: {
                  type: Component,
                  props: {},
                },
              }
              const nodeToAdd = query.parseFreshNode(freshNode).toNode()
              add(nodeToAdd, ROOT_NODE) */
            }}
          >
            <img
              key={widget.image}
              height={200}
              src={widget.image}
              alt={"block "}
              className="pointer-events-none w-full rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export { EditorSidebar };
