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

export type TextProps = WidgetProps & ComponentWithRichEditor;

const TextInner = lazy(() =>
  import("./text-inner").then((module) => ({
    default: module.TextInner,
  }))
);
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
