import { Icon } from "@shared/ui/src/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/src/popover";
import { cn } from "@shared/ui/src/utils";
import { Button, Color } from "@tremor/react";
import React from "react";
import { ColorsListSelect } from "./colors-list-select";
import { getBackgroundColor } from "./utils";
interface ViewColorsPickerProps {
  className?: string;
  color?: Color;
  setColor?: (color: Color) => void;
}
const ViewColorsPicker: React.FC<ViewColorsPickerProps> = ({
  className,
  color,
  setColor,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {color ? (
              <div
                className={cn(
                  getBackgroundColor(color),
                  "icon-m rounded !bg-center !bg-cover transition-all"
                )}
              ></div>
            ) : (
              <Icon name="Paintbrush2" className="h-4 w-4" />
            )}
            <div className="flex-1 text-sm text-text-weak font-semibold">
              {"color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2 flex items-center justify-center">
        <ColorsListSelect color={color as any} setColor={setColor as any} />
      </PopoverContent>
    </Popover>
  );
};

export default ViewColorsPicker;
