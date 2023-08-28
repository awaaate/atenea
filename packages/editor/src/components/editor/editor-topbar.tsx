"use client";
import {
  Button,
  CommandMenu,
  Dialog,
  DialogTrigger,
  Icon,
  Separator,
} from "@shared/ui";
import React from "react";
import { CreateWidget } from "../create-widget/create-widget";
import { useEditor } from "@craftjs/core";

interface EditorTopbarProps {
  toggleSidebar: () => void;
}

export const EditorTopbar: React.FC<EditorTopbarProps> = ({
  toggleSidebar,
}) => {
  const {
    actions: {
      history: { undo, redo },
    },
  } = useEditor();

  return (
    <div className="flex border-b px-4 py-3  bg-background justify-between">
      <div className="flex gap-1">
        <CreateWidget />
        <Separator orientation="vertical" className="mx-2" />
        {/*         <Button size="sm" variant={"ghost"} onClick={undo}>
          <Icon name="Undo" />
        </Button>
        <Button size="sm" variant={"ghost"} onClick={redo}>
          <Icon name="Redo" />
        </Button> */}
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant={"primary"}>
          Share
        </Button>
        <Button size={"sm"} onClick={toggleSidebar}>
          <Icon name="Settings2" />
        </Button>
      </div>
    </div>
  );
};
