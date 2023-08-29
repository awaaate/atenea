"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  Button,
  Input,
  Control,
  useFieldArray,
  useFormContext,
  Textarea,
} from "@shared/ui";
import React from "react";

import { FormValues } from "./form-schema";

interface BudgetFieldProps {
  control: Control<FormValues>;
}

export const BudgetField: React.FC<BudgetFieldProps> = ({ control }) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "budget.items",
  });

  return (
    <FormItem>
      <FormLabel htmlFor="budget">Budget</FormLabel>
      <FormItem>
        <FormLabel htmlFor="totalAmount">Total Amount</FormLabel>
        <FormControl>
          <Input
            {...register("budget.totalAmount")}
            type="number"
            min="0"
            step="1"
          />
        </FormControl>
      </FormItem>

      <div className="flex justify-between items-center mt-6 mb-4 ">
        <p className="text-lg text-gray-800 ">Budget Sections </p>
        <Button
          type="button"
          onClick={() => append({ name: "", amount: 0, description: "" })}
        >
          Add Budget Item
        </Button>
      </div>

      {fields.map((budget, index) => (
        <div key={budget.id} className="flex flex-col justify-between gap-4">
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input {...register(`budget.items.${index}.name`)} />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <FormControl>
              <Input
                {...register(`budget.items.${index}.amount`)}
                type="number"
                min="0"
                step="1"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea {...register(`budget.items.${index}.description`)} />
            </FormControl>
          </FormItem>
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
  );
};
