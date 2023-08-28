"use client";

import React, { HTMLAttributes } from "react";
import { ROOT_NODE, useEditor, useNode } from "@craftjs/core";

import {
  Dialog,
  DialogContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@shared/ui";

import { type WidgetProps } from "./widget-types";
import useSWR from "swr";
import { nanoid } from "nanoid";
import { query } from "../user-components/donuts/proposal-budget-widget-data-fetcher";
import { WidgetMenu } from "./widget-menu";

interface WidgetRootProps<T> extends HTMLAttributes<HTMLDivElement> {
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
  inner: (data: T) => React.ReactNode;
  fullScreen: (data: T) => React.ReactNode;
  skeleton?: React.ReactNode;
  dataFetcher: [string, () => Promise<T>];
  dir?: "ltr" | "rtl";
}
function WidgetRoot<T>({
  dataFetcher,
  skeleton,
  className,
  inner,
  fullScreen,
  ...props
}: WidgetRootProps<T>) {
  const { data, isLoading, error } = useSWR(...dataFetcher);
  const {
    query,
    actions: { add, delete: deleteNode, selectNode },
  } = useEditor();
  const {
    connectors: { connect },
    actions,
    id,
    isText,
    parent,
    borderRadius,
    isFullScreen,
  } = useNode((node) => {
    const props = node.data.props as WidgetProps;
    return {
      isText: node.data.displayName === "Text",
      id: node.id,
      parent: node.data.parent,
      isFullScreen: props.fullScreen,
      borderRadius: props.borderRadius,
    };
  });

  if (isLoading || !data) {
    return skeleton;
  }
  if (error) {
    return <div>Something wrong with the widget</div>;
  }

  console.log({ isFullScreen }, "isFullScreen");
  return (
    <ScrollArea
      ref={(ref) => {
        if (!ref) return;
        connect(ref);
      }}
      className={cn(
        "h-full w-full",
        {
          "bg-surface-default ": !isText,
        },
        className
      )}
      style={{
        borderRadius,
      }}
      {...props}
    >
      <Dialog
        open={isFullScreen}
        onOpenChange={(value) => {
          actions.setProp((props: WidgetProps) => {
            props.fullScreen = value;
            return props;
          });
        }}
      >
        <DialogContent>
          <div className="w-full h-full">{fullScreen(data)}</div>
        </DialogContent>
      </Dialog>
      {inner(data)}
    </ScrollArea>
  );
}

export { WidgetRoot };
