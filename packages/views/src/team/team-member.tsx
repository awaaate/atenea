import React from "react";
import { Badge } from "@shared/ui/src/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui/src/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/src/dialog";
import { Avatar } from "@shared/ui/src/avatar";

export interface TeamMemberViewProps {
  name: string;
  what: string;
  walletAddress: string;
  socialHandles: {
    name: string;
    url: string;
  }[];
}

export const TeamMemberView: React.FC<TeamMemberViewProps> = (props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="p-2 rounded-default bg-surface-raised border min-w-[200px] h-min shadow-none flex-1 flex justify-center flex-col gap-2 items-center">
          <Avatar
            className="mr-2 bg-status-highlight text-text-on-accent"
            name={props.name}
          />
          <p>{props.name}</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.name}</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <p className="text-text">{props.what}</p>
            <div className="flex flex-row gap-2">
              {props.walletAddress && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant={"highlight"}>
                      <a
                        href={`https://etherscan.io/address/${props.walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {props.walletAddress}
                      </a>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Wallet Address: {props.walletAddress}
                  </TooltipContent>
                </Tooltip>
              )}

              {props.socialHandles.map(
                (socialHandle) =>
                  socialHandle.name && (
                    <Tooltip key={socialHandle.name}>
                      <TooltipTrigger>
                        <Badge
                          className="text-text-weakest"
                          variant={"highlight"}
                        >
                          <a
                            href={socialHandle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socialHandle.name}
                          </a>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        {socialHandle.name}: {socialHandle.url}
                      </TooltipContent>
                    </Tooltip>
                  )
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
