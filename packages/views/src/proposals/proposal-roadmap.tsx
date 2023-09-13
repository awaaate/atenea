import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/src/dialog";

interface ProposalRoadmapProps {
  roadmap: {
    name: string;
    description: string;
    id: number | string;
  }[];
}

export const ProposalRoadmapView: React.FC<ProposalRoadmapProps> = ({
  roadmap,
}) => {
  return (
    <div className="flex w-full gap-3 flex-col p-4">
      {roadmap.map((roadmapItem, index) => {
        return (
          <Dialog>
            <DialogTrigger className="h-auto py-2 w-full justify-start ">
              <span className="icon-xl rounded-full flex items-center justify-center bg-status-highlight mr-2">
                {index + 1}
              </span>
              {roadmapItem.name}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{roadmapItem.name}</DialogTitle>
              </DialogHeader>
              <div className="pb-6 px-6">{roadmapItem.description}</div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};
