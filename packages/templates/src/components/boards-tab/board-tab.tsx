import { Tabs, TabsList, TabsTrigger, cn, TabsContent } from "@shared/ui";
import { forwardRef } from "react";

export const BoardsTabContent = forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent>
>(({ className, ...props }, ref) => (
  <TabsContent
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0",
      className
    )}
    {...props}
  />
));

export const BoardsTabList = forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn(
      "border-0 bg-accent/30   m-0  overflow-hidden h-[50px] items-end ",
      className
    )}
    {...props}
  />
));

export const BoardsTabTrigger = forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      "border-0 text-lg py-2 px-4 rounded-t-default text-text-on-accent  data-[state=active]:text-accent data-[state=active]:bg-background-default  ",
      className
    )}
    {...props}
  />
));

export const BoardsTab = forwardRef<
  React.ElementRef<typeof Tabs>,
  React.ComponentPropsWithoutRef<typeof Tabs>
>(({ className, ...props }, ref) => (
  <Tabs
    ref={ref}
    className={cn("flex flex-col overflow-hidden flex-1  p-0 m-0", className)}
    {...props}
  />
));
