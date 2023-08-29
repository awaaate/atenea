"use client";
import React, { useCallback, useEffect } from "react";

import { Card, Icon, cn } from "@shared/ui";
import { useEditorStore } from "../../engine/editor";
import {
  NodeProvider,
  RenderNodeToElement,
  useNodeActions,
} from "../../engine/nodes";
import { WidgetMenu } from "../../widget/widget-menu";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, style, id, ...props }, ref) => {
    const domRef = React.useRef<HTMLDivElement | null>(null);

    const select = useEditorStore.use.select();
    const connect = useEditorStore.use.connectNode();

    const isActive = useEditorStore((state) => state.events.selected.has(id));
    const isText = useEditorStore(
      useCallback((state) => state.nodes[id].data.displayName === "Text", [id])
    );

    useEffect(() => {
      if (!domRef.current) return;

      if (typeof ref === "function") ref(domRef.current);
      if (ref && typeof ref !== "function") ref.current = domRef.current;

      connect(id, domRef.current);

      const onClick = (event: MouseEvent) => {
        select(id);
      };
      domRef.current.addEventListener("click", onClick);

      return () => {
        domRef.current?.removeEventListener("click", onClick);
        connect(id, null);
      };
    }, [id, domRef.current]);

    return (
      <div
        {...props}
        style={{
          ...style,
        }}
        ref={(r) => {
          domRef.current = r;
          //cgeck if ref is a function
        }}
        className={cn(
          "overflow-visible border-2 border-transparent relative",
          {
            "border-transparent shadow-[0]": isText,
            "border-2 border-blue-500 ": isActive,

            active: isActive,
            "grid-item-text": isText,
          },
          className
        )}
      >
        <NodeProvider id={id}>
          <RenderNodeToElement />
        </NodeProvider>
        {props.children}
      </div>
    );
  }
);
