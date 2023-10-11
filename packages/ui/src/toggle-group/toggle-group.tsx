"use client";
import * as TogglePrimitive from "@radix-ui/react-toggle-group";
import React from "react";

const ToggleGroup = TogglePrimitive.ToggleGroup;

import { cn } from "../lib/utils";
import { buttonVariants } from "../button";

const ToggleItem = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.ToggleGroupItem>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.ToggleGroupItem>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.ToggleGroupItem
    ref={ref}
    className={cn(
      buttonVariants({ size: "sm" }),
      "data-[state=on]:border-border-default",
      className
    )}
    {...props}
  />
));

ToggleItem.displayName = "ToggleItem";

export { ToggleGroup, ToggleItem };
