import { BoardInitializer } from "@/components/board/board-initialitzer";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { EditorState } from "@shared/editor/src/engine/interfaces";
import { notFound } from "next/navigation";
import { BoardPreviewButton } from "./board-preview-button";
import { BoardPage } from "@shared/templates/src/pages/board";

export default async function Page({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const session = await getSession();
  const caller = createCaller(session.user);

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
    editable: true,
  };
  return (
    <>
      <BoardPage />
      <BoardPreviewButton />
      <BoardInitializer {...intialState} />
    </>
  );
}
