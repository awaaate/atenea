"use client";
import { useNode, type UserComponent } from "@craftjs/core";

import {
  ComponentWithRichEditor,
  useRichEditor,
} from "../../hooks/rich-text/use-rich-editor";
import {
  createWidgetProps,
  Widget,
  WidgetProps,
} from "../../widget/widget-types";
import { useEffect } from "react";
import { useRef } from "react";
import { WidgetRoot } from "../../widget/widget-root";
import { FloatingMenuPlugin } from "./floating-menu-plugin";
import RichEditorProvider from "./rich-editor-provider";
import { TextWidgetConfig } from "./text-widget-config";

export type TextProps = WidgetProps & ComponentWithRichEditor;

export const TextInner: UserComponent = ({ children }) => {
  const editableRef = useRef<HTMLDivElement | null>(null);

  const {
    connectors: { connect, drag },
    actions: { setProp },
    store,
    id,
  } = useNode((state) => {});

  const { setEditorRef } = useRichEditor({
    namespace: id,
    onError: (error) => {
      console.error(error, id);
    },
  });

  return (
    <>
      <div
        ref={(ref) => {
          if (!ref) return;
          editableRef.current = ref;
          setEditorRef(ref);
        }}
        onChange={(event) => {
          console.log(event, "resize");
        }}
        contentEditable={true}
        className="prose prose-default m-0 max-w-full prose-headings:text-text prose-p:px-4 py-6 focus:outline-none prose-headings:p-0 prose-headings:my-2 prose-p:my-1 px-4"
      ></div>
      <RichEditorProvider Comp={FloatingMenuPlugin} />
    </>
  );
};

export const Text: Widget<TextProps> = ({ ...props }) => {
  return (
    <WidgetRoot
      dataFetcher={["text", () => Promise.resolve({})]}
      inner={(data) => <TextInner {...props} />}
      fullScreen={(data) => <TextInner {...props} />}
    />
  );
};
Text.craft = {
  defaultProps: createWidgetProps({
    layout: {
      w: 12,
      h: 10,
      x: 0,
      y: 0,
      i: "text",
    },
  }),
  related: {
    toolbar: TextWidgetConfig,
  },
  displayName: "Text",
};
