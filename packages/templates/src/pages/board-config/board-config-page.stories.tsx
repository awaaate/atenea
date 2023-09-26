import { EditorState } from "@shared/editor/src/engine/interfaces";
import { TooltipProvider } from "@shared/ui/src/tooltip";
import type { Meta } from "@storybook/react";
import { mockPageData } from "../../data";
import { WorkspaceLayout } from "../../layouts/workspace-layout";
import { BoardConfigPage } from "./board-config-page";

const Page = ({ ...props }: Partial<EditorState>) => {
  return (
    <TooltipProvider>
      <WorkspaceLayout {...mockPageData} onSignout={() => {}}>
        <BoardConfigPage />
      </WorkspaceLayout>
    </TooltipProvider>
  );
};
export default {
  title: "Pages/Board Config Page",
  component: Page,
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
} as Meta<typeof Page>;

export const Default = {
  args: {
    editable: true,
  },
};
