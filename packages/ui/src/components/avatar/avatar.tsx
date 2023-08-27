"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const avatarvariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-border-default",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface AvatarRootProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarvariants> {}
const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarRootProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarvariants({ size, className }))}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full ", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-transparent ",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarProps extends React.ComponentProps<typeof AvatarRoot> {
  name: string;
  src?: string;
}
const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  return (
    <AvatarRoot {...props}>
      {props.src ? <AvatarImage src={props.src} /> : null}
      <AvatarFallback>
        {props.name
          .split(" ")
          .map((p) => p.at(0))
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </AvatarRoot>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarRoot };
export type { AvatarProps };
