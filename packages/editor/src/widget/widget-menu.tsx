import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { ROOT_NODE, useEditor, useNode } from "@craftjs/core";
import { nanoid } from "nanoid";
import { WidgetProps } from "./widget-types";

const WidgetMenu = ({ id }: { id: string }) => {
  const {
    query,
    isActive,
    parent,
    isFullScreen,
    isTextWidget,

    actions: { add, delete: deleteNode, selectNode, setProp },
  } = useEditor((state, query) => {
    const node = query.node(id).get();
    return {
      isActive: state.events.selected.has(id),
      parent: node.data.parent,
      isFullScreen: node.data.props.fullScreen,
      isTextWidget: node.data.displayName === "Text",
    };
  });

  if (!isActive) return null;
  return (
    <DropdownMenu>
      {/* TODO imrove tooltips */}
      <TooltipProvider>
        <DropdownMenuTrigger className="absolute top-0 right-0 border-0 shadow-[0] z-[2] m-1  rounded-full icon-xl  p-0 ring ring-blue-300 hover:ring-blue-500"></DropdownMenuTrigger>
      </TooltipProvider>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isTextWidget && (
            <DropdownMenuItem
              onSelect={() => {
                console.log("full screen");
                setProp(id, (props: WidgetProps) => {
                  props.fullScreen = true;
                  return props;
                });
              }}
            >
              <Icon name="Maximize2" className="mr-2" />
              Full Screen
              <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={() => {}}>
            <Icon name="Settings2" className="mr-2" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              const node = query.node(id).get();
              const newId = nanoid();
              add(
                {
                  ...node,
                  id: newId,
                },
                parent || ROOT_NODE
              );
              selectNode(newId);
            }}
          >
            <Icon name="Copy" className="mr-2" />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              deleteNode(id);
            }}
          >
            <Icon name="Trash2" className="mr-2" />
            Delete
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { WidgetMenu };
