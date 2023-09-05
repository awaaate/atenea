import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { Color } from "@tremor/react";
import { forwardRef } from "react";
import { ToogleGroup, ToogleItem } from "@shared/ui/src/toggle-group";
import { cn } from "@shared/ui/src/utils";
interface ViewColorsConfigProps {
  className?: string;
  availableColors?: Color[];
}

const TW_COLORS_MAP = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  zinc: "bg-zinc-500",
  neutral: "bg-neutral-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
};

export const ViewColorsConfig: React.FC<ViewColorsConfigProps> = ({
  className,
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
  const colors = useNode((node) => node.data.props.colors as Color[]);
  const { setNode } = useNodeActions();

  console.log("colors", colors);
  return (
    <WidgetConfigSection title="Colors">
      <div className={className}>
        <ToogleGroup
          type="multiple"
          value={colors}
          onValueChange={(newColors) => {
            setNode((node) => {
              node.data.props.colors = newColors;
              return node;
            });
          }}
          className="gap-2 flex flex-wrap"
        >
          {availableColors.map((color) => (
            <ColorBox
              key={color}
              value={color}
              className={cn(TW_COLORS_MAP[color])}
            />
          ))}
        </ToogleGroup>
      </div>
    </WidgetConfigSection>
  );
};
const ColorBox = forwardRef<
  React.ElementRef<typeof ToogleItem>,
  React.ComponentPropsWithoutRef<typeof ToogleItem>
>(({ className, ...props }, ref) => (
  <ToogleItem
    ref={ref}
    className={cn(
      " icon-xl  rounded-md border-2  data-[state=on]:border-blue-500 data-[state=on]:border-2 hover:border-blue-500 hover:bg-inherit ",
      className
    )}
    {...props}
  />
));
