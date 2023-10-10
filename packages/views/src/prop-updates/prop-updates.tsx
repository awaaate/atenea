import { UpdateCard, UpdateCardProps } from "./update-card";

export interface PropUpdateProps {
  updates: UpdateCardProps[];
  title: string;
  isCompleted: boolean;
}

export const PropUpdates: React.FC<PropUpdateProps> = ({
  updates,
  title,
  isCompleted,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      {updates.reverse().map((update, index) => (
        <UpdateCard {...update} index={updates.length - index} />
      ))}
    </div>
  );
};
