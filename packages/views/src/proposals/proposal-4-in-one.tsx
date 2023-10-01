import { Badge } from "@shared/ui/src/badge";
import { date } from "@shared/ui/src/date";
import { Icon } from "@shared/ui/src/icon";
import { cn } from "@shared/ui/src/utils";

const EthIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 784.37 1277.39"
      className="icon-m"
    >
      <g fillRule="nonzero">
        <path
          fill="#343434"
          d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
        />
        <path fill="#8C8C8C" d="M392.07 0 0 650.54l392.07 231.75V472.33z" />
        <path
          fill="#3C3C3B"
          d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
        />
        <path fill="#8C8C8C" d="M392.07 1277.38V956.52L0 724.89z" />
        <path fill="#141414" d="m392.07 882.29 392.06-231.75-392.06-178.21z" />
        <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z" />
      </g>
    </svg>
  );
};
export interface Prposal4inOneViewProps {
  forVotes: number;
  againstVotes: number;
  status: string;
  categories: string[];
  budgetRequested: string;
  endDate: Date;
  startDate: Date;
  teamMembers: number;
}
export const Proposal4InOneView: React.FC<Prposal4inOneViewProps> = (props) => {
  const { categories, teamMembers } = props;
  return (
    <div className="flex flex-wrap gap-4 px-4  rounded-default ">
      <Card title="Categories" icon={<Icon name="FileText" />}>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => {
            return <Badge>{category}</Badge>;
          })}
        </div>
      </Card>
      <Card title="Team Members" icon={<Icon name="Users" />}>
        <p className="text-sm font-medium ">{teamMembers}</p>
      </Card>
      <Card title="Budget Requested" icon={<EthIcon />}>
        <p className="text-sm font-medium ">{props.budgetRequested}</p>
      </Card>
      <TimeCard endDate={props.endDate} startDate={props.startDate} />
    </div>
  );
};

const TimeCard: React.FC<{
  endDate: Date;
  startDate: Date;
}> = ({ endDate, startDate }) => {
  const currentTime = new Date();

  if (currentTime > endDate) {
    return (
      <Card title="Time" icon={<Icon name="Clock" />}>
        <p className="text-sm font-medium ">Ended {date(endDate).fromNow()}</p>
      </Card>
    );
  }
  if (currentTime < startDate) {
    return (
      <Card title="Time" icon={<Icon name="Clock" />}>
        <p className="text-sm font-medium ">Starts {date(endDate).fromNow()}</p>
      </Card>
    );
  }
  return null;
};
export const Card: React.FC<{
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  iconClassName?: string;
}> = ({ children, title, icon, iconClassName }) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 border shadow-card rounded-default bg-surface-default min-w-[150px] flex-1">
      <p className="text-sm font-medium text-text-weaker">{title}</p>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "icon-xl rounded-full bg-accent/20  grid place-content-center",
            iconClassName
          )}
        >
          {icon}
        </span>
        <div className="ml-2">{children}</div>
      </div>
    </div>
  );
};
