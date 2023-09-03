import { cn } from "@shared/ui/src/utils";
import { HTMLAttributes } from "react";

export const ColorBox = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
      }}
      className={cn(
        "rounded-default bg-surface-default shadow-popout flex items-center justify-center capitalize p-6 text-center",
        className
      )}
      {...props}
    />
  );
};
