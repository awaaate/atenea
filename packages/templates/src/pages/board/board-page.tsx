"use client";
import {
  Editor,
  EditorCoveImage,
  EditorSidebar,
  EditorTitle,
  EditorTopbar,
  useEditorStore,
} from "@shared/editor";
import { ScrollArea, cn } from "@shared/ui";

export const BoardPage = () => {
  //get the editor data each 20s

  const editable = useEditorStore.use.editable();
  return (
    <>
      <div className="w-full h-full">
        {editable && <EditorTopbar />}
        <ScrollArea
          className={cn(" h-screen flex flex-col", {
            "h-[calc(100vh-50px)]": editable,
            "h-[calc(100vh)]": editable,
          })}
        >
          <Editor>
            <EditorCoveImage />
            <EditorTitle />
          </Editor>
        </ScrollArea>
      </div>
      {editable && <EditorSidebar />}
    </>
  );
};
