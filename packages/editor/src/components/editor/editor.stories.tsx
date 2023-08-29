import { Editor } from "./editor";
import { EditorTopbar } from "./editor-topbar";

export default {
  title: "Editor",
};

const Template = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-full max-w-5xl m-auto ">
          <EditorTopbar />
          <Editor />
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
