import { lazy, Suspense } from "react";
import type { Color } from "@tremor/react";
import { cn } from "@shared/ui/src/utils";

const DonutChart = lazy(() =>
  import("@tremor/react").then((m) => ({ default: m.DonutChart }))
);

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const valueFormatter = (number: number) => `$ ${number}`;

export interface DonutProps {
  className?: string;
  colors?: Color[];
  data: Record<string, unknown>[];
  category: string;
  index: string;
}

export const Donut = ({ data, className, category, colors }: DonutProps) => {
  console.log("dontu data", data);
  return (
    <div
      className={cn("w-full ", className)}
      /*      style={{
        display: "ta",
      }} */
    >
      <DonutChart
        data={data}
        category={category}
        colors={colors}
        valueFormatter={valueFormatter}
        style={{
          height: "200px",
        }}
      />
    </div>
  );
};
