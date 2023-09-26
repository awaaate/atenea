import { Form, useForm, zodResolver } from "@shared/ui/src/form";
import { z } from "zod";
import { boardSchema } from "../../schemas/boardScheam";
import { BoardForm } from "../../components/board-form/board-form";
import { WorkspaceTobar } from "../../components/workspace-topbar/workspace-tobar";
import { useLayoutStore } from "../../stores/layoutStore";
import { useEffect } from "react";
import { Button } from "@shared/ui/src/button";
interface BoardConfigPageProps {
  name: string;
  id: string;
  description: string;
}

export const BoardConfigPage: React.FC<BoardConfigPageProps> = ({
  name,
  id,
  description,
}) => {
  //make a form
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
  return (
    <div className="w-full h-screen">
      <WorkspaceTobar />
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="w-full px-4 space-y-2"
      >
        <Form {...form}>
          <BoardForm />
        </Form>
        <Button type="submit" variant={"primary"}>
          Save
        </Button>
      </form>
    </div>
  );
};
