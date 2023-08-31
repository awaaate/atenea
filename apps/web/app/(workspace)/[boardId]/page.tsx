import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { BoardPage } from "@shared/templates";
import { notFound } from "next/navigation";
import { Board } from "../../../components/board/board";

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

  return (
    <Board
      title={board.name}
      background={board.background}
      content={board.draft as any}
      id={board.id}
      editable={false}
    />
  );
};

export default BoardView;
