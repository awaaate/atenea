import { lazy, Suspense, useEffect } from "react";
import type { Color } from "@tremor/react";
import { cn } from "@shared/ui/src/utils";
import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";

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
  data: Record<string, unknown>[];
  className?: string;
  index: string;

  category: string;
}
/**
 * Renders a donut chart using the @tremor/react library.
 * @param data - An array of objects containing the name and sales of each city to be displayed in the chart.
 * @param className - An optional string to add custom CSS classes to the component.
 * @param index - A string representing the index of the chart.
 * @param category - A string representing the category of the chart.
 * @returns A React component that displays a donut chart.
 */
export const Donut = ({ data, className, index, category }: DonutProps) => {
  const colors = useNode((node) => node.data.props.colors!);
  const { setNode } = useNodeActions();

  useEffect(() => {
    const pieElements = data.length;
    const colorsLength = colors.length;

    if (pieElements !== colorsLength) {
      setNode((node) => {
        node.data.props.colors = Array.from(
          { length: pieElements },
          (_, i) => "indigo" as const
        );
        return node;
      });
    }
  }, [colors]);

  return (
    <div className=" h-full flex items-center justify-center flex-1">
      <DonutChart
        data={data}
        category={category}
        colors={colors}
        valueFormatter={valueFormatter}
        index={index}
        className="w-64 h-64"
      />
    </div>
  );
};
