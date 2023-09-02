"use client";

import React, { HTMLAttributes } from "react";

import {
  Card,
  CardTitle,
  Dialog,
  DialogContent,
  ScrollArea,
  cn,
} from "@shared/ui";
import useSWR from "swr";
import { useNode, useNodeActions } from "../engine/nodes";
import { WidgetMenu } from "./widget-menu";
import WidgetTitle from "./widget-title";
import { useEditorStore } from "../engine/editor";

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
  const title = useNode((node) => node.data.props.title);
  const borderRadius = useNode((node) => node.data.props.borderRadius);
  const isActive = useNode((node) => node.events.selected);
  const background = useNode((node) => node.data.props.background);
  const editable = useEditorStore.use.editable();

  const { setNode } = useNodeActions();

  const showHeader = editable || title || isActive;

  if (isLoading || !data) {
    return skeleton;
  }
  if (error) {
    return <div>Something wrong with the widget</div>;
  }

  return (
    <div
      ref={(ref) => {
        if (!ref) return;
        //connect(ref);
      }}
      style={{
        borderRadius,
        background,
      }}
      className={cn(
        "h-full w-full bg-surface-default shadow-card flex-1",
        className
      )}
    >
      <Card className="w-full h-full flex flex-col ">
        {showHeader && (
          <CardTitle
            className={cn(
              "border-b  flex justify-between items-center px-2 py-2 mb-0  draggable-handle",
              {
                "cursor-grab": editable,
              }
            )}
          >
            <WidgetTitle />
            <div className="flex gap-2 items-center z-popout bg-surface-lowered px-2 my-1 rounded-pill transition-all">
              <WidgetMenu />
            </div>
          </CardTitle>
        )}

        <ScrollArea className="min-h-full">{inner(data)}</ScrollArea>
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
      </Card>
    </div>
  );
}

export { WidgetRoot };
