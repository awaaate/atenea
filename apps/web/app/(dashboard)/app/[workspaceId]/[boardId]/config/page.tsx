import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { notFound } from "next/navigation";

async function BoardConfigPage({
  params,
}: {
  params: {
    boardId: string;
    workspaceId: string;
  };
}) {
  const session = await getSession();
  const caller = createCaller(session.user);

  const board = await caller.boards.get({
    id: params.boardId,
  });

  if (!board) return notFound();

  return (
    <div>
      <h1>Board Config</h1>
      <pre>{JSON.stringify(board, null, 2)}</pre>
    </div>
  );
}

export default BoardConfigPage;
