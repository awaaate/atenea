"use client";
import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { useToast } from "@shared/ui/src/toast";
import { useRouter } from "next/navigation";
import React from "react";

export const BringToWorkspaceButton: React.FC<{
  workspaceId: string;
  workspaceName: string;
  boardId: string;
}> = ({ workspaceName, boardId, workspaceId }) => {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = trpc.boards.duplicate.useMutation();
  const router = useRouter();
  return (
    <Button
      className="justify-between"
      variant="ghost"
      onClick={async () => {
        const newBoardId = await mutateAsync({
          id: boardId,
          workspaceId: workspaceId,
        });

        if (!newBoardId[0].id) {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        } else {
          toast({
            title: "Success",
            description: `Board ${boardId} duplicated to ${workspaceName}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        router.push(`/app/${workspaceId}/${newBoardId[0].id}`);
      }}
    >
      {isLoading ? (
        <Spinner size="xs" className="mr-2" />
      ) : (
        <>
          <span>Bring to {workspaceName}</span>
          <Icon name="ArrowRight" className="mr-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
};
