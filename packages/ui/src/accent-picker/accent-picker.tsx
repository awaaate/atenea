import React, { forwardRef } from "react";
import { ToogleGroup, ToogleItem } from "../toggle-group";
import { cn } from "../lib/utils";

export const ACCENT_COLORS = {
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

export function getAccentColor(color: keyof typeof ACCENT_COLORS) {
  let c = ACCENT_COLORS[color as keyof typeof ACCENT_COLORS];
  if (!c) return `${ACCENT_COLORS.default.background}`;
  return `${c.background}`;
}
export function getTextAccentColor(color: keyof typeof ACCENT_COLORS) {
  let c = ACCENT_COLORS[color as keyof typeof ACCENT_COLORS];
  if (!c) return `${ACCENT_COLORS.default.text}`;
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
      onValueChange={(color: keyof typeof ACCENT_COLORS) => {
        //set the css variables
        document.documentElement.style.setProperty(
          "--theme-color-accent",
          getAccentColor(color)
        );
        document.documentElement.style.setProperty(
          "--theme-color-accent-text",
          getTextAccentColor(color)
        );
        onValueChange && onValueChange(color as any);
      }}
    >
      {Object.keys(ACCENT_COLORS).map((color: keyof typeof ACCENT_COLORS) => (
        <ToogleItem
          key={color}
          value={color}
          className="icon-xl"
          style={{
            backgroundColor: `rgb(${getAccentColor(color)})`,
            color: `rgb(${getTextAccentColor(color)})`,
          }}
        ></ToogleItem>
      ))}
    </ToogleGroup>
  );
});
