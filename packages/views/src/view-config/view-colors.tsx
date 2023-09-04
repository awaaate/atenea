import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { Color } from "@tremor/react";
import { forwardRef } from "react";
import { ToogleGroup, ToogleItem } from "@shared/ui/src/toggle-group";
import { cn } from "@shared/ui/src/utils";
interface ViewColorsProps {
  className?: string;
  availableColors: Color[];
  selectedColors: Color[];
  onChange: (colors: Color[]) => void;
}

export const ViewColors: React.FC<ViewColorsProps> = ({
  className,
  availableColors,
  selectedColors,
  onChange,
}) => {
  const colors = useNode((node) => node.data.props.colors as Color[]);
  const { setNode } = useNodeActions();

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
        >
          {availableColors.map((color) => (
            <ColorBox
              key={color}
              value={color}
              style={{
                backgroundColor: color,
              }}
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
      " icon-xl  rounded-md border-2  data-[state=on]:border-blue-500 ",
      className
    )}
    {...props}
  />
));
