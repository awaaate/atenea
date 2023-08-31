"use client";
import { Button, Icon, Separator } from "@shared/ui";
import React from "react";
import { useEditorStore } from "../../engine/editor";
import { CreateWidget } from "../create-widget/create-widget";
import { ShareButton } from "../share-button";

export interface EditorTopbarProps {}

export const EditorTopbar: React.FC<EditorTopbarProps> = () => {
  const setSidebar = useEditorStore.use.setSidebar();
  const sidebar = useEditorStore.use.sidebar();
  const lastDatabaseSync = useEditorStore.use.lastDatabaseSync();
  const toggleSidebarHandler = () => {
    if (sidebar === "node" || sidebar === "page") {
      setSidebar(null);
    } else {
      setSidebar("page");
    }
  };
  return (
    <div className="flex border-b px-4 py-3  bg-background justify-between">
      <div className="flex gap-1 items-center">
        <CreateWidget />
        <Separator orientation="vertical" className="mx-2" />
        <span className="text-sm text-text-weaker">
          Last saved {lastDatabaseSync}
        </span>
        {/*         <Button size="sm" variant={"ghost"} onClick={undo}>
          <Icon name="Undo" />
        </Button>
        <Button size="sm" variant={"ghost"} onClick={redo}>
          <Icon name="Redo" />
        </Button> */}
      </div>
      <div className="flex gap-1">
        <ShareButton />
        <Button size={"sm"} onClick={toggleSidebarHandler}>
          <Icon name="Settings2" />
        </Button>
      </div>
    </div>
  );
};
