"use client";
import WorkspaceForm from "@shared/templates/src/components/workspace-form/workspace-form";
import { WorkspacePreview } from "@shared/templates/src/components/workspace-preview/workspace-preview";
import { workspaceSchema } from "@shared/templates/src/schemas/workspaceSchema";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  Spinner,
  useForm,
  useToast,
  zodResolver,
} from "@shared/ui";

import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "@shared/api";

export default function Page() {
  const { isLoading, mutateAsync: ceateWorkspace } =
    trpc.worksapce.createWorkspace.useMutation();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      description: "",
      accentColor: "",
      isPublic: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await ceateWorkspace(data);

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
        description: "Successfully created site!",
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
    <div className="h-screen w-screen bg-background-default  p-16 ">
      <Form {...form}>
        <form className="flex gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Create Workspace</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkspaceForm />
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <WorkspacePreview name={form.watch("name")} />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                variant={"primary"}
                type="submit"
                onClick={() => console.log(form.formState.errors)}
              >
                {isLoading ? (
                  <Spinner className="text-black/20 fill-black" />
                ) : (
                  "create"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
