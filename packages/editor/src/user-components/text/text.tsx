"use client";
import { lazy } from "react";
import { ComponentWithRichEditor } from "../../hooks/rich-text/use-rich-editor";
import { WidgetRoot } from "../../widget/widget-root";
import {
  Widget,
  WidgetProps,
  createWidgetProps,
} from "../../widget/widget-types";
import { TextWidgetConfig } from "./text-widget-config";
import { WidgetFactory } from "../../widget/widget-factory";
import { EditorState } from "lexical";

export type TextProps = WidgetProps & ComponentWithRichEditor;

const TextInner = lazy(() =>
  import("./text-inner").then((module) => ({
    default: module.TextInner,
  }))
);

export const TextWidget = WidgetFactory.createWidget({
  name: "Text",
  View: TextInner,
  Config: TextWidgetConfig,
  FullScreenView: TextInner,
  skeleton: <div className="bg-red-500 w-full h-full">Loading</div>,
  dataFetcher: {
    key: "text",
    collector: (props) => {
      return {
        initialEditorState: props.initialEditorState as EditorState,
      };
    },
    fetcher: async (args) => {
      if (!args)
        return {
          initialEditorState: null,
        };
      return {
        initialEditorState: args.initialEditorState,
      };
    },
  },
  initialProps: {
    initialEditorState: null,
    layout: {
      h: 4,
      w: Infinity,
      x: 0,
      y: Infinity,
    },
  },
});
