"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Control,
  useFieldArray,
  useFormContext,
  Button,
} from "@shared/ui";
import React from "react";
import { FormValues } from "./form-schema";
import { CategoriesCommandMenu } from "../command-menus/categories-command-menu";

interface CategoriesFieldProps {
  control: Control<FormValues>;
}

export const CategoriesField: React.FC<CategoriesFieldProps> = ({
  control,
}) => {
  const { register } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  return (
    <div>
      <FormItem>
        <FormLabel htmlFor="categories">
          Categories
          <CategoriesCommandMenu
            addCategory={(category) => {
              append(category);
            }}
          />
        </FormLabel>
        {fields.map((category, index) => (
          <div key={category.id} className="flex justify-between items-end">
            <FormControl>
              <Input {...register(`categories.${index}.name` as const)} />
            </FormControl>
            <FormMessage {...category} />
            <Button
              type="button"
              onClick={() => remove(index)}
              variant={"destructive"}
            >
              Remove
            </Button>
          </div>
        ))}
      </FormItem>
    </div>
  );
};
