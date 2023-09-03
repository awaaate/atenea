"use client";
import {
  Editor,
  EditorCoveImage,
  EditorSidebar,
  EditorTitle,
  EditorTopbar,
  useEditorStore,
} from "@shared/editor";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { cn } from "@shared/ui/src/utils";

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
