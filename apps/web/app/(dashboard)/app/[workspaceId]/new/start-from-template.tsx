"use client";

import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/src/card";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { useToast } from "@shared/ui/src/toast";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
interface StartFromTemplateProps {
  templates: {
    id: string;
    name: string;
    image: string;
    boardId: string;
  }[];
}
export const StartFromTemplate = ({ templates }: StartFromTemplateProps) => {
  const { toast } = useToast();
  const { workspaceId } = useParams();
  const [selectedTemplate, setSelectedTemplate] = React.useState<
    string | undefined
  >();

  const { isLoading, mutateAsync } = trpc.boards.duplicate.useMutation();
  const router = useRouter();

  const handleDuplicate = async (boardId: string) => {
    setSelectedTemplate(boardId);
    const newBoardId = await mutateAsync({
      id: boardId,
      workspaceId: workspaceId as string,
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
        description: `Board ${boardId} duplicated to ${workspaceId}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/app/${workspaceId}/${newBoardId[0].id}`);
      setSelectedTemplate(undefined);
      return;
    }
  };

  return (
    <>
      {templates.map((template) => (
        <Card
          className="flex-1 min-w-[300px] w-full "
          style={{
            maxWidth: 300,
          }}
        >
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
          </CardHeader>
          <CardContent className="bg-surface-lowered">
            <Image
              src={"/images/board-covers/Abstract-Gradient-1.png"}
              alt={template.name}
              width={700}
              height={300}
              className="rouned-default"
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              onClick={() => handleDuplicate(template.boardId)}
            >
              {selectedTemplate === template.boardId ? (
                <Spinner size="xs" className="mr-2" />
              ) : (
                <>
                  <Icon name="Plus" className="mr-2" />
                  Duplicate board
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
