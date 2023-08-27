"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  useForm,
  zodResolver,
} from "@shared/ui";
import WorkspaceForm from "../../components/workspace-form/workspace-form";
import { WorkspacePreview } from "../../components/workspace-preview/workspace-preview";
import { workspaceSchema } from "../../schemas/workspaceSchema";
interface CreateBoardButton {
  onSubmit: (data: any) => Promise<void>
}
export const CreateWorspacePage = () => {
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
    <div className="h-screen w-screen bg-background-default flex gap-8 p-16 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action>
          <WorkspaceForm />
        </form>
      </Form>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <WorkspacePreview name={form.watch("name")} />
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant={"primary"}>
            <span className="text-sm">Create Workspace</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
