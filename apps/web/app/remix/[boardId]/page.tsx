import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { notFound, redirect } from "next/navigation";
import { BringToWorkspaceButton } from "./bring-to-workspace-button";
import { Link } from "@shared/ui/src/link";
interface RemixBoardPageProps {
  params: {
    boardId: string;
  };
}
export default async function RemixBoardPage({ params }: RemixBoardPageProps) {
  const session = await getSession();

  if (!session) {
    redirect(`/sign-in?next=/remix/${params.boardId}`);
  }
  const workspaces = await createCaller(
    session.user
  ).worksapce.getUserWorkspaces();

  if (!workspaces.length)
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-surface-lowered">
        <div
          className="rounded-default shadow-card bg-surface-default w-full p-4"
          style={{
            maxWidth: 300,
          }}
        >
          <p className="text-text-weaker">You don't have any workspaces</p>
          <Link href="/app">Create a workspace</Link>
        </div>
      </div>
    );

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-surface-lowered">
      <div
        className="flex flex-col gap-2 rounded-default shadow-card bg-surface-default w-full p-4"
        style={{
          maxWidth: 300,
        }}
      >
        {workspaces.map((workspace) => (
          <BringToWorkspaceButton
            workspaceId={workspace.id}
            workspaceName={workspace.name}
            boardId={params.boardId}
          />
        ))}
      </div>
    </div>
  );
}
