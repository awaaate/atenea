import { BoardInitializer } from "@/components/board/board-initialitzer";
import { createCaller } from "@/lib/trpc/createCaller";
import { BoardPage } from "@shared/templates/src/pages/board";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface BoardViewProps {
  params: {
    boardId: string;
  };
}

const BoardView = async ({ params }: BoardViewProps) => {
  const caller = createCaller();

  const board = await caller.boards.get({
    id: params.boardId,
  });

  if (!board) return notFound();

  let intialState = {
    boardId: board.id,
    nodes: board.draft ? (board.draft as any).nodes : {},
    coverImage: board.coverImage,
    pageBackground: board.background,
    title: board.name,
    editable: false,
  };

  return (
    <>
      <BoardPage />
      <BoardInitializer {...intialState} />
    </>
  );
};

export default BoardView;
