import { UpdateCardProps, UpdateCard } from "./update-card";
interface Update extends UpdateCardProps {
  
  propId: string;
  title: string;
}
interface PropUpdatesListProps {
  updates: Update[];
};


export const PropUpdatesList: React.FC<PropUpdatesListProps> = ({ updates }) => {

  return (
    <div className="flex flex-col space-y-2">
      {updates.map((update) => {
        return <UpdateCard {...update} key={update.title + update.propId} />
      
      })}


    </div>
  )
};
