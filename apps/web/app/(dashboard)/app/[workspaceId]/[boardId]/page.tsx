import { createCaller } from "@/lib/trpc/createCaller";
import { notFound } from "next/navigation";
import { BoardWrapper } from "@/components/board";
import { getSession } from "@/lib/auth/getSession";

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

  return (
    <BoardWrapper
      title={board.name}
      background={board.background}
      content={board.draft as any}
      editable={true}
      id={board.id}
    />
  );
}
