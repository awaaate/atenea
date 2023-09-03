import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const className =
  " bg-text-neutral border-border-neutral border-border-danger  text-9xl text-status-neutral-weak font-weight-default  leading-default text-red-100    ";
const badgeVariants = cva(
  "inline-flex items-center rounded-pill rounded-pill border px-2.5 py-0.5 text-sm   font-default leading-default transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "text-text-neutral border-border-neutral bg-status-neutral-weak ",
        danger: "bg-status-danger-weak border-border-danger text-text-danger",
        warning:
          "bg-status-warning-weak border-border-warning text-text-warning",
        success:
          "bg-status-success-weak border-border-success text-text-success",
        info: "bg-status-info-weak border-border-info text-text-info",
        highlight:
          "bg-status-highlight-weak border-border-highlight text-text-highlight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
