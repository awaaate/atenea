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
      <WidgetConfigSection title="Layout">
        <BackgroundPicker
          background={background}
          setBackground={(background) => {
            setNode((node) => {
              node.data.props.background = background;
              return node;
            });
          }}
        />
        {JSON.stringify(layout)}

        <div className="flex gap-3 mt-4 px-2">
          <p className="text-text-weak ">Roudness</p>
          <Slider
            max={50}
            min={0}
            defaultValue={[borderRadius]}
            onValueChange={(value) => {
              setNode((node) => {
                node.data.props.borderRadius = value[0];
                return node;
              });
            }}
          />
        </div>
        <div className="flex gap-3 mt-4 px-2">
          <p className="text-text-weak ">Spacing</p>
          <Slider
            max={100}
            min={0}
            defaultValue={[paddingTop]}
            onValueChange={(value) => {
              setNode((node) => {
                node.data.props.paddingTop = value[0];
                return node;
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
                "border-blue-500": sizes[w] === size,
              })}
              onClick={() =>
                setNode((node) => {
                  node.data.props.layout.w = size;
                  return node;
                })
              }
            />
          ))}
        </div>
      </WidgetConfigSection>
    </div>
  );
};
