"use client";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  createEditor,
  type LexicalEditor,
} from "lexical";
import { CAN_USE_DOM } from "../../lib/can-use-dom";
import {
  InitialEditorStateType,
  HISTORY_MERGE_OPTIONS,
} from "./use-rich-editor";

export function initializeEditor(
  editor: LexicalEditor,
  initialEditorState?: InitialEditorStateType
): void {
  console.log(initialEditorState, "initializeEditor");
  console.log(editor, "initializeEditor");
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
        editor.setEditorState(
          editor.parseEditorState(JSON.stringify(initialEditorState))
        );
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

export const createFreshEditorState = () => {
  const editor = createEditor();
  editor.parseEditorState("");
  return editor.getEditorState();
};
