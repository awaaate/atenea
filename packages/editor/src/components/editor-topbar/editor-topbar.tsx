"use client";
import React from "react";
import { useEditorStore } from "../../engine/editor";
import { CreateWidget } from "../create-widget/create-widget";
import { ShareButton } from "../share-button";

import { Icon } from "@shared/ui/src/icon";
import { Separator } from "@shared/ui/src/separator";
import { Button } from "@shared/ui/src/button";
import { date } from "@shared/ui/src/date";

export interface EditorTopbarProps {}

export const EditorTopbar: React.FC<EditorTopbarProps> = () => {
  const setSidebar = useEditorStore.use.setSidebar();
  const sidebar = useEditorStore.use.sidebar();

  const editable = useEditorStore.use.editable();
  const title = useEditorStore.use.title();
  const lastDatabaseSync = useEditorStore.use.lastDatabaseSync();

  const toggleSidebarHandler = () => {
    if (sidebar === "node" || sidebar === "page") {
      setSidebar(null);
    } else {
      setSidebar("page");
    }
  };
  return (
    <div className="flex border-b px-4 h-[50px] bg-background justify-between items-center ">
      <div className="flex items-center ">
        <h2 className="font-semibold text-xl ">
          <Icon name="Layout" className="mr-2 " size="s" />
          {title}
        </h2>
        <Separator orientation="vertical" className="h-[25px] mx-2" />
        <Button size="sm" variant={"ghost"} onClick={() => {}}>
          <Icon name="Undo" className="text-text-weakest" />
        </Button>
        <Button size="sm" variant={"ghost"} onClick={() => {}}>
          <Icon name="Redo" className="text-text-weakest" />
        </Button>
        <Button size={"sm"} onClick={toggleSidebarHandler} variant={"ghost"}>
          <Icon name="Settings2" className="text-text-weakest" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-weaker">
          Last saved {date(lastDatabaseSync).fromNow()}
        </span>
        <ShareButton />
        <CreateWidget />
      </div>
    </div>
  );
};
