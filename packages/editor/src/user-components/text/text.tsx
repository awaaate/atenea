"use client";
import { lazy } from "react";
import { ComponentWithRichEditor } from "../../hooks/rich-text/use-rich-editor";
import { WidgetFactory } from "../../widget/widget-factory";
import { WidgetProps } from "../../widget/widget-types";
import { LoadingText } from "./loading-text";
import { TextWidgetConfig } from "./text-widget-config";
export type TextProps = WidgetProps & ComponentWithRichEditor;

const TextInner = lazy(() =>
  import("./text-inner").then((module) => ({
    default: module.TextInner,
  }))
);

export const TextWidget = WidgetFactory.createWidget({
  name: "Text",
  icon: "Text",
  group: "Basic",
  displayName: "Text",
  View: TextInner,
  Config: TextWidgetConfig,
  FullScreenView: TextInner,
  skeleton: LoadingText,
  dataFetcher: {
    key: "text",

    fetcher: async (args) => {
      return {};
    },
  },
  initialProps: {
    initialEditorState: null,
    layout: {
      h: 7,
      w: Infinity,
      x: 0,
      y: Infinity,
    },
  },
});
