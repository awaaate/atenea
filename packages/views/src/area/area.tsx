import { useNode } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import { Card, Title, AreaChart, Color } from "@tremor/react";

interface AreaViewProps<TData> {
  className?: string;
  data: TData[];
  categories: keyof TData[] extends string[] ? keyof TData[] : string[];
  index: keyof TData & string;
  valueFormatter?: (number: number) => string;
}

export const AreaView = <TData extends Record<string, any>>({
  categories,
  data,
  index,
  className,
  valueFormatter,
}: AreaViewProps<TData>) => {
  const colors = useNode((node) => node.data.props.colors);
  return (
    <AreaChart
      className={cn("w-full min-h-72", className)}
      data={data}
      categories={categories}
      index={index}
      colors={colors as any}
      valueFormatter={valueFormatter}
      showXAxis={false}
      showYAxis={false}
      showGridLines={false}
    />
  );
};
