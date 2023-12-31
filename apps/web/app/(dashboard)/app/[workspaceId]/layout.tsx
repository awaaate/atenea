import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import WorkspaceLayoutWrapper from "./layout-wrapper";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceId: string;
    boardId?: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Workspace Admin",
  description: "Workspace mangement",
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const caller = createCaller(session.user);
  const workspaces = await caller.worksapce.getUserWorkspaces();
  const worksapce = await caller.worksapce.getWorkspaceBoards({
    id: params.workspaceId,
  });
  //check if the current workspace is in the user's workspace list
  const userOwns = workspaces.findIndex(
    (workspace) => workspace.id === params.workspaceId
  );

  if (userOwns === -1) {
    //TODO: improve this
    return notFound();
  }
  return (
    <WorkspaceLayoutWrapper
      workspaceId={params.workspaceId}
      workspaces={workspaces}
      boards={worksapce.boards}
    >
      {children}
    </WorkspaceLayoutWrapper>
  );
}
