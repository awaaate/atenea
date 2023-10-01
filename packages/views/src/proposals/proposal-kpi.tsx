import { Icon } from "@shared/ui/src/icon";
import { Card } from "./proposal-4-in-one";

export const ProposalKPIView: React.FC<{
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
}> = ({ forVotes, againstVotes, abstainVotes }) => {
  return (
    <div className="flex flex-wrap gap-4 px-4  rounded-default ">
      <Card
        title="Votes For"
        icon={<Icon name="ThumbsUp" />}
        iconClassName="bg-status-success text-status-success-weak"
      >
        <p className="text-sm font-medium ">{forVotes}</p>
      </Card>
      <Card
        title="Votes Against"
        icon={<Icon name="ThumbsDown" />}
        iconClassName="bg-status-danger text-status-danger-weak"
      >
        <p className="text-sm font-medium ">{againstVotes}</p>
      </Card>
      <Card title="Abstain" icon={<Icon name="Ban" />}>
        <p className="text-sm font-medium  ">{abstainVotes}</p>
      </Card>
      <Card
        title="Total Votes"
        icon={<Icon name="Users" />}
        iconClassName="bg-status-info text-status-info-weak"
      >
        <p className="text-sm font-medium ">
          {forVotes + againstVotes + abstainVotes}
        </p>
      </Card>
    </div>
  );
};
