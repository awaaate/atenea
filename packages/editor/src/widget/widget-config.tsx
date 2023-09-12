import React from "react";

import { useNode, useNodeActions } from "../engine/nodes";
import { ScrollArea } from "@shared/ui/src/scroll-area";

interface WidgetConfigProps {
  children?: React.ReactNode;
}

const SIZES = ["xs", "sm", "md", "lg"] as const;
export const WidgetConfig: React.FC<WidgetConfigProps> = ({ children }) => {
  const { setNode } = useNodeActions();
  const background = useNode((node) => node.data.props.background);
  const borderRadius = useNode((node) => node.data.props.borderRadius);
  const paddingTop = useNode((node) => node.data.props.paddingTop);
  const layout = useNode((node) => node.data.props.layout);

  //TODO puede dar error si no esta definido
  const w = useNode((node) => node.data.props.layout.w!);
  const sizes = [3, 6, 9, 12];

  return (
    <ScrollArea className="col-span-1 h-[calc(100vh-50px)] pb-8 ">
      {children}

      {process.env.NODE_ENV === "development" && JSON.stringify(layout)}
    </ScrollArea>
  );
};
