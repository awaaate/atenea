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
    <div className="flex w-full gap-3 flex-wrap">
      {roadmap.map((roadmapItem, index) => {
        return (
          <Dialog>
            <DialogTrigger className="h-auto py-2 flex-1 min-w-[300px] border-0 justify-start shadow-none  bg-surface-raised border rounded-pill">
              <span className="icon-xl rounded-full flex items-center justify-center bg-accent mr-2 text-sm text-text-on-accent">
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
