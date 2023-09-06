"use client";

import { Suspense, lazy } from "react";

import { ScrollArea } from "@shared/ui/src/scroll-area";
import { cn } from "@shared/ui/src/utils";
import { useEditorStore } from "@shared/editor/src/engine/editor";
import { Spinner } from "@shared/ui/src/spinner";

const EditorTopbar = lazy(() =>
  import("@shared/editor/src/components/editor-topbar").then((module) => ({
    default: module.EditorTopbar,
  }))
);
const EditorSidebar = lazy(() =>
  import("@shared/editor/src/components/editor-sidebar").then((module) => ({
    default: module.EditorSidebar,
  }))
);
const Editor = lazy(() =>
  import("@shared/editor/src/components/editor").then((module) => ({
    default: module.Editor,
  }))
);
const EditorCoveImage = lazy(() =>
  import("@shared/editor/src/components/editor-cover-image").then((module) => ({
    default: module.EditorCoveImage,
  }))
);
const EditorTitle = lazy(() =>
  import("@shared/editor/src/components/editor-title").then((module) => ({
    default: module.EditorTitle,
  }))
);

export const BoardPage = () => {
  //get the editor data each 20s

  const editable = useEditorStore.use.editable();
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100vh)] bg-background-default flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
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
    </Suspense>
  );
};
