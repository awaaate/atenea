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

import { db } from "@/lib/db";
import CreateBoardButton from "../create-board-button";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    siteId: string;
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

  const boards = await db.board.findMany({
    where: {
      siteId: params.siteId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  return (
    <div>
      <BoardsTab value={params.boardId}>
        <BoardsTabList>
          <BoardsTabTrigger value="home" className="text-text-weak">
            <Link href={`/app/${params.siteId}`}>
              <Icon name="Home" className="mr-2 text-current" />
              <span className="">Home</span>
            </Link>
          </BoardsTabTrigger>
          {boards.map((board) => (
            <BoardsTabTrigger
              key={board.id}
              value={board.id}
              className="text-text-weak"
              asChild
            >
              <Link href={`/app/${params.siteId}/${board.id}`}>
                <Icon name="LayoutDashboard" className="mr-2 text-current" />
                <span className="">{board.name}</span>
              </Link>
            </BoardsTabTrigger>
          ))}

          <BoardsTabTrigger value="create" className="text-text-weak">
            <CreateBoardButton />
          </BoardsTabTrigger>
        </BoardsTabList>
        <BoardsTabContent value={params.boardId}>{children}</BoardsTabContent>
      </BoardsTab>
    </div>
  );
}
