"use client";

import { trpc } from "@/lib/trpc";
import { Button } from "@shared/ui/src/button";
import { Card } from "@shared/ui/src/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/src/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@shared/ui/src/form";
import { Input } from "@shared/ui/src/input";
import { Spinner } from "@shared/ui/src/spinner";
import { useToast } from "@shared/ui/src/toast";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, "Workspace name is required"),
});
interface CreateWorkspaceModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const form = useForm({
    resolver: zodResolver(Schema),
  });

  const { isLoading, mutateAsync } =
    trpc.worksapce.createWorkspace.useMutation();

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof Schema>) => {
    const workspaceId = crypto.randomUUID();
    const worksapce = {
      id: workspaceId,
      name: values.name,
      description: "",
      subdomain: workspaceId+"-subdomain",
    };
    const createWorkspace = await mutateAsync({
      ...worksapce,
    });
    if (createWorkspace[0].id) {
      toast({
        title: "Workspace created",
        description: "You can now start creating boards",
        status: "success",
      });
      setIsOpen(false);
      router.push(`/app/${workspaceId}`);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={v => setIsOpen(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full mx-auto px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Worksapce Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="justify-end">
              <Button
                variant={"primary"}
                type="submit"
                onClick={() => console.log(form.formState.errors)}
              >
                {isLoading ? (
                  <Spinner className="" size="xs" />
                ) : (
                  "create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
