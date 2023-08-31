"use client";
import { Card, DonutChart, List, ListItem } from "@tremor/react";
import React, { useEffect, useMemo } from "react";

import { ProposalBudgetWidgetConfig } from "./proposal-budget-widget-config";

import { Skeleton } from "@shared/ui";
import { WidgetRoot } from "../../widget/widget-root";
import {
  Widget,
  WidgetProps,
  WIDGET_DEFAULT,
  createWidgetProps,
} from "../../widget/widget-types";
import { getProposalBudget } from "./proposal-budget-widget-data-fetcher";
import { useNode } from "../../engine/nodes";

export interface ProposalBudgetWidgetProps extends WidgetProps {
  proposalId: number;
}

type WidgetInnerProps = Awaited<
  ReturnType<ReturnType<typeof getProposalBudget>>
> &
  WidgetProps & {
    ref: React.MutableRefObject<HTMLDivElement | null>;
  };

const valueFormatter = (number: number) => `${number} ETH`;

const WidgetInner: React.FC<WidgetInnerProps> = ({
  proposalCollection,
  ref,
}) => {
  const proposal = proposalCollection?.edges[0];
  const chartData = useMemo(() => {
    if (!proposal) return [];
    return proposal.node.budgetSectionCollection.edges.map(({ node }) => ({
      name: node.name,
      "Allocation of the budget": node.amount,
    }));
  }, [proposal]);

  return (
    <section className=" flex  h-full flex-wrap gap-4 p-6" ref={ref}>
      <div className="w-[200px] bg-surface-default ">
        <DonutChart
          className="w-full flex-1"
          style={{
            height: "200px",
          }}
          data={chartData}
          category="Allocation of the budget"
          index="name"
          colors={["red", "cyan", "purple", "orange", "pink"]}
          valueFormatter={valueFormatter}
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <List>
          {proposal.node.budgetSectionCollection.edges.map(({ node }, i) => (
            <ListItem key={node.name + i} className="flex flex-col">
              <p className="text-md mb-2 w-full text-text-weak">{node.name}</p>
              <p className="text-text-weaker w-full">{node.description}</p>
            </ListItem>
          ))}
        </List>
      </div>
    </section>
  );
};

export const ProposalBudgetWidget: Widget<{
  proposalId: number;
}> = () => {
  const props = useNode((node) => node.data.props as ProposalBudgetWidgetProps);
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <WidgetRoot
      dataFetcher={[
        "proposal-budget/" + props.proposalId,
        getProposalBudget(props.proposalId),
      ]}
      skeleton={<Skeleton />}
      inner={(data) => <WidgetInner {...data} {...props} ref={ref} />}
      fullScreen={(data) => <WidgetInner {...data} {...props} ref={ref} />}
    />
  );
};

ProposalBudgetWidget.displayName = "ProposalBudgetWidget";

ProposalBudgetWidget.node = {
  displayName: "ProposalBudgetWidget" as const,
  defaultProps: createWidgetProps({
    proposalId: 4,
    layout: {
      h: 14,
      i: "proposal-budget",
      w: 6,
      x: 0,
      y: 0,
    },
  }),
  related: {
    toolbar: ProposalBudgetWidgetConfig,
  },
};
