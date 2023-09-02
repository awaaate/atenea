import React from "react";
import { useNode, useNodeActions } from "../engine/nodes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui";
import { useEditorStore } from "../engine/editor";

const classes = {
  title:
    "bg-transparent min-w-[20px] w-min h-full text-text placeholder:text-text-weakest",
};
const WidgetTitle = () => {
  const title = useNode((node) => node.data.props.title);
  const editable = useEditorStore.use.editable();
  const { setNode } = useNodeActions();

  if (!editable)
    return (
      <h3 className="bg-transparent min-w-[20px] w-min h-full text-text ">
        {title}
      </h3>
    );
  return (
    <Tooltip>
      <TooltipTrigger>
        <input
          value={title}
          placeholder="Section title"
          className="bg-transparent min-w-[20px] w-min h-full text-text placeholder:text-text-weakest"
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            setNode((node) => {
              node.data.props.title = e.target.value;
              return node;
            });
          }}
        />
      </TooltipTrigger>
      <TooltipContent>Change the title of the widget</TooltipContent>
    </Tooltip>
  );
};

export default WidgetTitle;
