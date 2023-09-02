import { Editor } from "./editor";
import { EditorTopbar } from "../editor-topbar";
import React, { useEffect } from "react";
import { loadEditorState, useEditorStore } from "../../engine/editor";
import { EditorState } from "../../engine/interfaces";

import type { Meta, StoryObj } from "@storybook/react";

const EditorProvider = (a: any) => {
  useEffect(() => {
    loadEditorState(a);
  }, []);

  return (
    <div className="flex">
      <div className="w-full max-w-5xl m-auto ">
        <EditorTopbar />
        <Editor />
      </div>
    </div>
  );
};

const meta = {
  component: EditorProvider,
  title: "Editor/EditorProvider",
  tags: ["autodocs"],
} satisfies Meta<typeof EditorProvider>;

export const Default: StoryObj<typeof meta> = {
  args: {
    nodes: {
      wFE4UiKuoDBWdpK9pwPZa: {
        id: "wFE4UiKuoDBWdpK9pwPZa",
        dom: null,
        data: {
          name: "eN",
          nodes: [],
          props: {
            width: 100,
            height: 100,
            layout: {
              h: 9,
              i: "wFE4UiKuoDBWdpK9pwPZa",
              w: 3,
              x: 0,
              y: 0,
              moved: false,
              static: false,
            },
            controls: "simple",
            gridSpan: 1,
            background: "transparent",
            fullScreen: false,
            paddingTop: 0,
            richEditor: {
              editorState: {
                root: {
                  type: "root",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      tag: "h2",
                      type: "heading",
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "Hello world this is just a test me cago",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                    },
                    {
                      type: "paragraph",
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "ewr",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                    },
                    {
                      type: "paragraph",
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: "normal",
                          text: "wer",
                          type: "text",
                          style: "",
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                    },
                    {
                      type: "paragraph",
                      format: "",
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: "ltr",
                    },
                  ],
                  direction: "ltr",
                },
              },
            },
            sidePannel: false,
            paddingLeft: 0,
            borderRadius: 0,
            paddingRight: 0,
            paddingBottom: 0,
            initialEditorState: {
              root: {
                type: "root",
                format: "",
                indent: 0,
                version: 1,
                children: [
                  {
                    tag: "h2",
                    type: "heading",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: "normal",
                        text: "Hello world this is just a test ewr",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },
                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: "normal",
                        text: "ewr",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },
                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: "normal",
                        text: "wer",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },
                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,
                    children: [],
                    direction: "ltr",
                  },
                ],
                direction: "ltr",
              },
            },
          },
          hidden: false,
          parent: null,
          displayName: "Text",
          linkedNodes: {},
        },
        events: { dragged: false, hovered: false, selected: false },
        related: {},
        _hydrationTimestamp: 1693584299727,
      },
    },
    events: {
      selected: [],
      hovered: [],
      dragged: [],
    },
  },
};

export default meta;
