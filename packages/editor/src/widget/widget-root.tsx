"use client";

import React, { HTMLAttributes, Suspense, memo, useMemo } from "react";

import { cn } from "@shared/ui/src/utils";
import { Card, CardTitle } from "@shared/ui/src/card";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/src/dialog";

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
  inner,
  fullScreen,
  ...props
}: WidgetRootProps<T>) {
  const { data, isLoading, error } = useSWR(dataFetcher[0], async () => {
    try {
      const data = await dataFetcher[1]();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  const isFullScreen = useNode((node) => node.data.props.fullScreen);
  const title = useNode((node) => node.data.props.title);
  const borderRadius = useNode((node) => node.data.props.borderRadius);
  const isActive = useNode((node) => node.events.selected);
  const background = useNode((node) => node.data.props.background);
  const className = useNode((node) => node.data.props.className);
  const editable = useEditorStore.use.editable();

  const { setNode } = useNodeActions();

  const showHeader = editable || title || isActive;

  const childComponent = useMemo(() => {
    if (!data || isLoading) return skeleton;
    return inner(data);
  }, [data, skeleton, inner, isLoading]);

  return (
    <div
      ref={(ref) => {
        if (!ref) return;
        //connect(ref);
      }}
      style={{}}
      className={cn("h-full w-full   flex-1 overflow-hidden ", className, {
        "bg-surface-default": editable,
      })}
    >
      <Card
        className="w-full h-full flex flex-col bg-transparent rounded-lg overflow-hidden shadow-0"
        style={{
          background,
          borderRadius,
        }}
      >
        {showHeader && (
          <CardTitle
            className={cn(
              "flex justify-between items-center px-2 py-2 mb-0  draggable-handle",
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
        {!isFullScreen && (
          <ScrollArea orientation={["vertical", "horizontal"]}>
            {childComponent}
          </ScrollArea>
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
          <DialogContent className="max-w-5xl h-[calc(100vh-2rem)]  w-full ">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="px-6">{data && fullScreen(data)}</ScrollArea>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}

export { WidgetRoot };
