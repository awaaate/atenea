"use client";
import { UserComponent, useNode } from "@craftjs/core";
import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import useSWR from "swr";

import { WidgetRoot } from "../../widget/widget-root";
import { BarListCategoriesWidgetConfig } from "./bar-list-categories-widget-config";
import { getCategoriesProposals } from "./bar-list-categories-widget-fecther";

import { Skeleton } from "@shared/ui";
import { Widget } from "../../widget/widget-types";
import React from "react";

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

export const BarListCategoriesWidget: UserComponent = () => {
  const { props } = useNode((node) => ({
    props: node.data.props as BarListCategoriesWidgetProps,
  }));
  return (
    <WidgetRoot
      dataFetcher={["proposal-bar-categories/", getCategoriesProposals()]}
      skeleton={<Skeleton />}
      inner={(data) => <WidgetInner {...props} data={data} />}
      fullScreen={(data) => <WidgetInner {...props} data={data} />}
    />
  );
};

BarListCategoriesWidget.craft = {
  displayName: "Proposal Budget",
  defaultProps: {
    proposalId: 4,
    gridSpan: 4,
  },
  related: {
    toolbar: BarListCategoriesWidgetConfig,
  },
};
