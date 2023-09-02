"use client";

import { loadEditorState, useEditorStore } from "@shared/editor";
import { BoardPage } from "@shared/templates";
import { useEffect } from "react";

interface BoardWrapperProps {
  title?: string;
  background?: string;
  content: {
    nodes: {};
  };
  id: string;
  editable?: boolean;
}
export const Board: React.FC<BoardWrapperProps> = ({
  content,
  id,
  title,
  background,
  editable = false,
}) => {
  useEffect(() => {
    loadEditorState({
      editable,
      boardId: id,
      nodes: content?.nodes || {},
      pageBackground: background || "transparent",
      events: {
        selected: new Set(),
        dragged: new Set(),
        hovered: new Set(),
      },
      title: title || "",
    });
  }, [content, title, id, background, editable]);

  return <BoardPage />;
};
