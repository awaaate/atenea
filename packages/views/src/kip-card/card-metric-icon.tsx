import { IconName, Icon } from "@shared/ui/src/icon";
import React from "react";
import { CardAndMetric } from "./card-metric";
import { Card } from "@shared/ui/src/card";

interface CardAndMetricAndIconProps {
  name: string;
  metric: string;
  icon: IconName;
}
export const CardAndMetricAndIcon: React.FC<CardAndMetricAndIconProps> = ({
  icon,
  metric,
  name,
}) => {
  return (
    <>
      <div className="flex gap-2 p-4 border-t-4 border-accent ">
        <Icon
          name={icon}
          className="text-accent bg-accent/10 p-2 rounded-md"
          size="xl"
        />
        <div className="flex flex-col">
          <CardAndMetric name={name} metric={metric} />
        </div>
      </div>
    </>
  );
};
