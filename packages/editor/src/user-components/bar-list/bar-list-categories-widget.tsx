"use client";
import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

import { WidgetRoot } from "../../widget/widget-root";
import { BarListCategoriesWidgetConfig } from "./bar-list-categories-widget-config";
import { getCategoriesProposals } from "./bar-list-categories-widget-fecther";

import { Skeleton } from "@shared/ui/src/skeleton";
import { useNode } from "../../engine/nodes";
import { Widget } from "../../widget/widget-types";

export interface BarListCategoriesWidgetProps {
  proposalId?: number;
  data: any;
}

const valueFormatter = (number: number) => `${number} ETH`;

const WidgetInner: Widget<BarListCategoriesWidgetProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <Title>Budget by Category</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Category</Bold>
        </Text>
        <Text>
          <Bold>Total Budget</Bold>
        </Text>
      </Flex>
      <BarList
        data={data || []}
        className="mt-2"
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export const BarListCategoriesWidget: Widget = () => {
  const props = useNode((node) => node.data.props);
  return (
    <WidgetRoot
      dataFetcher={["proposal-bar-categories/", getCategoriesProposals()]}
      skeleton={<Skeleton />}
      inner={(data) => <WidgetInner {...props} data={data} />}
      fullScreen={(data) => <WidgetInner {...props} data={data} />}
    />
  );
};
BarListCategoriesWidget.displayName = "BarListCategoriesWidget";

BarListCategoriesWidget.node = {
  displayName: "BarListCategoriesWidget",
  defaultProps: {
    layout: {
      w: 9,
      h: 28,
      x: 0,
      y: 0,
      i: "",
    },
  },
  related: {
    toolbar: BarListCategoriesWidgetConfig,
  },
};
