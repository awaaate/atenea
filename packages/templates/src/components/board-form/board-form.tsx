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
import { Textarea } from "@shared/ui/src/textarea";

import React from "react";
import { z } from "zod";
import { boardSchema } from "../../schemas/boardScheam";

interface BoardFormProps {}

export const BoardForm: React.FC<BoardFormProps> = () => {
  const form = useFormContext<z.infer<typeof boardSchema>>();
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
        name="url"
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
              <Textarea placeholder="shadcn" {...field} />
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
