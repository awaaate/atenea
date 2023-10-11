import { useMemo } from "react";
import { UpdateCard, UpdateCardProps } from "./update-card";

export interface PropUpdateProps {
  updates: UpdateCardProps[];
  title: string;
  isCompleted: boolean;
}

export const PropUpdates: React.FC<PropUpdateProps> = ({
  updates,
  title,
}) => {
  const revderedUpdates = useMemo(() => {
    return updates.map((update, index) => (
      <UpdateCard {...update} index={index + 1} />
    )).reverse();

  }, [updates]);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      {revderedUpdates}
    </div>
  );
};
