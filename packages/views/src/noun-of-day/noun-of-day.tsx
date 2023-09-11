import { Icon } from "@shared/ui/src/icon";
import { date } from "@shared/ui/src/date";
import { useEffect, useRef, useState } from "react";

interface NounOfDayProps {
  image: string;
  currentBid: number;
  endTime: Date;
  id: number;
}
const getRemainingTime = (endTime: Date) => {
  return date(endTime.getTime() - Date.now()).format("hh:mm:ss");
};
export const NounOfDay: React.FC<NounOfDayProps> = ({
  image,
  currentBid,
  endTime,
  id,
}) => {
  return (
    <>
      <div
        className="w-full flex item-center justify-center p-2  "
        style={{
          background: "#e1d7d5",
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            width: "320px",
            height: "320px",
          }}
        />
      </div>

      <section className="bg-surface-raised relative top-[-20px] p-2 m-1 rounded-lg">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-semibold">Noun #{id}</h4>
          <Icon name="ExternalLink" className="mr-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center ">
            <Icon size="l" name="CalendarClock" className="mr-2" />
            <div>
              <RemainTimeCounter endTime={endTime} />
              <p className="text-text-weaker">Remaining</p>
            </div>
          </div>
          <div className="flex items-center ">
            <Icon size="l" name="Trophy" className="mr-2" />
            <div>
              <p className="text-lg font-semibold">{currentBid} ETH</p>
              <p className="text-text-weaker">Current Bid</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const RemainTimeCounter: React.FC<{ endTime: Date }> = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime(endTime));
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime(endTime));
    }, 100);
    return () => clearInterval(interval);
  }, [endTime]);
  return <p className="text-lg font-semibold">{remainingTime}</p>;
};
