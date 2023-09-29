"use client";
import React from "react";
import { useEditorStore } from "../../engine/editor";
import { CreateWidget } from "../create-widget/create-widget";
import { ShareButton } from "../share-button";

import { Icon } from "@shared/ui/src/icon";
import { Separator } from "@shared/ui/src/separator";
import { Button } from "@shared/ui/src/button";
import { date } from "@shared/ui/src/date";
import { useAutoSave } from "../../hooks/use-auto-save";

export interface EditorTopbarProps {}

export const EditorTopbar: React.FC<EditorTopbarProps> = () => {
  const setSidebar = useEditorStore.use.setSidebar();
  const sidebar = useEditorStore.use.sidebar();
  const setTitle = useEditorStore.use.setTitle();
  const editable = useEditorStore.use.editable();
  const title = useEditorStore.use.title();
  const lastDatabaseSync = useAutoSave();

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
          <input
            className="bg-transparent border-none outline-none w-max"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!editable}
          />
        </h2>
        <Separator orientation="vertical" className="h-[25px] mx-2" />
        <div className="flex gap-2 justify-center items-center">
          <CreateWidget />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-weakest">
          Last saved {date(lastDatabaseSync).fromNow()}
        </span>
        <ShareButton />
      </div>
    </div>
  );
};
