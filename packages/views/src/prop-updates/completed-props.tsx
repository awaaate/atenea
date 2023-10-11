import React from "react";
import { Avatar } from "@shared/ui/src/avatar";
import { API_URL } from "@shared/editor/src/constants";
import { Link } from "@shared/ui/src/link";
import { Separator } from "@shared/ui/src/separator";
import { Badge } from "@shared/ui/src/badge";
import {cn} from "@shared/ui/src/utils";

export interface CompletedPropCardProps {
  title: string;
  id: number;
  proposer: string;
}

export interface CompletedPropsListProps {
  props: CompletedPropCardProps[];
};


export const CompletedPropCard: React.FC<CompletedPropCardProps> = (proposal) => {
  return (
    <Link href={`/prop/${proposal.id}`} target="_blank" rel="noreferrer">
      <div
        className={cn(
          "grid md:grid-cols-6  gap-4 py-4 px-6 hover:bg-active-default grid-cols-1 ",
        )}
      >
        <div className="flex col-span-5 gap-2 flex-wrap">
          <Avatar
            className="icon-xl rounded-full"
            name={proposal.title}
            src={`${API_URL}/account/${proposal.proposer}`}
          />
          <div>
            <p className="text-text-weaker text-sm">
              Prop <span className="font-bold mr-1">{proposal.id}</span>
              by {proposal.proposer.slice(0, 6)}...
              {proposal.proposer.slice(-4)}
            </p>
            <p>{proposal.title}</p>
          </div>
        </div>
        <div className="flex justify-end flex-col items-end gap-2">
          <Badge
            className="text-sm"
            variant={"success"}
          >
            COMPLETED
          </Badge>
        </div>
      </div>
    </Link>

  )

}

export const CompletedPropsList: React.FC<CompletedPropsListProps> = ({ props }) => {
  return (
    <div className="flex flex-col space-y-2 rounded-default border">
      {props.map((prop, idx) => {
        return <>
          <CompletedPropCard {...prop} key={prop.id} />

          {idx !== props.length - 1 && <Separator />}
        </>
      })}
    </div>
  )
}

