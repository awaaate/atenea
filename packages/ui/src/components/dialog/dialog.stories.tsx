import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "../button";

export default {
  title: "Components/Dialog",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    variant: "default",
    children: "Dialog",
  },
  render: () => (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            cupiditate cumque explicabo.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque porro
          vero rem cumque error. Id, optio quis! Dolorum porro quas quae labore
          quo praesentium tempora sit nobis quod! Enim amet perferendis fugit,
          reprehenderit magnam omnis voluptatem possimus? Similique ducimus
          ipsum doloribus tempora doloremque eos, eius sunt. Consequuntur soluta
          minima delectus!
        </div>
        <DialogFooter className="">
          <Button>Cancel</Button>
          <Button variant={"primary"}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
