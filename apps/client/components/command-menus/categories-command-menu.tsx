"use client";

import { SelectCategory } from "@/db";
import { trpc } from "@/lib/trpcClient";
import { CommandMenu, Dialog, DialogTrigger, Icon } from "@shared/ui";
import React from "react";

type Category = SelectCategory;
interface CategoriesCommandMenuProps {
  addCategory: (category: Category) => void;
}
export const CategoriesCommandMenu = ({
  addCategory,
}: CategoriesCommandMenuProps) => {
  const { isLoading, data } = trpc.getCategories.useQuery();

  const [isOpen, setIsOpen] = React.useState(false);

  if (isLoading || !data) return <div>Loading...</div>;

  const addCategoryHandler = async (category: Category) => {
    addCategory(category);
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={(value) => setIsOpen(value)} open={isOpen}>
      <DialogTrigger className="ml-2 inline-flex ">
        <Icon name="Plus" className="" />
      </DialogTrigger>
      <CommandMenu
        onDismiss={() => console.log("dismissed")}
        items={[
          {
            handler: () => {
              addCategoryHandler({
                name: "Category 1",
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
              });
            },
            id: "create-category",
            name: "Create Category",
            icon: "Plus",
          },
          ...data.map((category) => ({
            handler: () => {
              addCategoryHandler(category);
            },
            id: category.name,
            name: category.name,
            icon: "Users" as const,
            group: "Categorys",
          })),
        ]}
      />
    </Dialog>
  );
};
