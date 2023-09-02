import { loadEditorState } from "@shared/editor";
import { EditorState } from "@shared/editor/src/engine/interfaces";
import { TooltipProvider } from "@shared/ui";
import type { Meta } from "@storybook/react";
import { useEffect } from "react";
import { mockPageData } from "../../data";
import { WorkspaceLayout } from "../../layouts/workspace-layout";
import { BoardPage } from "./board-page";

const Board = ({ ...props }: Partial<EditorState>) => {
  console.log(props, "props");
  useEffect(() => {
    loadEditorState({
      ...props,
      events: {
        selected: new Set(),
        hovered: new Set(),
        dragged: new Set(),
      },
      nodes: {},
    });
  }, [props]);
  return (
    <TooltipProvider>
      <WorkspaceLayout {...mockPageData} onSignout={() => {}}>
        <BoardPage />
      </WorkspaceLayout>
    </TooltipProvider>
  );
};
export default {
  title: "Pages/Board Page",
  component: Board,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    editable: {
      defaultValue: false,
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Board>;

export const Default = {
  args: {
    editable: true,
  },
};
