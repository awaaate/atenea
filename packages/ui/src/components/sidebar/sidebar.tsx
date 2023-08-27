import React from "react";
import { cn } from "../../lib/utils";

const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("bg-nav-surface h-scfull  w-full max-w-[250px]", className)}
      {...props}
    />
  );
};

const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={cn("border-b px-2 py-6", className)} {...props} />;
};
const SidebarFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={cn("border-t px-2 py-6", className)} {...props} />;
};

const SidebarNav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={cn("px-2 py-6", className)} {...props} />;
};

export { Sidebar, SidebarHeader, SidebarFooter, SidebarNav };
