"use client";
import { useEditor } from "@craftjs/core";
import React from "react";

import { Button, Card, Icon, cn } from "@shared/ui";
import { WidgetProps } from "../../widget/widget-types";
import { useFloating } from "@floating-ui/react";
import { WidgetMenu } from "../../widget/widget-menu";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, style, ...props }, ref) => {
    const {
      nodeProps,
      displayName,
      query,
      connectors: { select },
      actions: { add, delete: deleteNode },
      isActive,
    } = useEditor((state, query) => {
      return {
        nodeProps: query.node(props.id).get().data.props as WidgetProps,
        isActive: state.events.selected.has(props.id),
        displayName: query.node(props.id).get().data.displayName,
      };
    });

    const isTextBlock = displayName === "Text";
    return (
      <Card
        {...props}
        style={{
          ...style,
          background: nodeProps.background,
          borderRadius: nodeProps.borderRadius,
          paddingTop: nodeProps.paddingTop,
          paddingBottom: nodeProps.paddingBottom,
          paddingLeft: nodeProps.paddingLeft,
          paddingRight: nodeProps.paddingRight,
        }}
        ref={(r) => {
          if (!r) return;
          select(r, props.id);

          //cgeck if ref is a function
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        className={cn(
          "overflow-visible border-2 border-transparent relative z-popout ",
          {
            "border-transparent shadow-[0]": isTextBlock,
            "border-2 border-blue-500 ": isActive,

            active: isActive,
            "grid-item-text": isTextBlock,
          },
          className
        )}
      >
        {isActive && (
          <Icon
            name="Grip"
            className="draggable-handle absolute top-0 left-0 m-2 hover:text-icon-hover cursor-grab"
          />
        )}
        <WidgetMenu id={props.id} />
        {props.children}
      </Card>
    );
  }
);
