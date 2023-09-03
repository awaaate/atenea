import React, { forwardRef } from "react";
import { ToogleGroup, ToogleItem } from "../toggle-group";
import { cn } from "../lib/utils";

const COLORS = {
  default: {
    text: "",
    background: "",
  },
  red: {
    background: "220 4 59",
    text: "255 255 255",
  },
  orange: {
    background: "255 68 1",
    text: "255 255 255",
  },
  yellow: {
    background: "255 186 0",
    text: "0 0 0",
  },
  green: {
    background: "4 138 14",
    text: "255 255 255",
  },
};

function getColor(color: string) {
  let c = COLORS[color as keyof typeof COLORS];
  if (!c) return `${COLORS.default.background}`;
  return `${c.background}`;
}
function getTextColor(color: string) {
  let c = COLORS[color as keyof typeof COLORS];
  if (!c) return `${COLORS.default.text}`;
  return `${c.text}`;
}

export const AccentPicker = forwardRef<
  React.ElementRef<typeof ToogleGroup>,
  React.ComponentPropsWithoutRef<typeof ToogleGroup>
>(({ type, className, onValueChange, ...props }, ref) => {
  return (
    //@ts-expect-error
    <ToogleGroup
      ref={ref}
      {...props}
      type="single"
      className={cn("flex gap-2", className)}
      onValueChange={(color: string) => {
        //set the css variables
        document.documentElement.style.setProperty(
          "--theme-color-accent",
          getColor(color)
        );
        document.documentElement.style.setProperty(
          "--theme-color-accent-text",
          getTextColor(color)
        );
        onValueChange && onValueChange(color as any);
      }}
    >
      {Object.keys(COLORS).map((color) => (
        <ToogleItem
          key={color}
          value={color}
          className="icon-xl"
          style={{
            backgroundColor: `rgb(${getColor(color)})`,
            color: `rgb(${getTextColor(color)})`,
          }}
        ></ToogleItem>
      ))}
    </ToogleGroup>
  );
});
