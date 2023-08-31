"use client";
import { createBoard } from "@/lib/actions/createBoard";
import { Button, Icon, Spinner } from "@shared/ui";
import { useParams, useRouter } from "next/navigation";
import React, { useTransition } from "react";

const CreateBoardButton = () => {
  const router = useRouter();
  const { siteId } = useParams() as { siteId: string };
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="py-0"
      onClick={() =>
        //@ts-expect-error
        startTransition(async () => {
          const board = await createBoard(null, siteId, null);
          console.log(board);
          router.refresh();
          router.push(`/app/${siteId}/${board.id}`);
        })
      }
      variant={"ghost"}
    >
      {isPending ? (
        <Spinner className="mr-2" />
      ) : (
        <Icon name={"Plus"} className="mr-2" />
      )}
      Create board
    </Button>
  );
};

export default CreateBoardButton;
