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
}
export const BoardWrapper: React.FC<BoardWrapperProps> = ({
  content,
  id,
  title,
  background,
}) => {
  useEffect(() => {
    loadEditorState({
      editable: true,
      boardId: id,
      nodes: content?.nodes || {},
      coverImage: "",
      pageBackground: background || "transparent",
      events: {
        selected: new Set(),
        dragged: new Set(),
        hovered: new Set(),
      },
      title: title || "",
    });
  }, [content, title, id, background]);

  return <BoardPage />;
};
