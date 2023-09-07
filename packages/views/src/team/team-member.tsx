import React from "react";
import { Badge } from "@shared/ui/src/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui/src/tooltip";

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
      <div className="flex flex-col gap-2  min-w-[200px] px-4 py-2 rounded-lg ">
        <p className="text-lg font-semibold">{props.name}</p>
        <p className="text-text-weakest">{props.what}</p>
        <div className="flex flex-row gap-2">
          {props.walletAddress && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={"info"}>
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
                    <Badge className="text-text-weakest">
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
    </>
  );
};
