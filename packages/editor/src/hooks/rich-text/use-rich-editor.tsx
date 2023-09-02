"use client";

import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import {
  createEditor,
  type CreateEditorArgs,
  type EditorState,
  type EditorThemeClasses,
  type Klass,
  type LexicalEditor,
  type LexicalNode,
} from "lexical";
import { useCallback, useEffect } from "react";

import { useNode, useNodeActions } from "../../engine/nodes";
import { WidgetProps } from "../../widget/widget-types";
import useLayoutEffect from "../use-layout-effect";
import { initializeEditor } from "./initializeEditor";
import { useEditorStore } from "../../engine/editor";

export type ComponentWithRichEditor = WidgetProps & {
  richEditor: LexicalEditor | null;
  initialEditorState: EditorState;
};

export type InitialEditorStateType =
  | null
  | string
  | EditorState
  | ((editor: LexicalEditor) => void);

export const HISTORY_MERGE_OPTIONS = { tag: "history-merge" };

function initRichText(editor: LexicalEditor) {
  return registerRichText(editor);
}

function initMarkdownShortCuts(
  editor: LexicalEditor,
  transformers = TRANSFORMERS
) {
  return registerMarkdownShortcuts(editor, transformers);
}

const config: CreateEditorArgs = {
  onError: (error) => {
    console.error(error);
  },
  namespace: "craftjs",
  nodes: [
    CodeNode,
    HeadingNode,
    LinkNode,
    ListNode,
    ListItemNode,
    AutoLinkNode,
    QuoteNode,
  ],
};
export type InitialConfigType = Readonly<{
  editor__DEPRECATED?: LexicalEditor | null;
  namespace: string;
  nodes?: ReadonlyArray<
    | Klass<LexicalNode>
    | {
        replace: Klass<LexicalNode>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        with: <T extends { new (...args: any): any }>(
          node: InstanceType<T>
        ) => LexicalNode;
      }
  >;
  onError: (error: Error, editor: LexicalEditor) => void;
  editable?: boolean;
  theme?: EditorThemeClasses;
  intialEditorState?: InitialEditorStateType;
}>;

export const useRichEditor = (initialConfig: InitialConfigType) => {
  const editable = useEditorStore.use.editable();

  const richEditor = useNode(
    (node) => (node.data.props as ComponentWithRichEditor).richEditor
  );

  const { setNode } = useNodeActions();
  const setEditorRef = useCallback(
    (rootElement: null | HTMLElement) => {
      if (!richEditor) return;
      richEditor.setRootElement(rootElement);
    },
    [richEditor]
  );

  useEffect(() => {
    if (!richEditor) return;
    const removeUpdateListener = richEditor.registerUpdateListener(
      ({ editorState }) => {
        // The latest EditorState can be found as `editorState`.
        // To read the contents of the EditorState, use the following API:
        const size = richEditor.getRootElement()?.getBoundingClientRect();
        if (!size) return;

        const height = Math.ceil(size.height / 20) + 3;

        setNode((node) => {
          node.data.props.layout.h = height;
          return node;
        });
      }
    );
    return () => {
      removeUpdateListener();
    };
  }, [richEditor]);

  useEffect(() => {
    if (!richEditor) return;

    richEditor.setEditable(editable !== undefined ? editable : true);
  }, [richEditor, editable]);

  useEffect(() => {
    if (!richEditor) {
      console.log("CREATING NEW EDITOR", richEditor);
      const editor = createEditor({
        onError: (error) => {
          console.error(error);
          initialConfig?.onError(error, editor);
        },
        namespace: initialConfig?.namespace ?? config.namespace,
        nodes: initialConfig?.nodes ?? config.nodes,
        editable: initialConfig?.editable,
        theme: initialConfig?.theme,
      });
      initializeEditor(editor, initialConfig.intialEditorState);
      initRichText(editor);
      initMarkdownShortCuts(editor);

      setNode((node) => {
        (node.data.props as ComponentWithRichEditor).richEditor = editor;
        return node;
      });
    }
  }, []);
  useLayoutEffect(() => {
    const isEditable = initialConfig.editable;

    if (!richEditor) return;
    richEditor.setEditable(isEditable !== undefined ? isEditable : true);

    // We only do this for init
  }, []);

  return {
    setEditorRef,
  };
};
