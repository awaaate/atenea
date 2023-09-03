import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";

import { env } from "@/env.mjs";

import { WorkspaceTobar } from "@shared/templates/src/components/workspace-topbar";

import { UpdateWorspaceForm } from "./update-form";
import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { WorkspacePageProvider } from "./page-provider";
import { ScrollArea } from "@shared/ui/src/scroll-area";

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
    <ScrollArea className="w-full h-screen flex flex-col">
      <WorkspaceTobar />
      <div className="p-8">
        <UpdateWorspaceForm
          accentColor="default"
          description={workspace.description || ""}
          name={workspace.name || ""}
          subdomain={workspace.subdomain || ""}
        />
      </div>
      <WorkspacePageProvider
        title={workspace.name || ""}
        description={workspace.description || ""}
      />
    </ScrollArea>
  );
}
