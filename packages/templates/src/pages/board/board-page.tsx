"use client";
import {
  Editor,
  EditorSidebar,
  EditorTitle,
  EditorTopbar,
  useEditorStore,
} from "@shared/editor";

export const BoardPage = () => {
  //get the editor data each 20s

  const editable = useEditorStore.use.editable();

  return (
    <div className="flex w-full h-full">
      <div className="h-full flex-1">
        {editable && <EditorTopbar />}

        <Editor>
          <EditorTitle />
        </Editor>
      </div>
      {editable && <EditorSidebar />}
    </div>
  );
};
