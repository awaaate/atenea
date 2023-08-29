"use client";

import React, { HTMLAttributes } from "react";

import { Dialog, DialogContent, Icon, ScrollArea, cn } from "@shared/ui";

import useSWR from "swr";
import { useNode, useNodeActions } from "../engine/nodes";

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
  const isFullScreen = useNode((node) => node.data.props.fullScreen);
  const isText = useNode((node) => node.data.displayName === "Text");
  const borderRadius = useNode((node) => node.data.props.borderRadius);
  const isActive = useNode((node) => node.events.selected);
  const background = useNode((node) => node.data.props.background);

  const { setNode } = useNodeActions();
  if (isLoading || !data) {
    return skeleton;
  }
  if (error) {
    return <div>Something wrong with the widget</div>;
  }

  return (
    <ScrollArea
      ref={(ref) => {
        if (!ref) return;
        //connect(ref);
      }}
      style={{
        borderRadius,
        background,
      }}
      className={cn(
        "h-full w-full",
        {
          "bg-surface-default ": !isText,
        },
        className
      )}
    >
      {isActive && (
        <Icon
          name="Grip"
          className="draggable-handle absolute top-0 left-0 m-2 hover:text-icon-hover cursor-grab z-popout"
        />
      )}
      <Dialog
        open={isFullScreen}
        onOpenChange={(value) => {
          setNode((node) => {
            node.data.props.fullScreen = value;
            return node;
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
