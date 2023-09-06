"use client";

import React, { HTMLAttributes } from "react";
import { useEditorStore } from "../../engine/editor";
import { Grid } from "../grid";

import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { cn } from "@shared/ui/src/utils";

const Editor: React.FC<React.ComponentProps<typeof ScrollArea>> = ({
  children,
  className,
  ...props
}) => {
  const background = useEditorStore.use.pageBackground();
  const setSidebar = useEditorStore.use.setSidebar();
  const unSelectAll = useEditorStore.use.unSelectAll();

  return (
    <div
      {...props}
      className={cn(className, "h-full overflow-hidden p-6 flex-1")}
      style={{
        background: background,
      }}
      onClick={(event) => {
        //check if click is on the editor

        //@ts-expect-error
        const isChildOfGridItem = event.target?.closest(".grid-item-part");
        if (isChildOfGridItem) return;
        unSelectAll();
        setSidebar(null);
      }}
    >
      <div className="mx-auto bg-surface-raised px-4 md:px-8 py-8 rounded-default shadow-card flex-1  ">
        {children}
        <Grid />
      </div>

      <Button
        onClick={() => {
          useEditorStore.setState({
            editable: !useEditorStore.getState().editable,
          });
        }}
        className="fixed bottom-4 right-4"
      >
        Preview
        <Icon name="Eye" className="ml-2" />
      </Button>
    </div>
  );
};

const classes = {
  title: "text-5xl text-text font-semibold focus:outline-none mb-2",
};
const EditorTitle: React.FC<HTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  const title = useEditorStore.use.title();
  const setTitle = useEditorStore.use.setTitle();
  const editable = useEditorStore.use.editable();
  const showTitle = editable || title;

  if (!showTitle) return null;

  if (!editable)
    return <h1 className={cn(classes.title, className)}>{title}</h1>;
  return (
    <input
      {...props}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      disabled={!editable}
      className={cn(
        "bg-transparent shadow-0 border-0 text-5xl text-text focus:outline-none mb-2",
        className
      )}
      placeholder="My board"
    />
  );
};

export { Editor, EditorTitle };
