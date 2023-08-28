import React from "react";
import { useNode } from "@craftjs/core";

import { BackgroundPicker, Slider, cn } from "@shared/ui";
import { WidgetProps } from "./widget-types";
import { WidgetConfigSection } from "./widget-config-section";
import { WidgetSizeButton } from "../components/widget-size-button/widget-size-button";

interface WidgetConfigProps {
  children?: React.ReactNode;
}

const SIZES = ["xs", "sm", "md", "lg"] as const;
export const WidgetConfig: React.FC<WidgetConfigProps> = ({ children }) => {
  const { props, actions } = useNode((node) => {
    return {
      props: node.data.props as WidgetProps,
    };
  });

  const sizes = [3, 6, 9, 12];

  return (
    <div className="col-span-1">
      {children}
      <WidgetConfigSection title="Layout">
        <BackgroundPicker
          background={props.background}
          setBackground={(background) => {
            actions.setProp((props: WidgetProps) => {
              props.background = background;
              return props;
            });
          }}
        />

        <div className="flex gap-3 mt-4 px-2">
          <p className="text-text-weak ">Roudness</p>
          <Slider
            max={50}
            min={0}
            defaultValue={[props.borderRadius]}
            onValueChange={(value) => {
              actions.setProp((props: WidgetProps) => {
                props.borderRadius = value[0];
                return props;
              });
            }}
          />
        </div>
        <div className="flex gap-3 mt-4 px-2">
          <p className="text-text-weak ">Spacing</p>
          <Slider
            max={100}
            min={0}
            defaultValue={[props.paddingTop]}
            onValueChange={(value) => {
              actions.setProp((props: WidgetProps) => {
                props.paddingBottom = value[0];
                props.paddingLeft = value[0];
                props.paddingRight = value[0];
                props.paddingTop = value[0];
                return props;
              });
            }}
          />
        </div>
      </WidgetConfigSection>
      <WidgetConfigSection title="Widget Size">
        <WidgetConfigSection.Title />

        <div className="flex gap-3">
          {sizes.map((size, i) => (
            <WidgetSizeButton
              size={SIZES[i]}
              className={cn({
                "border-blue-500": sizes[props.gridSpan] === size,
              })}
              onClick={() =>
                actions.setProp((props: WidgetProps) => {
                  props.layout.w = size;
                  return props;
                })
              }
            />
          ))}
        </div>
      </WidgetConfigSection>
    </div>
  );
};
