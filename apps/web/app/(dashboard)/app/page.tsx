import { getSession } from "@/lib/auth/getSession";
import { createCaller } from "@/lib/trpc/createCaller";
import { redirect } from "next/navigation";
import { WorkspacesPageWrapper } from "./workspaces-page-wrapper";
export default async function Page() {
  const session = await getSession();

  if (!session) return redirect("/sign-in");
  const caller = createCaller(session.user);

  const workspaces = await caller.worksapce.getAll();

  return (
    <>
      <WorkspacesPageWrapper workspaces={workspaces} />
    </>
  );
}
