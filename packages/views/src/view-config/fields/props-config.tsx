import { WidgetProps } from "@shared/editor/src/widget/widget-types";
import React from "react";
import { createNumberField } from "./number-field";
import { ViewColorsConfig } from "../chart-color/view-colors";
import { Separator } from "@shared/ui/src/separator";
interface ViewPropsConfigProps {
  props: {
    name: keyof WidgetProps;
    label: string;
    type: "number" | "chart-colors";
  }[];
}

export const ViewPropsConfig: React.FC<ViewPropsConfigProps> = ({ props }) => {
  return (
    <>
      {props
        .map((prop, i) => {
          switch (prop.type) {
            case "number":
              console.log("prop", prop);
              return createNumberField(prop);
            case "chart-colors":
              return <ViewColorsConfig />;
            default:
              return null;
          }
        })
        .map((comp, i) => (
          <>
            {comp}
            {i < props.length - 1 && <Separator />}
          </>
        ))}
    </>
  );
};
