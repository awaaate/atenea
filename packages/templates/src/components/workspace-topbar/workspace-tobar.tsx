"use client";
import { Icon } from "@shared/ui/src/icon";
import { cn } from "@shared/ui/src/utils";
import { HtmlHTMLAttributes } from "react";
import { useLayoutStore } from "../../stores/layoutStore";

interface WorkspaceTobarProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const WorkspaceTobar: React.FC<WorkspaceTobarProps> = ({
  children,
  className,
  ...props
}) => {
  const pageTitle = useLayoutStore((state) => state.pageTitle);
  return (
    <div
      {...props}
      className={cn(
        "w-full  border-b h-[50px]  px-4 flex items-center",
        className
      )}
    >
      <div className="flex items-center mx-4 gap-2">
        <Icon name="Settings" className="text-text-weakest" size="s" />
        <h2 className="text-xl font-semibold text-text-weaker">
          {pageTitle || "Workspace"}
        </h2>
        {children}
      </div>
    </div>
  );
};
