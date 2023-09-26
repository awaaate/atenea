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
import { cn } from "@shared/ui/src/utils";
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
            <FormLabel>Board Name</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Board Url</FormLabel>
            <FormControl>
              <div
                className={cn(
                  "flex items-center border rounded-md px-2 py-1 text-text-weak bg-background-default"
                )}
              >
                <span>https://www.atenea.wtf/w/</span>
                <input
                  placeholder="my-board"
                  {...field}
                  className="bg-transparent"
                />
              </div>
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
