import React from "react";
import { BoardsList } from "../../components/sideboard-boards-nav/sidebar-boards-nav";

import { Icon, Link } from "@shared/ui";

import {
  BoardsTab,
  BoardsTabContent,
  BoardsTabList,
  BoardsTabTrigger,
} from "../../components/boards-tab/board-tab";

interface DashboardLayout {
  children: React.ReactNode;
  boards: BoardsList;
  siteId: string;
  currentBoardId: string;
}

const BoardLayout: React.FC<DashboardLayout> = ({
  children,
  boards,
  siteId,
  currentBoardId,
}) => {
  return (
    <>
      <BoardsTab>
        <BoardsTabList>
          {boards.map((board) => (
            <BoardsTabTrigger
              key={board.id}
              value={board.id}
              className="text-text-weak"
              asChild
            >
              <Link href={`/app/${siteId}/${board.id}`}>
                <Icon name="LayoutDashboard" className="mr-2 text-current" />
                <span className="">{board.name}</span>
              </Link>
            </BoardsTabTrigger>
          ))}

          <BoardsTabTrigger value="create" className="text-text-weak">
            <Icon name="Plus" className="mr-2 text-current" />
            <span className="">Create Board</span>
          </BoardsTabTrigger>
        </BoardsTabList>
        <BoardsTabContent value={currentBoardId}>{children}</BoardsTabContent>
      </BoardsTab>
      {children}
    </>
  );
};

export { BoardLayout };
