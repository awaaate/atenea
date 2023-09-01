import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";

import { env } from "@/env.mjs";
import {
  BoardsTab,
  BoardsTabContent,
  BoardsTabList,
  BoardsTabTrigger,
} from "@shared/templates";
import { Icon, Link } from "@shared/ui";

import { CreateBoardButton } from "./create-board-button";
import { UpdateWorspaceForm } from "./update-form";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin Panel",
  description: "Admins are allowed to access this page and manage the site.",
};

export default async function Workspace({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await getSession();

  const caller = createCaller(session.user);

  const workspace = await caller.worksapce.getWorkspaceBoards({
    id: params.workspaceId,
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
              <Link href={`/app/${params.workspaceId}/${board.id}`}>
                <Icon name="LayoutDashboard" className="mr-2 text-current" />
                <span className="">{board.name}</span>
              </Link>
            </BoardsTabTrigger>
          ))}

          <BoardsTabTrigger
            value="create"
            className="text-text-weak flex items-center"
          >
            <CreateBoardButton />
          </BoardsTabTrigger>
        </BoardsTabList>
        <BoardsTabContent value={"home"}>
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
