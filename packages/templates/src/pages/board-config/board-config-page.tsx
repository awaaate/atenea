import { Form, useForm, zodResolver } from "@shared/ui/src/form";
import { z } from "zod";
import { boardSchema } from "../../schemas/boardScheam";
import { BoardForm } from "../../components/board-form/board-form";

interface BoardConfigPageProps {
  params: {
    boardId: string;
  };
}

export const BoardConfigPage: React.FC = () => {
  //make a form
  const form = useForm({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "test",
      id: "test",
      description: "test",
      background: "test",
      coverImage: "test",
      coverImageEnabled: true,
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      <Form {...form}>
        <BoardForm />
      </Form>
    </form>
  );
};
