"use client";

import React, {
  HTMLAttributes,
  Suspense,
  memo,
  useEffect,
  useMemo,
} from "react";

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

/**
 * Props for the WidgetRoot component.
 * @template TData The type of the data fetched by the dataFetcher.
 * @template TMappedData The type of the data mapped by the mapper function.
 */
interface WidgetRootProps<TData, TMappedData>
  extends HTMLAttributes<HTMLDivElement> {
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
  inner: (data: TMappedData) => React.ReactNode;
  fullScreen: (data: TMappedData) => React.ReactNode;
  skeleton?: React.ReactNode;
  mapper?: (data: TData) => TMappedData;
  dataFetcher: [string, () => Promise<TData>];
  dir?: "ltr" | "rtl";
}

function WidgetRoot<TData, TMappedData>({
  dataFetcher,
  skeleton,
  inner,
  fullScreen,
  mapper = (data) => data as unknown as TMappedData,
  ...props
}: WidgetRootProps<TData, TMappedData>) {
  const {
    data: rawData,
    isLoading,
    error,
  } = useSWR(dataFetcher[0], async () => {
    try {
      const data = await dataFetcher[1]();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  const data = useMemo(() => {
    if (!rawData) return;
    if (!mapper) return rawData;
    return mapper(rawData);
  }, [rawData, mapper]);

  const isFullScreen = useNode((node) => node.data.props.fullScreen);
  const title = useNode((node) => node.data.props.title);
  const borderRadius = useNode((node) => node.data.props.borderRadius);
  const isActive = useNode((node) => node.events.selected);
  const background = useNode((node) => node.data.props.background);
  const className = useNode((node) => node.data.props.className);
  const editable = useEditorStore.use.editable();

  const { setNode, remove } = useNodeActions();

  const showHeader = editable || title || isActive;

  const childComponent = useMemo(() => {
    if (!data || isLoading) return skeleton;
    return inner(data as TMappedData);
  }, [data, skeleton, inner, isLoading]);

  //listen delete event,delete key
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      //check if focus on input
      const element = document.activeElement as HTMLElement;
      if (element.tagName === "INPUT") return;
      //or contenteditable, or textarea
      if (element.getAttribute("contenteditable")) return;
      if (element.tagName === "TEXTAREA") return;
      if (e.key === "Delete" || e.key === "Backspace") {
        remove();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, remove]);
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
        className="w-full h-full flex flex-col bg-transparent rounded-lg overflow-hidden shadow-0 "
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
            <ScrollArea className="px-6">
              {data && fullScreen(data as TMappedData)}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}

export { WidgetRoot };
