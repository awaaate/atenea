import { lazy, Suspense } from "react";
import type { Color } from "@tremor/react";

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

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export interface DonutProps {
  className?: string;
  colors?: Color[];
  data: Record<string, unknown>[];
  category: string;
}

export const Donut: React.FC<DonutProps> = ({
  className,
  colors,
  data,
  category,
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonutChart
        className={className}
        data={data}
        category={category}
        colors={colors}
        valueFormatter={valueFormatter}
      />
    </Suspense>
  );
};
