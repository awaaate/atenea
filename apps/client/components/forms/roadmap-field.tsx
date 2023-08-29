"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  Input,
  Button,
  Control,
  useFieldArray,
  Textarea,
  useFormContext,
} from "@shared/ui";
import React from "react";
import { FormValues } from "./form-schema";

interface RoadmapFieldProps {
  control: Control<FormValues>;
}

export const RoadmapField: React.FC<RoadmapFieldProps> = ({ control }) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roadmap.items",
  });

  return (
    <FormItem>
      <FormLabel htmlFor="roadmap">Roadmap</FormLabel>
      {fields.map((roadmap, index) => (
        <div key={roadmap.id} className="flex flex-col justify-between gap-4">
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input {...register(`roadmap.items.${index}.name`)} />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea {...register(`roadmap.items.${index}.description`)} />
            </FormControl>
          </FormItem>
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ name: "", description: "" })}
      >
        Add Roadmap Item
      </Button>
    </FormItem>
  );
};
