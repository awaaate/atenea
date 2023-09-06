import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { useSession } from "next-auth/react";
import { WorkspacesPage } from "@shared/templates/src/pages/workspaces";

export default async function Page() {
  const session = await getSession();
  const caller = createCaller(session.user);

  const workspaces = await caller.worksapce.getAll();
  return (
    <>
      <WorkspacesPage
        workspaces={workspaces.map((w) => ({
          id: w.id,
          title: w.name,
          description: w.description,
          accentColor: w.accentColor,
        }))}
      />
    </>
  );
}
