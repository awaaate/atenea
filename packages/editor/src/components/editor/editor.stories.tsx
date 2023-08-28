import { Button } from "@shared/ui";
import { DefaultFrame } from "./default-frame";
import { Editor } from "./editor";
import { EditorSidebar } from "./editor-sidebar";
import { EditorTopbar } from "./editor-topbar";

export default {
  title: "Editor",
};

const Template = () => {
  return (
    <Editor>
      <div className="flex">
        <div className="w-full max-w-5xl m-auto ">
          <EditorTopbar />
          <DefaultFrame />
        </div>
      </div>
    </Editor>
  );
};

export const Default = Template.bind({});
