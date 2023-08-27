import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  BoardsTab,
  BoardsTabContent,
  BoardsTabList,
  BoardsTabTrigger,
} from "@shared/templates";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { Link, Icon, useForm } from "@shared/ui";

import { db } from "@/lib/db";
import WorkspaceForm from "@shared/templates/src/components/workspace-form/workspace-form";
import { UpdateWorspaceForm } from "./update-form";
import CreateBoardButton from "./create-board-button";

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

export default async function Workspace({
  children,
  params,
}: AdminLayoutProps) {
  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */

  const workspace = await db.site.findFirst({
    where: { id: params.siteId },
    include: {
      boards: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (!workspace) notFound();

  return (
    <div>
      <BoardsTab value={"home"}>
        <BoardsTabList>
          <BoardsTabTrigger value="home" className="text-text-weak">
            <Icon name="Home" className="mr-2 text-current" />
            <span className="">Home</span>
          </BoardsTabTrigger>
          {workspace?.boards.map((board) => (
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
        <BoardsTabContent value={"home"}>
          {children}
          <UpdateWorspaceForm
            accentColor="default"
            description={workspace.description || ""}
            name={workspace.name || ""}
            subdomain={workspace.subdomain || ""}
          />
        </BoardsTabContent>
      </BoardsTab>
    </div>
  );
}
