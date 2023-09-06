import { Form, useForm, zodResolver } from "@shared/ui/src/form";
import { mockPageData } from "../../data";
import { WorkspaceLayout } from "../../layouts/workspace-layout";
import { WorkspacePage } from "./workspace-page";
import { Meta } from "@storybook/react";
import { workspaceSchema } from "../../schemas/workspaceSchema";
import WorkspaceForm from "../../components/workspace-form/workspace-form";

export default {
  title: "Pages/Wroskapce Page",
  component: WorkspacePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof WorkspacePage>;

export const Default = () => {
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      description: "",
      accentColor: "",
    },
  });
  return (
    <WorkspaceLayout {...mockPageData} onSignout={() => {}}>
      <WorkspacePage boards={mockPageData.boards} siteId="1">
        {/* <CreateWorspacePage /> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="max-w-3xl ml-4 mt-8"
          >
            <WorkspaceForm />
          </form>
        </Form>
      </WorkspacePage>
    </WorkspaceLayout>
  );
};
