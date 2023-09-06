import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { Color } from "@tremor/react";
import { forwardRef } from "react";
import { ToogleGroup, ToogleItem } from "@shared/ui/src/toggle-group";
import { cn } from "@shared/ui/src/utils";
import ViewColorsPicker from "./color-picker";
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

  return (
    <WidgetConfigSection title="Chart Colors">
      <WidgetConfigSection.Title />
      <div className={cn("flex flex-col gap-2", className)}>
        {colors?.map((color, index) => (
          <ViewColorsPicker
            key={index}
            className="w-full"
            color={color}
            setColor={(color) => {
              setNode((node) => {
                console.log("newColors node", color);
                node.data.props.colors = Array.from(
                  node.data.props.colors || []
                );
                node.data.props.colors[index] = color;

                return node;
              });
            }}
          />
        ))}
      </div>
    </WidgetConfigSection>
  );
};
