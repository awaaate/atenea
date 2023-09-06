import React from "react";

import { WidgetSizeButton } from "../components/widget-size-button/widget-size-button";
import { useNode, useNodeActions } from "../engine/nodes";
import { WidgetConfigSection } from "./widget-config-section";
import { BackgroundPicker } from "@shared/ui/src/background-picker";
import { Slider } from "@shared/ui/src/slider";
import { cn } from "@shared/ui/src/utils";

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
    <div className="col-span-1">
      {children}

      {process.env.NODE_ENV === "development" && JSON.stringify(layout)}
    </div>
  );
};
