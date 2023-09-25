import { IconName, Icon } from "@shared/ui/src/icon";
import React from "react";
import { Metric } from "./card-metric";
import { Card } from "@shared/ui/src/card";
import { cn } from "@shared/ui/src/utils";

interface CardAndMetricAndIconProps {
  name: string;
  metric: string;
  icon: IconName;
  className?: string;
}
export const CardAndMetricAndIcon: React.FC<CardAndMetricAndIconProps> = ({
  icon,
  metric,
  name,
  className,
}) => {
  return (
    <>
      <div className={cn("flex gap-2 p-4 border rounded-md", className)}>
        <Icon
          name={icon}
          className="text-accent bg-accent/10 p-2 rounded-md"
          size="xl"
        />
        <div className="flex flex-col bg-status-danger">
          <Metric name={name} metric={metric} />
        </div>
      </div>
    </>
  );
};
