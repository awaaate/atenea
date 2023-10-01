import { Avatar } from "@shared/ui/src/avatar";
import { Badge } from "@shared/ui/src/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/src/dialog";
import { Icon } from "@shared/ui/src/icon";
import PopularTeams from "./popular-teams.json";

export const PopularTeamsView: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(PopularTeams).map(({ category, members, image, name }) => {
        return (
          <Dialog>
            <DialogTrigger
              key={name}
              className="p-2 rounded-default bg-surface-default border min-w-[200px] h-min shadow-none flex-1 flex justify-center flex-col gap-2 items-center "
            >
              <Avatar
                name={name}
                src={image}
                className="bg-status-info text-text-on-accent"
              />
              <Badge variant={"info"}>{category}</Badge>
              <p>{name}</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {name}Team ({category})
                </DialogTitle>
              </DialogHeader>
              <div>
                {members.map((member) => {
                  return (
                    <div
                      key={member.name}
                      className="flex flex-col gap-2  min-w-[200px] px-4 py-2 rounded-lg "
                    >
                      <p className="text-lg font-semibold">
                        {member.name}{" "}
                        <Badge>
                          <a
                            href={`${member.contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Contact{" "}
                            <Icon name="ExternalLink" className="ml-2" />
                          </a>
                        </Badge>
                      </p>
                      <p className="text-text-weakest">{member.description}</p>
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};
