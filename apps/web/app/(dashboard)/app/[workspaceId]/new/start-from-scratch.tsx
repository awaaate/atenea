"use client";
import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@shared/ui/src/card";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { useToast } from "@shared/ui/src/toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export const StartFromScratch = () => {
  const { workspaceId } = useParams();
  const { isLoading, mutateAsync } = trpc.boards.create.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleNewBoard = async () => {
    const newBoardId = await mutateAsync({
      workspaceId: workspaceId as string,
      name: "New board",
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
        description: `Created a new board from scratch`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    router.push(`/app/${workspaceId}/${newBoardId[0].id}`);
  };
  return (
    <Card
      className="flex-1 min-w-[300px] w-full "
      style={{
        maxWidth: 300,
      }}
    >
      <CardHeader>
        <CardTitle>Start from scratch</CardTitle>
      </CardHeader>
      <CardContent className="bg-surface-lowered">
        <Image
          src={"/templates/empty.png"}
          alt={"Start from scratch"}
          width={700}
          height={300}
          className="rouned-default"
        />
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={() => handleNewBoard()}>
          {isLoading ? (
            <Spinner size="xs" className="mr-2" />
          ) : (
            <>
              <Icon name="Plus" className="mr-2" />
              Create new board
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
