import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormControl,
  useFormContext,
} from "@shared/ui/src/form";

import { Input } from "@shared/ui/src/input";
import { AccentPicker } from "@shared/ui/src/accent-picker";

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
              <Input placeholder="Name" {...field} />
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
            <FormDescription>
              This is the main color of your workspace.
            </FormDescription>
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
            <FormDescription>
              This is the base of the public board links you will be able to
              share{" "}
            </FormDescription>
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
              <Input placeholder="Description" {...field} />
            </FormControl>
            <FormDescription>
              A little description of your workspace.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default WorkspaceForm;
