import { useMemo } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import { ROOT_NODE, UserComponent } from "@craftjs/core";
import { useDragStore } from "../../hooks/use-drag-store";
import { WidgetProps } from "../../widget/widget-types";

import { useEditor, useNode } from "@craftjs/core";

import "react-grid-layout/css/styles.css";
import "./grid.css";

import { GridItem } from "./grid-item";

const DROPPING_ELEMENT_ID = "__dropping-elem__";
export const Grid: UserComponent = ({ children }) => {
  const {
    connectors: { connect },
    id,
  } = useNode();
  const {
    childs,
    layout,
    setLayout,
    query,
    actions: { add, setProp, selectNode },
    connectors: { drop },
  } = useEditor((state, query) => {
    return {
      childs: query.node(id).descendants(),
      layout: query
        .node(id)
        .descendants()
        .map((child) => {
          return { ...query.node(child).get().data.props.layout, i: child };
        }),
      setLayout: (layout: ReactGridLayout.Layout[]) => {
        //set the layout for each child
        layout
          .filter((l) => l.i !== DROPPING_ELEMENT_ID)
          .forEach((layoutItem) => {
            setProp(layoutItem.i, (props: WidgetProps) => {
              props.layout = layoutItem;
              return props;
            });
          });
      },
    };
  });

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );
  const { dragNode, setDragNode } = useDragStore();

  const childComponent = useMemo(() => {
    return (
      <ResponsiveReactGridLayout
        isBounded={true}
        rowHeight={10}
        draggableCancel=".react-resizable-handle"
        draggableHandle=".draggable-handle"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ sm: 3, md: 9, lg: 12 }}
        isDroppable={true}
        onLayoutChange={(layout, layouts) => {
          setLayout([
            ...layout.filter((item) => item.i !== DROPPING_ELEMENT_ID),
          ]);
        }}
        resizeHandles={["se", "e", "s"]}
        onDropDragOver={(event) => {
          console.log(dragNode, "drop drag over");
          if (!dragNode) return false;

          return {
            w: 4,
            h: 2,
            y: 0,
          };
        }}
        /*       droppingItem={{
        i: DROPPING_ELEMENT_ID,
        w: 4,
        h: 2,
      }} */
        onDrop={(layout, { i, ...layoutItem }, _event) => {
          if (!dragNode) return;
          const nodeToAdd = query
            .parseFreshNode(
              Object.assign({}, dragNode, {
                data: Object.assign({}, dragNode.data, {
                  props: {
                    layout: layoutItem,
                  },
                }),
              })
            )
            .toNode();
          add(nodeToAdd, ROOT_NODE, 1);
          setLayout([
            ...layout.map((item) => {
              if (item.i === DROPPING_ELEMENT_ID) {
                return { ...item, i: nodeToAdd.id };
              }
              return item;
            }),
          ]);
          selectNode(nodeToAdd.id);
          setDragNode(null);
        }}
      >
        {children.props.children.map((child: string, index: number) => {
          return (
            <GridItem key={childs[index]} id={childs[index]}>
              {child}
            </GridItem>
          );
        })}
      </ResponsiveReactGridLayout>
    );
  }, [childs, dragNode]);

  return (
    <div
      ref={(ref) => {
        if (!ref) return;
        connect(ref);
      }}
      onDrop={(event) => {
        console.log(layout, "drop");
      }}
      className="h-full w-full flex-1"
    >
      {childComponent}
    </div>
  );
};
Grid.craft = {
  defaultProps: {},
  displayName: "Grid",
  props: {},
};
