import React from "react";
type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

type ResizeHandleProps = {
  handleAxis: ResizeHandleAxis;
};
const GridItemResizeHandle = React.forwardRef<
  HTMLDivElement,
  ResizeHandleProps
>(({ handleAxis }, ref) => {
  return (
    <div
      ref={ref}
      className={`react-resizable-handle react-resizable-handle-${handleAxis} select-none  fill-blue-500`}
    >
      h
    </div>
  );
});

export { GridItemResizeHandle };
