"use client";
import { createBoard } from "@/lib/actions/createBoard";
import { trpc } from "@/lib/trpc";
import { Button, Icon, Spinner } from "@shared/ui";
import { useParams, useRouter } from "next/navigation";
import React, { useTransition } from "react";

export const CreateBoardButton = () => {
  const router = useRouter();
  const { workspaceId } = useParams() as { workspaceId: string };
  const { isLoading, mutateAsync } = trpc.boards.create.useMutation();
  return (
    <Button
      className="py-0 flex items-center"
      onClick={async () => {
        const boards = await mutateAsync({
          workspaceId,
          name: "New Board",
        });
        const board = boards[0];
        router.push(`/app/${workspaceId}/${board.id}`);
      }}
      variant={"ghost"}
    >
      {isLoading ? (
        <Spinner className="mr-2" size="sm" />
      ) : (
        <Icon name={"Plus"} className="mr-2" />
      )}
      Create board
    </Button>
  );
};
