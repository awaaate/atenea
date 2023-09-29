import React from "react";
import { cn } from "../lib/utils";
import { Icon } from "../icon";

interface SpinnerProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className, size = "md" }) => {
  const sizes = {
    xxs: "w-4 h-4",
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    xxl: "w-32 h-32",
  };
  return (
    <div role="status">
      <Icon
        name="Spinner"
        aria-hidden="true"
        className={cn(
          "animate-spin z-spinner text-black/20 transion-slowly",
          sizes[size],
          className
        )}
      />
    </div>
  );
};

export { Spinner };
export type { SpinnerProps };
