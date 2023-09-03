import { createCaller } from "@/lib/trpc/createCaller";
import { notFound } from "next/navigation";
import { BoardWrapper } from "@/components/board";

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

  return (
    <BoardWrapper
      title={board.name}
      background={board.background}
      content={board.draft as any}
      id={board.id}
      editable={false}
    />
  );
};

export default BoardView;
