"use client";
import { Form, useForm, zodResolver } from "@shared/ui/src/form";

import WorkspaceForm from "@shared/templates/src/components/workspace-form/workspace-form";
import { workspaceSchema } from "@shared/templates/src/schemas/workspaceSchema";
import React from "react";
import { useToast } from "@shared/ui/src/toast";
import { TRPCClientError } from "@trpc/client";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import { Spinner } from "@shared/ui/src/spinner";

interface UpdateWorkspaceFormProps {
  subdomain: string;
  name: string;
  accentColor: string;
  description: string;
}

export const UpdateWorspaceForm: React.FC<UpdateWorkspaceFormProps> = ({
  accentColor,
  description,
  name,
  subdomain,
}) => {
  const { workspaceId } = useParams();

  const { isLoading, mutateAsync: ceateWorkspace } =
    trpc.worksapce.updateWorkspace.useMutation();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      accentColor,
      description,
      name,
      subdomain,
      isPublic: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await ceateWorkspace({
        ...data,
        id: workspaceId,
      });

      const { id } = res[0];
      if (!id) {
        console.log(res);
        throw new Error("Something went wrong");
      }
      {
        router.refresh();
        router.push(`/app/${id}`);
      }

      toast({
        title: "Success",
        description: "Successfully updated workspace",
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof TRPCClientError) {
        if (
          error.message ===
          'duplicate key value violates unique constraint "Site_subdomain_key"'
        ) {
          form.setError("subdomain", {
            message: "Subdomain is already taken",
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <WorkspaceForm />
          <Button
            variant={"primary"}
            type="submit"
            onClick={() => console.log(form.formState.errors)}
          >
            {isLoading ? (
              <Spinner className="text-black/20 fill-black" size="xs" />
            ) : (
              "Update Workspace"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
