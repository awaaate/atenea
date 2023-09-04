"use client";
import { Suspense } from "react";
import { useRef } from "react";
import { useEditorStore } from "../../engine/editor";
import { useNode } from "../../engine/nodes";
import {
  ComponentWithRichEditor,
  useRichEditor,
} from "../../hooks/rich-text/use-rich-editor";

import { lazy } from "react";

export const RichEditorProvider = lazy(() => import("./rich-editor-provider"));
export const FloatingMenuPlugin = lazy(() =>
  import("./floating-menu-plugin").then((module) => ({
    default: module.FloatingMenuPlugin,
  }))
);
export function TextInner() {
  const editableRef = useRef<HTMLDivElement | null>(null);
  const isEditable = useEditorStore.use.editable();
  const initialEditorState = useNode(
    (node) => (node.data.props as ComponentWithRichEditor).initialEditorState
  );
  const { id } = useNode();
  const { setEditorRef } = useRichEditor({
    namespace: id,
    onError: (error) => {
      console.error(error, id);
    },
    intialEditorState: initialEditorState,
    editable: isEditable,
  });

  return (
    <>
      <div
        ref={(ref) => {
          if (!ref) return;
          editableRef.current = ref;
          setEditorRef(ref);
        }}
        contentEditable={isEditable}
        className="prose cursor-text prose-default m-0 max-w-full prose-headings:text-text prose-p:px-4 py-6 focus:outline-none prose-headings:p-0 prose-headings:my-2 prose-p:my-1 px-4"
      ></div>
      <Suspense fallback={null}>
        <RichEditorProvider Comp={FloatingMenuPlugin} />
      </Suspense>
    </>
  );
}
