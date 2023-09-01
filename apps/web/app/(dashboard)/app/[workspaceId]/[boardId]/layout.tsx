import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  BoardsTab,
  BoardsTabContent,
  BoardsTabList,
  BoardsTabTrigger,
} from "@shared/templates";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { Link, Icon } from "@shared/ui";

import { CreateBoardButton } from "../create-board-button";
import BoardsList from "./board-list";
import { db } from "@shared/db";
import { createCaller } from "@/lib/trpc/createCaller";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceId: string;
    boardId: string;
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

  const { boards } = await caller.boards.getSiblingBoards({
    id: params.boardId,
  });

  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  return (
    <div>
      <BoardsTab value={params.boardId}>
        <BoardsTabList>
          <BoardsTabTrigger value="home" className="text-text-weak">
            <Link href={`/app/${params.workspaceId}`}>
              <Icon name="Home" className="mr-2 text-current" />
              <span className="">Home</span>
            </Link>
          </BoardsTabTrigger>
          <BoardsList
            workspaceId={params.workspaceId}
            boards={boards}
            currentBoardId={params.boardId}
          />
          <BoardsTabTrigger
            value="create"
            className="text-text-weak flex items-center"
          >
            <CreateBoardButton />
          </BoardsTabTrigger>
        </BoardsTabList>
        <BoardsTabContent value={params.boardId}>{children}</BoardsTabContent>
      </BoardsTab>
    </div>
  );
}
