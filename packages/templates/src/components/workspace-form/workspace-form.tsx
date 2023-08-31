import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
  AccentPicker,
  useForm,
  zodResolver,
  useFormContext,
} from "@shared/ui";
import React from "react";
import { z } from "zod";
import { workspaceSchema } from "../../schemas/workspaceSchema";

interface WorkspaceFormProps {}

const WorkspaceForm: React.FC<WorkspaceFormProps> = () => {
  const form = useFormContext<z.infer<typeof workspaceSchema>>();
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Worksapce Name</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accentColor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Color</FormLabel>
            <FormControl>
              <AccentPicker
                value={field.value}
                onValueChange={(color: string) => {
                  form.setValue("accentColor", color);
                }}
                type="single"
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subdomain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subdomain</FormLabel>
            <FormControl>
              <Input placeholder="atenea" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default WorkspaceForm;
