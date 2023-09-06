import { Skeleton } from "@shared/ui/src/skeleton";

export const LoadingText = (
  <div className="w-full h-full flex flex-col gap-2 p-4">
    <Skeleton className="w-[calc(100%-0.5rem)]" />
    <Skeleton className="w-[calc(100%-0.25rem)]" />
    <Skeleton className="w-[calc(100%-0.4rem)]" />
    <Skeleton className="w-[calc(100%-0.3rem)]" />
  </div>
);
