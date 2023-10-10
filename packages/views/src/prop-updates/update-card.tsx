import { Avatar } from "@shared/ui/src/avatar";
import { Badge } from "@shared/ui/src/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@shared/ui/src/dialog";
import { Markdown } from "@shared/ui/src/markdown";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { Separator } from "@shared/ui/src/separator";

export interface UpdateCardProps {
  update: string;
  admin: string;
  date: string;
  isCompleted: boolean;
  index: number;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({
  update,
  admin,
  date,
  index,
  isCompleted,
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="h-auto py-4 items-start flex flex-col">
          <div className="flex justify-between w-full items-center gap-2">
            <div className="flex gap-2 items-center">
              <span className="rounded-full icon-xl place-content-center grid bg-surface-lowered">
                {index}
              </span>
              <h3 className="text-text-weak">
                {admin.slice(0, 6)}...{admin.slice(-6)}
              </h3>
              <p className="text-text-weaker">{date}</p>
            </div>
            <Badge variant={isCompleted ? "success" : "warning"}>
              {isCompleted ? "Completed" : "Pending"}
            </Badge>
          </div>
          <Separator className="mt-2" />
          <div className="w-full mt-8 text-left">
            <Markdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full">
              {update.slice(0, 200)}
            </Markdown>
            ...
          </div>
        </DialogTrigger>
        <DialogContent className="flex h-[500px] max-w-2xl w-full">
          <DialogHeader className="flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar name={admin} src={`/api/account/${admin}`} />
            </div>
            <div className="flex gap-2">
              <h3 className="text-weak">
                {admin.slice(0, 6)}...{admin.slice(-6)}
              </h3>
              <p className="text-text-weaker">{date}</p>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-2 items-center justify-center px-4 py-8">
            <ScrollArea>
              <Markdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full">
                {update}
              </Markdown>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
