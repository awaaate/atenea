import { useEffect, useMemo } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "./grid.css";

import { EDITOR_WIDTH, EDITOR_WIDTH_CLASSES } from "../../constants";
import { selectors, useEditorStore } from "../../engine/editor";
import { MemoizedGridItem } from "../grid-item";

import { cn } from "@shared/ui/src/utils";
import { useDragStore } from "../../hooks/use-drag-store";
import { WidgetFactory } from "../../widget/widget-factory";
import { widgetFactory } from "../../widget/factory";
import { createNode } from "../../engine/nodes";

const DROPPING_ELEMENT_ID = "__dropping-elem__";

export const Grid = () => {
  const nodeIds = useEditorStore(selectors.nodesIds);
  const layout = useEditorStore(selectors.layout);
  const setLayout = useEditorStore((satate) => satate.setLayout);
  const sidebar = useEditorStore((state) => state.sidebar);
  const editable = useEditorStore((state) => state.editable);
  const selectNode = useEditorStore((state) => state.select);
  const add = useEditorStore((state) => state.create);
  useEffect(() => {
    console.log("layout", layout);
  }, [layout]);
  const ResponsiveReactGridLayout = useMemo(() => {
    return WidthProvider(Responsive);
  }, []);

  const children = useMemo(() => {
    return nodeIds.map((child: string, index: number) => {
      return <MemoizedGridItem key={child} id={child} />;
    });
  }, [nodeIds.length]);

  const gridLayout = useMemo(() => {
    return (
      <ResponsiveReactGridLayout
        isBounded={true}
        rowHeight={10}
        draggableCancel=".react-resizable-handle"
        draggableHandle=".draggable-handle"
        className={cn(
          "h-full w-full min-h-[calc(100vh-100px)] ",
          EDITOR_WIDTH_CLASSES
        )}
        style={{
          minHeight: "calc(100vh - 100px)",
        }}
        layouts={{ lg: layout }}
        breakpoints={{
          lg: EDITOR_WIDTH.lg,
          sm: EDITOR_WIDTH.sm,
          md: EDITOR_WIDTH.md,
        }}
        cols={{ sm: 6, md: 12, lg: 24 }}
        isDroppable={true}
        onLayoutChange={(layout, layouts) => {
          setLayout([
            ...layout.filter((item) => item.i !== DROPPING_ELEMENT_ID),
          ]);
        }}
        useCSSTransforms={true}
        resizeHandles={["se", "e", "s"]}
        isDraggable={editable}
        isResizable={editable}
        onDropDragOver={(e) => {
          const dragNode = useDragStore.getState().dragNode;
          if (!dragNode) return false;
          const node = widgetFactory.getWidget(dragNode)?.node;
          if (!node) return false;

          if (!node.defaultProps) return false;
          const layout = {
            h: node.defaultProps.layout.h,
            w:
              node.defaultProps.layout.w === Infinity
                ? 24
                : node.defaultProps.layout.w,
          };
          console.log("onDropDragOver", layout);
          return layout;
        }}
        onDrop={(layout, item, event) => {
          const dragNode = useDragStore.getState().dragNode;
          const widget = widgetFactory.getWidget(dragNode);
          if (!widget) return false;
          const layoutItem = {
            i: crypto.randomUUID(),
            x: item.x,
            y: item.y,
            w: widget.node.defaultProps.layout.w,
            h: widget.node.defaultProps.layout.h,
          };

          const freshNode = createNode({
            id: layoutItem.i,
            data: {
              type: widget,
              props: {
                layout: layoutItem,
              },
            },
          });

          add(freshNode);
          selectNode(freshNode.id);
        }}
      >
        {children}
      </ResponsiveReactGridLayout>
    );
  }, [sidebar, layout]);

  return gridLayout;
};
