"use client";

import React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "../lib/utils";
import { buttonVariants } from "../button";

const Toolbar = ToolbarPrimitive.Root;

const ToolbarLink = ToolbarPrimitive.Link;

const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToolbarToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleItem>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToolbarToggleItem
    ref={ref}
    className={cn(
      buttonVariants({ size: "sm", variant: "ghost" }),
      "data-[state=on]:bg-surface-lowered",
      className
    )}
    {...props}
  />
));

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToolbarSeparator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarSeparator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToolbarSeparator className="bg-border-default" {...props} />
));

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToolbarButton>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarButton>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToolbarButton
    ref={ref}
    className={cn(
      buttonVariants({ size: "sm" }),
      "data-[state=on]:bg-border-default",
      className
    )}
    {...props}
  />
));

const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToolbarToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleGroup>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToolbarToggleGroup
    ref={ref}
    className={cn("flex gap-1", className)}
    {...props}
  />
));

export {
  Toolbar,
  ToolbarToggleItem,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarToggleGroup,
};
