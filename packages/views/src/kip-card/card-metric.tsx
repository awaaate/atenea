import React from "react";

interface Metric {
  name: string;
  metric: string;
}
export const Metric: React.FC<Metric> = ({ name, metric }) => {
  return (
    <>
      <p className="font-sm text-text-weakest">{name}</p>
      <p className="text-2xl font-semibold mt-1">{metric}</p>
    </>
  );
};

export const MetricAndCard: React.FC<Metric> = ({ name, metric }) => {
  return (
    <div className="flex flex-col p-2 bg-surface-raised rounded-default min-w-[200px] flex-1 border">
      <p className="font-sm text-text-weakest">{name}</p>
      <p className="text-2xl font-semibold mt-1">{metric}</p>
    </div>
  );
};
