"use client";
import {
  Button,
  Control,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  FormControl,
  FormItem,
  FormLabel,
  Icon,
  Input,
  Spinner,
  Textarea,
  useFieldArray,
  useFormContext,
} from "@shared/ui";
import React from "react";

import { FormValues } from "./form-schema";
import { trpc } from "@/lib/trpcClient";

interface BudgetFieldProps {
  control: Control<FormValues>;
}

export const BudgetField: React.FC<BudgetFieldProps> = ({ control }) => {
  const [isLoading, setIsLoading] = React.useState<number>(-1);
  const { mutateAsync: deleteBudgetSection } =
    trpc.deleteBudgetSection.useMutation();
  const { register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    keyName: "field-id",

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
            {...register("budget.totalAmount", {
              valueAsNumber: true,
            })}
            type="number"
            min="0"
            step="1"
          />
        </FormControl>
      </FormItem>

      <div className="flex justify-between items-center mt-6 mb-4 ">
        <p className="text-lg text-text-weak ">Budget Sections </p>
        <Button
          type="button"
          onClick={() => {
            //append({ name: "", amount: 0, description: "" });
          }}
        >
          Add Budget Item
        </Button>
      </div>

      {fields.map((budget, index) => (
        <div key={budget.id} className="flex  justify-between gap-4 items-end">
          <FormItem className="flex-1">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input {...register(`budget.items.${index}.name`)} />
            </FormControl>
          </FormItem>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"ghost"}>
                  <Icon name="MoreHorizontal" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <h3 className="text-lg font-semibold">Edit Budget Item</h3>
                </DialogHeader>
                <div className="p-6">
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...register(`budget.items.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        min="0"
                        step="1"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...register(`budget.items.${index}.description`)}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              type="button"
              onClick={async () => {
                setIsLoading(index);
                if (budget.id) {
                  const id = await deleteBudgetSection({
                    id: budget.id,
                  });
                  if (id) {
                    remove(index);
                  }
                }

                setIsLoading(-1);
              }}
              variant={"destructive"}
            >
              {isLoading === index ? (
                <Spinner size="sm" />
              ) : (
                <Icon name="Trash2" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </FormItem>
  );
};
