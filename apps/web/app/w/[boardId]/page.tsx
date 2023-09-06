import { createCaller } from "@/lib/trpc/createCaller";
import { notFound } from "next/navigation";
import { BoardInitializer } from "@/components/board/board-initialitzer";
import { BoardPage } from "@shared/templates/src/pages/board";
import { EditorState } from "@shared/editor/src/engine/interfaces";

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

  let editorState = {
    boardId: board.id,
    nodes: board.draft ? (board.draft as any).nodes : {},
    coverImage: board.coverImage,
    pageBackground: board.background,
    title: board.name,
  };

  return (
    <>
      <BoardPage />
      <BoardInitializer {...editorState} />
    </>
  );
};

export default BoardView;
