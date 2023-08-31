import { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/env.mjs";
import {
  BoardsTab,
  BoardsTabContent,
  BoardsTabList,
  BoardsTabTrigger,
} from "@shared/templates";
import { Icon, Link } from "@shared/ui";

import { createCaller } from "@/lib/trpc/createCaller";

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
  const caller = createCaller();
  const board = await caller.boards.getSiblingBoards({
    id: params.boardId,
  });

  if (!board) notFound();

  return (
    <div>
      <BoardsTab value={params.boardId}>
        <BoardsTabList className="bg-accent">
          {board.workspace.boards.map((b) => (
            <BoardsTabTrigger
              key={b.id}
              value={b.id}
              className="text-text-weak"
              asChild
            >
              <Link href={`/${b.id}`}>
                <Icon name="LayoutDashboard" className="mr-2 text-current" />
                <span className="">{b.name}</span>
              </Link>
            </BoardsTabTrigger>
          ))}
        </BoardsTabList>
        <BoardsTabContent value={params.boardId}>{children}</BoardsTabContent>
      </BoardsTab>
    </div>
  );
}
