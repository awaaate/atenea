"use client";

import { Button } from "@shared/ui/src/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/src/card";
import { Form, useForm, zodResolver } from "@shared/ui/src/form";
import WorkspaceForm from "../../components/workspace-form/workspace-form";
import { WorkspacePreview } from "../../components/workspace-preview/workspace-preview";
import { workspaceSchema } from "../../schemas/workspaceSchema";

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

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-screen bg-background-default flex gap-8 p-16 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
