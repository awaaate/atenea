import React from "react";
import { ToggleGroup, ToggleItem } from "@shared/ui/src/toggle-group";
import { BarList } from "@tremor/react";
export interface PropUpdate {
  id: string;
  admin: string;
  prop: Prop;
  isCompleted: boolean;
  update: string;
  date: string;
}

export interface Prop {
  id: string;
  proposer: string;
  title: string;
}

export interface PropUpdatesLeaderboardProps {
  updates: PropUpdate[];
}

export const PropUpdatesLeaderboard: React.FC<PropUpdatesLeaderboardProps> = ({
  updates,
}) => {
  const [tab, setTab] = React.useState<"proposer" | "admin" | "proposal">(
    "admin"
  );

  const data = React.useMemo(() => {
    if (tab === "admin") {
      //count by admin
      return updates.reduce((acc, update) => {
        const admin = update.admin;
        if (acc[admin]) {
          acc[admin].push(update);
        } else {
          acc[admin] = [update];
        }
        return acc;
      }, {} as Record<string, PropUpdate[]>);
    } else if (tab === "proposer") {
      //count by proposer
      return updates.reduce((acc, update) => {
        const proposer = update.prop.proposer;
        if (acc[proposer]) {
          acc[proposer].push(update);
        } else {
          acc[proposer] = [update];
        }
        return acc;
      }, {} as Record<string, PropUpdate[]>);
    } else {
      //count by proposal
      return updates.reduce((acc, update) => {
        const propId = update.prop.id;
        if (acc[propId]) {
          acc[propId].push(update);
        } else {
          acc[propId] = [update];
        }
        return acc;
      }, {} as Record<string, PropUpdate[]>);
    }
  }, [updates, tab]);

  const barData = React.useMemo(() => {
    return Object.entries(data)
      .map(([key, value]) => {
        return {
          name: key,
          value: value.length,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup
        value={tab}
        onValueChange={(val) => setTab(val)}
        type="single"
        className="w-full flex gap-2 border p-2 rounded-default justify-center"
      >
        <ToggleItem value="admin">By Admin</ToggleItem>
        <ToggleItem value="proposer">By Proposer</ToggleItem>
        <ToggleItem value="proposal">By Proposal</ToggleItem>
      </ToggleGroup>
      <BarList data={barData} />
    </div>
  );
};
