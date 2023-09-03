"use client";

import { loadEditorState } from "@shared/editor";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const BoardPage = dynamic(
  () => import("@shared/templates/src/pages/board").then((m) => m.BoardPage),
  {
    ssr: false,
  }
);

interface BoardWrapperProps {
  title?: string;
  background?: string;
  content: {
    nodes: {};
  };
  id: string;
  editable: boolean;
}
export const BoardWrapper: React.FC<BoardWrapperProps> = ({
  content,
  id,
  title,
  background,
  editable = true,
}) => {
  useEffect(() => {
    loadEditorState({
      editable,
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
