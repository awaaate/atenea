import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
} from "lexical";
import { forwardRef, useEffect, useState } from "react";

import { $findMatchingParent } from "@lexical/utils";

import { Icon } from "@shared/ui/src/icon";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@shared/ui/src/dropdown-menu";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@shared/ui/src/toolbar";

import {
  BlockType,
  blockIcon,
  blockTypeToBlockName,
  formatNode,
  getNodeName,
} from "../../hooks/rich-text/utils";

export type FloatingMenuCoords = { x: number; y: number } | undefined;

type FloatingMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
  type: BlockType;
};

type FloatingMenuProps = {
  editor: LexicalEditor;
  coords: FloatingMenuCoords;
};

export const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  function FloatingMenu(props, ref) {
    const { editor, coords } = props;

    const shouldShow = coords !== undefined;
    const [state, setState] = useState<FloatingMenuState>({
      isBold: false,
      isCode: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      type: "paragraph",
    });

    useEffect(() => {
      if (!editor) return;
      const unregisterListener = editor.registerUpdateListener(
        ({ editorState }) => {
          editorState.read(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            const anchorNode = selection.anchor.getNode();

            let element =
              anchorNode.getKey() === "root"
                ? anchorNode
                : $findMatchingParent(anchorNode, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                  });

            const nodeType = getNodeName(element, anchorNode);
            setState({
              isBold: selection.hasFormat("bold"),
              isCode: selection.hasFormat("code"),
              isItalic: selection.hasFormat("italic"),
              isStrikethrough: selection.hasFormat("strikethrough"),
              isUnderline: selection.hasFormat("underline"),
              type: nodeType,
            });
          });
        }
      );
      return unregisterListener;
    }, [editor]);

    return (
      <Toolbar
        ref={ref}
        className="bg-surface-default shadow-popout p-1 rounded-default flex"
        aria-hidden={!shouldShow}
        style={{
          position: "absolute",
          top: coords?.y,
          left: coords?.x,
          visibility: shouldShow ? "visible" : "hidden",
          opacity: shouldShow ? 1 : 0,
        }}
      >
        <DropdownMenu>
          <ToolbarButton asChild>
            <DropdownMenuTrigger className="shadow-none border-0">
              <Icon name={blockIcon[state.type]} className="mr-2" />
            </DropdownMenuTrigger>
          </ToolbarButton>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {Object.keys(blockTypeToBlockName).map((type: string, index) => {
                const iconName = blockIcon[type as BlockType];
                return (
                  <DropdownMenuCheckboxItem
                    key={type}
                    onSelect={() => {
                      formatNode(type as BlockType, editor, state.type);
                    }}
                    checked={state.type === type}
                  >
                    <Icon name={iconName} className="mr-2" />
                    {blockTypeToBlockName[type as BlockType]}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToolbarSeparator />
        <ToolbarToggleGroup
          type="multiple"
          value={Object.keys(state).filter(
            (key) => state[key as keyof FloatingMenuState]
          )}
        >
          <ToolbarToggleItem value="isBold">
            <Icon
              name="Bold"
              aria-label="Format text as bold"
              size="s"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
            />
          </ToolbarToggleItem>
          <ToolbarToggleItem value="isItalic">
            <Icon
              name="Italic"
              aria-label="Format text as italics"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
              }}
            />
          </ToolbarToggleItem>
          {/*  <ToolbarToggleItem value="isUnderline">
            <Icon
              name="Underline"
              aria-label="Format text to underlined"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
            />
          </ToolbarToggleItem>
          <ToolbarToggleItem value="isStrikethrough">
            <Icon
              name="Strikethrough"
              aria-label="Format text with a strikethrough"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
              }}
            />
          </ToolbarToggleItem> */}
          <ToolbarToggleItem value="isCode">
            <Icon
              name="Code"
              aria-label="Format text with inline code"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
              }}
            />
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    );
  }
);
