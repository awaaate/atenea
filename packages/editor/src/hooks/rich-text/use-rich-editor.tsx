"use client";

import { useCallback, useEffect } from "react";
import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  createEditor,
  type CreateEditorArgs,
  type EditorState,
  type EditorThemeClasses,
  type Klass,
  type LexicalEditor,
  type LexicalNode,
} from "lexical";

import { CAN_USE_DOM } from "../../lib/can-use-dom";
import useLayoutEffect from "../use-layout-effect";
import { TextProps } from "../../user-components/text";
import { useNode, useNodeActions } from "../../engine/nodes";

export type ComponentWithRichEditor = {
  richEditor: LexicalEditor | null;
};

export type InitialEditorStateType =
  | null
  | string
  | EditorState
  | ((editor: LexicalEditor) => void);

const HISTORY_MERGE_OPTIONS = { tag: "history-merge" };

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
  editorState?: InitialEditorStateType;
}>;

export const useRichEditor = (initialConfig: InitialConfigType) => {
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

        const height = Math.ceil(size.height / 20);

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
    if (!richEditor) {
      const editor = createEditor({
        ...config,
        onError: (error) => {
          initialConfig?.onError(error, editor);
        },
        namespace: initialConfig?.namespace ?? config.namespace,
        nodes: initialConfig?.nodes ?? config.nodes,
        editable: initialConfig?.editable,
        theme: initialConfig?.theme,
      });
      initializeEditor(editor, initialConfig?.editorState);
      initRichText(editor);
      initMarkdownShortCuts(editor);

      setNode((node) => {
        node.data.props.richEditor = editor;
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

function initializeEditor(
  editor: LexicalEditor,
  initialEditorState?: InitialEditorStateType
): void {
  if (initialEditorState === null) {
    return;
  } else if (initialEditorState === undefined) {
    editor.update(() => {
      const root = $getRoot();
      if (root.isEmpty()) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        const activeElement = CAN_USE_DOM ? document.activeElement : null;
        if (
          $getSelection() !== null ||
          (activeElement !== null && activeElement === editor.getRootElement())
        ) {
          paragraph.select();
        }
      }
    }, HISTORY_MERGE_OPTIONS);
  } else if (initialEditorState !== null) {
    switch (typeof initialEditorState) {
      case "string": {
        const parsedEditorState = editor.parseEditorState(initialEditorState);
        editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case "object": {
        editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case "function": {
        editor.update(() => {
          const root = $getRoot();
          if (root.isEmpty()) {
            initialEditorState(editor);
          }
        }, HISTORY_MERGE_OPTIONS);
        break;
      }
    }
  }
}
