import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { WorkspaceTobar } from "@shared/templates/src/components/workspace-topbar";
import { notFound } from "next/navigation";
import { BoardConfigForm } from "./board-config-form";

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
    <div className="w-full">
      <WorkspaceTobar />

      <BoardConfigForm {...board} />
    </div>
  );
}

export default BoardConfigPage;
