import React from "react";

import { cn } from "@shared/ui/src/utils";

interface WidgetSizeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size: "xs" | "sm" | "md" | "lg";
}
export const WidgetSizeButton: React.FC<WidgetSizeButtonProps> = ({
  size,
  className,
  ...props
}) => {
  const availableSpace =
    4 -
    {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    }[size];
  return (
    <div
      {...props}
      className={cn(
        "flex icon-xl cursor-pointer items-center justify-center rounded-default border-2 bg-surface-default p-2 transition-all hover:border-blue-500",
        className
      )}
    >
      <div className="grid h-full w-full grid-cols-4 gap-1">
        <div
          className={cn("rounded-lg bg-accent", {
            "col-span-1": size === "xs",
            "col-span-2": size === "sm",
            "col-span-3": size === "md",
            "col-span-4": size === "lg",
          })}
        ></div>
        {Array.from({ length: availableSpace }).map((_, index) => (
          <div
            key={index}
            className={cn("h-full w-full rounded-default bg-border-default")}
          />
        ))}
      </div>
    </div>
  );
};
