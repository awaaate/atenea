import { Avatar, Icon, Skeleton } from "@shared/ui";
import React from "react";
import {
  BoardsTab,
  BoardsTabList,
  BoardsTabTrigger,
  BoardsTabContent,
} from "../boards-tab";
interface WorkspacePreviewProps {
  name: string;
}

export const WorkspacePreview: React.FC<WorkspacePreviewProps> = ({ name }) => {
  return (
    <div className="bg-accent text-text-on-accent">
      <div className=" w-full max-w-[100%-50px] m-auto justify-between p-2 ">
        <div className="flex items-center gap-2">
          <Avatar name={name} size="sm" />
          {name}
        </div>
      </div>
      <BoardsTab value="1" className="bg-black/30">
        <BoardsTabList>
          <BoardsTabTrigger value="1" className="">
            <Icon name="LayoutDashboard" className="mr-2 text-current" />
            <span className="">Board 1</span>
          </BoardsTabTrigger>
          <BoardsTabTrigger value="2" className="">
            <Icon name="LayoutDashboard" className="mr-2 text-current" />
            <span className="">Board 1</span>
          </BoardsTabTrigger>
          <BoardsTabTrigger value="" className="">
            <Icon name="LayoutDashboard" className="mr-2 text-current" />
            <span className="">Board 1</span>
          </BoardsTabTrigger>
        </BoardsTabList>
        <BoardsTabContent
          value={"1"}
          className="w-full h-full flex flex-col p-4 bg-background-default  gap-2"
        >
          <Skeleton type="text" className="animate-none" />
          <Skeleton
            type="text"
            className="animate-none max-w-[calc(100%-20px)]"
          />
          <Skeleton
            type="text"
            className="animate-none max-w-[calc(100%-10px)]"
          />
          <div className="flex gap-4 mt-2">
            <Skeleton type="rect" className="animate-none max-w-[calc(50%)]" />
            <Skeleton type="rect" className="animate-none max-w-[calc(50%)]" />
          </div>
          <Skeleton
            type="text"
            className="animate-none max-w-[calc(100%-20px)]"
          />
          <Skeleton
            type="text"
            className="animate-none max-w-[calc(20%-20px)]"
          />
        </BoardsTabContent>
      </BoardsTab>
    </div>
  );
};
