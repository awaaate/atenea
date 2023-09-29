"use client";
import React, { type HTMLAttributes } from "react";

import { cn } from "@shared/ui/src/utils";

interface WidgetConfigSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  helperText?: string;
  children: React.ReactNode;
  isExpanded?: boolean;
}

const WidgetSectionConfigContext = React.createContext({
  title: "",
  helperText: "",
  isExpanded: false,
});
const WidgetConfigSectionTitle = () => {
  const { title } = useWidgetConfigSection();
  return <p className="text-sm mb-2 d text-text-weaker">{title}</p>;
};
export const WidgetConfigSection: React.FC<WidgetConfigSectionProps> & {
  Title: typeof WidgetConfigSectionTitle;
} = ({
  title,
  children,
  helperText,
  isExpanded = false,
  className,
  ...props
}) => {
  return (
    <WidgetSectionConfigContext.Provider
      value={{
        title,
        helperText: helperText || "",
        isExpanded,
      }}
    >
      <div className={cn("mt-2 px-4 py-2", className)} {...props}>
        {children}
      </div>
    </WidgetSectionConfigContext.Provider>
  );
};

export const useWidgetConfigSection = () => {
  const context = React.useContext(WidgetSectionConfigContext);
  if (!context) {
    throw new Error(
      `WidgetConfigSection must be used within a WidgetConfigSection`
    );
  }
  return context;
};

WidgetConfigSection.Title = WidgetConfigSectionTitle;
