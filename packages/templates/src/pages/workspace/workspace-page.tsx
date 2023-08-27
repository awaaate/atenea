import { Link, Icon } from "@shared/ui";
import React from "react";
import {
  BoardsTab,
  BoardsTabList,
  BoardsTabTrigger,
  BoardsTabContent,
} from "../..";
import { BoardsList } from "../../components/sideboard-boards-nav/sidebar-boards-nav";
interface WorkspacePageProps {
  children: React.ReactNode;
  boards: BoardsList;
  siteId: string;
}
export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  children,
  boards,
  siteId,
}) => {
  return (
    <BoardsTab value="home">
      <BoardsTabList>
        <BoardsTabTrigger
          key={"home"}
          value={"home"}
          className="text-text-weak"
          asChild
        >
          <Link href={`/app/${siteId}`}>
            <Icon name="Home" className="mr-2 text-current" />
            <span className="">Home</span>
          </Link>
        </BoardsTabTrigger>
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
      <BoardsTabContent value={"home"}>{children}</BoardsTabContent>
    </BoardsTab>
  );
};
