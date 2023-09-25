import { useNode } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";

import { Badge } from "@shared/ui/src/badge";
import { Avatar } from "@shared/ui/src/avatar";
import { API_URL } from "@shared/editor/src/constants";
import { date } from "@shared/ui/src/date";
import { Icon } from "@shared/ui/src/icon";

interface ProposalTableProps {
  title: string;
  nounId?: number;
  status: string;
  id: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  budget: number;
  budgetEth?: number;
  budgetUsd?: number;
  noun?: string;
  categories: string[];
  startAt: Date;
  endAt: Date;
}

export const ProposalTable: React.FC<{
  data: ProposalTableProps[];
}> = ({ data }) => {
  const headerMap = useNode((node) => node.data.props.headerMap) as Record<
    string,
    string
  >;
  console.log("THis jOse", data);

  const headers = Object.keys(headerMap) as (keyof ProposalTableProps)[];

  return (
    <div className="border rounded-lg w-full  mx-auto bg-surface-default shadow-card">
      {/* HEADER */}
      {/*       <div
        className={"grid justify-start w-full "}
        style={{
          gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
        }}
      >
        {headers.map((header) => (
          <div
            key={header as string}
            className="flex items-center justify-center"
          >
            {headerMap[header]}
          </div>
        ))}
      </div> */}
      {data.map((proposal, i) => (
        <a
          href={`https://nouns.wtf/vote/${proposal.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              "grid grid-cols-8  gap-4 py-4 px-6 hover:bg-active-default",
              {
                "border-b": i !== data.length - 1,
              }
            )}
          >
            <div className="flex col-span-5 gap-2">
              <Avatar
                className="icon-xl rounded-full"
                name={proposal.title}
                src={`${API_URL}/noun-image/${proposal.nounId}`}
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
              <p className="text-text-weaker text-sm">Status</p>
              <Badge
                className="text-sm"
                variant={
                  proposal.status === "Pending"
                    ? "info"
                    : proposal.status === "Succeeded"
                    ? "success"
                    : proposal.status === "Canceled" ||
                      proposal.status === "Defeated"
                    ? "danger"
                    : "warning"
                }
              >
                {proposal.status}
              </Badge>
            </div>
            <div className="flex justify-end flex-col items-end gap-2">
              <RequestingCell
                budget={proposal.budget}
                budgetEth={proposal.budgetEth}
                budetUsd={proposal.budgetUsd}
              />
            </div>

            <div className="flex justify-end  flex-col items-end gap-2">
              <VotingCell
                startAt={proposal.startAt}
                endAt={proposal.endAt}
                votesAgainst={proposal.votesAgainst}
                votesFor={proposal.votesFor}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
const RequestingCell: React.FC<{
  budget: number;
  budgetEth?: number;
  budetUsd?: number;
  noun?: number;
}> = ({ budget, budgetEth, budetUsd }) => {
  if (budetUsd)
    return (
      <>
        <p className="text-text-weaker text-sm">Requesting</p>
        <p className="text-m">
          {budetUsd.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </>
    );
  const finalBudget = budgetEth || budget;
  return (
    <>
      <p className="text-text-weaker text-sm">Requesting</p>
      <p className="text-m whitespace-nowrap ">
        {finalBudget.toLocaleString("en-US", {
          currency: "ETH",
          currencyDisplay: "symbol",
        }) + " ETH"}
      </p>
    </>
  );
};
const VotingCell: React.FC<{
  startAt: Date;
  endAt: Date;
  votesFor: number;
  votesAgainst: number;
}> = ({ startAt, endAt, votesAgainst, votesFor }) => {
  if (!startAt || !endAt) return null;

  //check if it's now between start and end
  const now = new Date();
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (now > start && now < end) {
    return (
      <>
        <p>Voting</p>
        <p className="text-sm text-text-weaker">
          Ended {date(startAt).fromNow()}
        </p>
      </>
    );
  } else if (now < start) {
    return (
      <>
        <p>Voting</p>
        <p className="text-sm text-text-weaker">
          Starts {date(startAt).fromNow()}
        </p>
      </>
    );
  } else if (now > end) {
    return (
      <>
        <p className="text-sm text-text-weaker text-right ">
          Voting ended {date(endAt).fromNow()}
        </p>
        <div className="flex gap-2">
          <span className="flex items-center  gap-1 text-status-success">
            {votesFor} <Icon name="ThumbsUp" />
          </span>
          <span className="flex items-center  gap-1 text-status-danger">
            {votesAgainst} <Icon name="ThumbsDown" />
          </span>
        </div>
      </>
    );
  }
};
