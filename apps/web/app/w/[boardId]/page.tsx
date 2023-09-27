import { BoardInitializer } from "@/components/board/board-initialitzer";
import { createCaller } from "@/lib/trpc/createCaller";
import { BoardPage } from "@shared/templates/src/pages/board";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
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
    coverImageEnabled: board.coverImageEnabled,
    pageBackground: board.background,
    title: board.name,
    editable: false,
  };

  return (
    <>
      <BoardPage />
      <BoardInitializer {...intialState} />
      <Button className="fixed bottom-0 right-0 m-2">
        <a href={`/remix/${params.boardId}`}>
          Make yours this client
          <Icon name="Sparkle" className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </>
  );
};

export default BoardView;
