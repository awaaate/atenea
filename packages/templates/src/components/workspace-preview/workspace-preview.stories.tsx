import { WorkspacePreview } from "./workspace-preview";

export default {
  title: "Components/Workspace Preview",
  component: WorkspacePreview,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    name: "Workspace Name",
  },
};
