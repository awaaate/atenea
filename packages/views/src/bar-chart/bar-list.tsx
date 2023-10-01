import { useNode } from "@shared/editor/src/engine/nodes";
import { Icon, IconName } from "@shared/ui/src/icon";
import { cn } from "@shared/ui/src/utils";
import { BarList, Color } from "@tremor/react";

interface BarListViewProps {
  className?: string;
  colors?: Color[];
  data: {
    key?: string;
    value: number;
    name: string;
    icon?: IconName;
    href?: string;
    target?: string;
    color?: Color;
  }[];
  categories: string[];
  index: string;
  valueFormatter?: (number: number) => string;
}

export function BarListView(props: BarListViewProps) {
  const { className, data, categories, index } = props;
  const colors = useNode((node) => node.data.props.colors) as Color[];

  return (
    <BarList
      className={cn("w-[calc(100%-1rem)]", className)}
      data={data.map((d) => ({
        ...d,
        color: colors[0],

        icon: d.icon
          ? () => {
              return <Icon name={d.icon as IconName} />;
            }
          : undefined,
      }))}
      valueFormatter={props.valueFormatter}
    />
  );
}
