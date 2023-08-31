"use client";

import React, { HTMLAttributes } from "react";
import { Grid } from "../../user-components/grid";
import { useEditorStore } from "../../engine/editor";
import { cn } from "@shared/ui";

const Editor: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const background = useEditorStore.use.pageBackground();
  return (
    <div
      {...props}
      className={cn(className)}
      style={{
        background: background,
      }}
    >
      {children}
      <Grid />
    </div>
  );
};

const EditorTitle: React.FC<HTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  const title = useEditorStore.use.title();
  const setTitle = useEditorStore.use.setTitle();

  return (
    <input
      {...props}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={cn(
        "bg-transparent shadow-0 border-0 text-5xl text-text focus:outline-none",
        className
      )}
      placeholder="My board"
    />
  );
};

export const EditorCoveImage: React.FC<HTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  const coverImage = useEditorStore.use.coverImage();
  const setCoverImage = useEditorStore.use.setCoverImage();

  return (
    <input
      {...props}
      value={coverImage}
      onChange={(e) => setCoverImage(e.target.value)}
      className={cn(
        "bg-transparent shadow-0 border-0 text-5xl text-text focus:outline-none",
        className
      )}
      placeholder="My board"
    />
  );
};

export { Editor, EditorTitle };
