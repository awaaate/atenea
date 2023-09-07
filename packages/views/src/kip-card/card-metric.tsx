import React from "react";

interface CardAndMetricProps {
  name: string;
  metric: string;
}
export const CardAndMetric: React.FC<CardAndMetricProps> = ({
  name,
  metric,
}) => {
  return (
    <>
      <p className="font-sm text-text-weakest">{name}</p>
      <p className="text-2xl font-semibold mt-1">{metric}</p>
    </>
  );
};
