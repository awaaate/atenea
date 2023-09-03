import { Metadata } from "next";

import { env } from "@/env.mjs";


interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Board view",
  description: "Admins are allowed to access this page and manage the site.",
};

export default async function BoardView({
  children,
  params,
}: AdminLayoutProps) {
  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  /*   const caller = //createCaller();
  const { boards, workspaceId } = await caller.boards.getSiblingBoards({
    id: params.boardId,
  });

  if (!workspaceId) notFound(); */

  return <div>{children}</div>;
}
