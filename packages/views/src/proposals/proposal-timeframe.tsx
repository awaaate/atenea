import { date } from "@shared/ui/src/date";
import { cn } from "@shared/ui/src/utils";
import { useEffect, useRef, useState } from "react";
export function ProposalTimeFrameView({
  time,
  status,
}: {
  time: Date;
  status: string;
}) {
  const color =
    status === "Succeeded"
      ? "bg-green-500/20"
      : status === "Defeated"
      ? "bg-red-500/20"
      : "bg-yellow-500/20";
  const itsPast = time.getTime() < Date.now();
  return (
    <div
      className={cn(
        "flex w-full justify-center items-center  py-2 min-h-[100px]",
        color
      )}
    >
      {status === "Cancelled" ? (
        <p className="text-xl font-semibold">Canceled</p>
      ) : (
        <div>
          {itsPast ? (
            <p className="text-xl font-semibold">{date(time).fromNow()}</p>
          ) : (
            <Counter date={time} />
          )}{" "}
        </div>
      )}
    </div>
  );
}
//the counter component should start a countdown if the time it's in the future

const remainingTime = (timeDate: Date) => {
  return new Date(timeDate.getTime() - Date.now());
};

const Counter = ({ date }: { date: Date }) => {
  const [time, setTime] = useState(remainingTime(date));
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(remainingTime(date));
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [date]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold">{hours}</p>
        <p className="text-text-weaker">Hours</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold">{minutes}</p>
        <p className="text-text-weaker">Minutes</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold">{seconds}</p>
        <p className="text-text-weaker">Seconds</p>
      </div>
    </div>
  );
};
