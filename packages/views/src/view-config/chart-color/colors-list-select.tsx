import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { Color } from "@tremor/react";
import { forwardRef } from "react";
import { ToggleGroup, ToggleItem } from "@shared/ui/src/toggle-group";
import { cn } from "@shared/ui/src/utils";
import { getBackgroundColor } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui/src/tooltip";

interface ColorsListSelectProps {
  className?: string;
  availableColors?: Color[];
  color: Color[];
  setColor: (colors: Color) => void;
}

export const ColorsListSelect: React.FC<ColorsListSelectProps> = ({
  className,
  color,
  setColor,
  availableColors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ],
}) => {
  return (
    <div className={className}>
      <ToggleGroup
        type="single"
        value={color as unknown as string}
        onValueChange={(newColors) => {
          console.log("newColors", newColors);
          setColor(newColors as any);
        }}
        className="gap-2 flex flex-wrap"
      >
        {availableColors.map((color) => (
          <ColorBox
            key={color}
            value={color}
            className={cn(getBackgroundColor(color), "")}
          />
        ))}
      </ToggleGroup>
    </div>
  );
};
const ColorBox = forwardRef<
  React.ElementRef<typeof ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToggleItem>
>(({ className, ...props }, ref) => (
  <Tooltip>
    <TooltipTrigger>
      <ToggleItem
        ref={ref}
        className={cn(
          " icon-xl  rounded-pill border-2  data-[state=on]:border-blue-500 data-[state=on]:border-2 hover:border-blue-500  data-[state=on]:scale-125",
          className
        )}
        {...props}
      />
    </TooltipTrigger>
    <TooltipContent>{props.value}</TooltipContent>
  </Tooltip>
));
