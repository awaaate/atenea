"use client";
import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { useToast } from "@shared/ui/src/toast";
import { useParams, useRouter } from "next/navigation";

export const DeleteWorkspaceSection = () => {
  const { workspaceId } = useParams();
  const { toast } = useToast();
  const { isLoading, mutateAsync } =
    trpc.worksapce.deleteWorkspace.useMutation();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: workspaceId as string });
      toast({
        title: "Workspace deleted",
        description: "Workspace has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/app`);
    } catch (e) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex p-6 rounded-default mt-8 border rounded-def">
      <div className="flex flex-col justify-center items-start w-5/6  rounded-r-default">
        <div className="text-status-danger text-md font-semibold">
          Delete workspace
        </div>
        <div className="text-text-weaker text-sm">
          Delete the workspace and all its content
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6rounded-r-default">
        <Button onClick={handleDelete} variant="destructive">
          {isLoading ? (
            <Spinner className="h-4 w-4 text-white" />
          ) : (
            <>
              <span className="text-sm font-semibold">Delete</span>
              <Icon name="Trash2" className="text-sm font-semibold ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
