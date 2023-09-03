"use client";
import { Form, useForm, zodResolver } from "@shared/ui/src/form";

import WorkspaceForm from "@shared/templates/src/components/workspace-form/workspace-form";
import { workspaceSchema } from "@shared/templates/src/schemas/workspaceSchema";
import React from "react";

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
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      accentColor,
      description,
      name,
      subdomain,
    },
  });

  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */

  const onSubmit = () => {};
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <WorkspaceForm />
        </form>
      </Form>
    </div>
  );
};
