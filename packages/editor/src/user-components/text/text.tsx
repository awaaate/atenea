"use client";

import { useRef } from "react";
import { useEditorStore } from "../../engine/editor";
import { useNode } from "../../engine/nodes";
import {
  ComponentWithRichEditor,
  useRichEditor,
} from "../../hooks/rich-text/use-rich-editor";
import { WidgetRoot } from "../../widget/widget-root";
import {
  Widget,
  WidgetProps,
  createWidgetProps,
} from "../../widget/widget-types";
import { FloatingMenuPlugin } from "./floating-menu-plugin";
import RichEditorProvider from "./rich-editor-provider";
import { TextWidgetConfig } from "./text-widget-config";
import { createEditor } from "lexical";
import { parseEditorState } from "lexical/LexicalUpdates";
import {
  createFreshEditorState,
  initializeEditor,
} from "../../hooks/rich-text/initializeEditor";

export type TextProps = WidgetProps & ComponentWithRichEditor;

export const TextInner = () => {
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
      <RichEditorProvider Comp={FloatingMenuPlugin} />
    </>
  );
};

export const Text: Widget<TextProps> = ({ ...props }) => {
  return (
    <WidgetRoot
      dataFetcher={["text", () => Promise.resolve({})]}
      inner={(data) => <TextInner />}
      fullScreen={(data) => <TextInner />}
    />
  );
};

Text.node = {
  defaultProps: createWidgetProps({
    layout: {
      w: Infinity,
      h: 10,
      x: 0,
      y: 0,
      i: "text",
    },
    initialEditorState: null as any, //createFreshEditorState(),
  }),
  related: {
    toolbar: TextWidgetConfig,
  },
  displayName: "Text",
};
