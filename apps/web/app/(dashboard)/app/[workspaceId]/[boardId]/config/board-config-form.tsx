"use client";
import { Form, useForm, zodResolver } from "@shared/ui/src/form";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@shared/ui/src/button";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import { boardSchema } from "@shared/templates/src/schemas/boardScheam";
import { BoardForm } from "@shared/templates/src/components/board-form";
import { trpc } from "@/lib/trpc";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@shared/ui/src/toast";
import { TRPCClientError } from "@trpc/client";
import { Spinner } from "@shared/ui/src/spinner";

interface BoardConfigFormProps {
  name: string;
  id: string;
  description: string;
}

export const BoardConfigForm: React.FC<BoardConfigFormProps> = ({
  name,
  id,
  description,
}) => {
  //make a form
  const { workspaceId } = useParams();
  const { data, isLoading, mutateAsync } = trpc.boards.setConfig.useMutation();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name,
      id,
      description,
    },
  });
  const setPageTitle = useLayoutStore((store) => store.setPageTitle);
  useEffect(() => {
    setPageTitle("Board Config");
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await mutateAsync({
        ...data,
        newId: data.id,
        id,
        workspaceId,
      });

      const { id: newId } = res[0];
      if (!newId) {
        console.log(res);
        throw new Error("Something went wrong");
      }
      {
        router.refresh();
        router.push(`/app/${workspaceId}/${newId}`);
      }

      toast({
        title: "Success",
        description: "Successfully created site!",
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof TRPCClientError) {
        if (
          error.message ===
          'duplicate key value violates unique constraint "Site_subdomain_key"'
        ) {
          form.setError("id", {
            message: "This board url is already taken",
          });
        }
      } else {
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-4 space-y-2 max-w-5xl mx-auto mt-4"
      >
        <BoardForm />
        <Button
          variant={"primary"}
          type="submit"
          onClick={() => {
            console.log(form.getValues());
            console.log(form.formState.errors);
          }}
        >
          {isLoading ? (
            <Spinner className="text-black/20 fill-black" size="xs" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};
