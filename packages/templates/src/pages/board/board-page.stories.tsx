import { mockPageData } from "../../data";
import { BoardLayout } from "../../layouts/baord-layout";
import { WorkspaceLayout } from "../../layouts/workspace-layout";
import { BoardPage } from "./board-page";

export default {
  title: "Dashboard/Board Page",
  component: BoardPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = () => {
  return (
    <WorkspaceLayout {...mockPageData} onSignout={() => {}}>
      <BoardLayout
        boards={mockPageData.boards}
        siteId={mockPageData.siteId}
        currentBoardId={mockPageData.boards[0].id}
      >
        <BoardPage />
      </BoardLayout>
    </WorkspaceLayout>
  );
};
