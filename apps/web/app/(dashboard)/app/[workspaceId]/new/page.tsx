import { getSession } from "@/lib/auth/getSession";
import { trpc } from "@/lib/trpc";
import { createCaller } from "@/lib/trpc/createCaller";
import { StartFromScratch } from "./start-from-scratch";
import { StartFromTemplate } from "./start-from-template";
import { WorkspaceTobar } from "@shared/templates/src/components/workspace-topbar";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import { ScrollArea } from "@shared/ui/src/scroll-area";

export default async function NewBoardPage() {
  const session = await getSession();
  const templates = (await createCaller(
    session.user
  ).boardTemplate.getAll()) as any;

  return (
    <>
      <div className="w-full h-full">
        <WorkspaceTobar />
        <ScrollArea className="h-full justify-center">
          <div className="flex flex-wrap w-full mx-auto gap-8 h-full px-6 pb-16 pt-8">
            <StartFromScratch />
            <StartFromTemplate templates={templates} />
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
