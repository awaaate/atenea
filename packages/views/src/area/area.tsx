import { useNode } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import { Card, Title, AreaChart, Color } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return number.toString();
};
interface AreaViewProps<TData> {
  className?: string;
  data: TData[];
  categories: keyof TData[] extends string[] ? keyof TData[] : string[];
  index: keyof TData & string;
}

export const AreaView = <TData extends Record<string, any>>({
  categories,
  data,
  index,
  className,
}: AreaViewProps<TData>) => {
  const colors = useNode((node) => node.data.props.colors);
  return (
    <AreaChart
      className={cn("w-full min-h-72", className)}
      data={data}
      categories={categories}
      index={index}
      colors={colors as any}
      valueFormatter={dataFormatter}
    />
  );
};
