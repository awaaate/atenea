"use client";

import React from "react";
import { BoardsTabTrigger } from "@shared/templates";
import { Icon, Link } from "@shared/ui";
import { useEditorStore } from "@shared/editor";

interface BoardsListProps {
  boards: {
    id: string;
    name: string;
  }[];
  workspaceId?: string;
  currentBoardId: string;
}
const BoardsList: React.FC<BoardsListProps> = ({
  boards,
  currentBoardId,
  workspaceId,
}) => {
  const title = useEditorStore.use.title();
  return (
    <>
      {boards.map((b) => {
        if (b.id === currentBoardId)
          return (
            <BoardsTabTrigger
              key={b.id}
              value={b.id}
              className="text-text-weak"
              asChild
            >
              <input type="text" value={title} />
            </BoardsTabTrigger>
          );
        return (
          <BoardsTabTrigger
            key={b.id}
            value={b.id}
            className="text-text-weak"
            asChild
          >
            <Link
              href={workspaceId ? `/app/${workspaceId}/${b.id}` : `/${b.id}`}
            >
              <Icon name="LayoutDashboard" className="mr-2 text-current" />
              <span className="">{b.name}</span>
            </Link>
          </BoardsTabTrigger>
        );
      })}
    </>
  );
};

export default BoardsList;
