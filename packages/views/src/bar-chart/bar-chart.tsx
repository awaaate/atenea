import { useNode } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import { BarChart, Color } from "@tremor/react";

interface BarChartViewProps {
  className?: string;
  colors?: Color[];
  data: Record<string, unknown>[];
  categories: string[];
  index: string;
}

export function BarChartView(props: BarChartViewProps) {
  const { className, data, categories, index } = props;

  const colors = useNode((node) => node.data.props.colors);

  return (
    <BarChart
      className={cn("w-[calc(100%-1rem)]", className)}
      colors={colors as any}
      data={data}
      categories={categories}
      index={index}
    />
  );
}
