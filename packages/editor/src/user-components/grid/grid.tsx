import { useMemo } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "./grid.css";

import { selectors, useEditorStore } from "../../engine/editor";
import { GridItem } from "./grid-item";

const DROPPING_ELEMENT_ID = "__dropping-elem__";

export const Grid = () => {
  const nodeIds = useEditorStore(selectors.nodesIds);
  const layout = useEditorStore(selectors.layout);
  const setLayout = useEditorStore((satate) => satate.setLayout);
  const editable = useEditorStore((state) => state.editable);
  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  const gridLayout = useMemo(() => {
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
        isDraggable={editable}
        isResizable={editable}
      >
        {nodeIds.map((child: string, index: number) => {
          return <GridItem key={child} id={child} />;
        })}
      </ResponsiveReactGridLayout>
    );
  }, [nodeIds.length]);

  return gridLayout;
};
