import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { db } from "@shared/db";
import WorkspaceLayoutWrapper from "./layout-wrapper";
import { createCaller } from "@/lib/trpc/createCaller";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceId: string;
    boardId?: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin Panel",
  description: "Admins are allowed to access this page and manage the site.",
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

  console.log("userOwns", worksapce.boards);
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
