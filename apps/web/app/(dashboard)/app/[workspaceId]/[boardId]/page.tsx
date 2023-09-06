import { BoardInitializer } from "@/components/board/board-initialitzer";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { EditorState } from "@shared/editor/src/engine/interfaces";
import { notFound } from "next/navigation";
import { BoardPreviewButton } from "./board-preview-button";
export const runtime = "edge";
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

  let intialEditorState: Partial<EditorState> = {
    boardId: board.id,
    nodes: board.draft ? (board.draft as any).nodes : {},
    coverImage: board.coverImage,
    pageBackground: board.background,
    title: board.name,
  };
  return (
    <>
      <BoardInitializer {...intialEditorState} />
      <BoardPreviewButton />
    </>
  );
}
