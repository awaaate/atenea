import { cn } from "@shared/ui/src/utils";
import React from "react";

interface Metric {
  name: string;
  metric: string;
  className?: string;
}
export const Metric: React.FC<Metric> = ({ name, metric }) => {
  return (
    <>
      <p className="font-sm text-text-weakest">{name}</p>
      <p className="text-2xl font-semibold mt-1">{metric}</p>
    </>
  );
};

export const MetricAndCard: React.FC<Metric> = ({
  name,
  metric,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-2 bg-surface-raised rounded-default min-w-[200px] flex-1 ",
        className
      )}
    >
      <p
        className="text-current uppercase"
        style={{
          fontSize: "0.6rem",
        }}
      >
        {name}
      </p>
      <p className="text-2xl text-current  font-semibold mt-1">{metric}</p>
    </div>
  );
};
