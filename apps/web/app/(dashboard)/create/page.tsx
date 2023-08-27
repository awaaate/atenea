"use client";
import WorkspaceForm from "@shared/templates/src/components/workspace-form/workspace-form";
import { WorkspacePreview } from "@shared/templates/src/components/workspace-preview/workspace-preview";
import { workspaceSchema } from "@shared/templates/src/schemas/workspaceSchema";
import {
  useForm,
  zodResolver,
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  useToast,
} from "@shared/ui";

import { createSite } from "@/lib/actions/createSite";
import { useRouter } from "next/navigation";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      subDomain: "",
      description: "",
      accentColor: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-screen bg-background-default  p-16 ">
      <Form {...form}>
        <form
          className="flex gap-8"
          action={async (data: FormData) =>
            createSite(data).then((res: any) => {
              if (res.error) {
                console.log(res.error);
                if (res.error === "subdomain already exists") {
                  form.setError("subdomain", res.error);
                }
                toast({
                  title: "Something went wrong.",
                  variant: "destructive",
                  description: res.error,
                });
              } else {
                //va.track("Created Site")

                const { id } = res;
                router.refresh();
                router.push(`/app/${id}`);
                toast({
                  title: "Success",
                  description: "Successfully created site!",
                });
              }
            })
          }
        >
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
              <Button variant={"primary"} type="submit">
                <span className="text-sm">Create Workspace</span>
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
