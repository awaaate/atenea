import { Skeleton } from "@shared/ui/src/skeleton";

export const BAR_CHART_SKELETON = (
  <div className="flex gap-2 w-full h-full min-h-[200px] items-end pt-4  ">
    <Skeleton className="h-[calc(50%-0.23rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.20rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%-0.40rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%-0.23rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+1rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.7rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.7rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.7rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.4rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.4rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.4rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.4rem)] min-h-[200px] w-full rounded-default" />
    <Skeleton className="h-[calc(50%+0.4rem)] min-h-[200px] w-full rounded-default" />
  </div>
);
