import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/src/dropdown-menu";
import { Separator } from "@shared/ui/src/separator";

import { Icon } from "@shared/ui/src/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui/src/tooltip";
import { nanoid } from "nanoid";
import { useEditorStore } from "../engine/editor";
import { useNode, useNodeActions } from "../engine/nodes";
import { TextWidget } from "../user-components/text";

const WidgetMenu = () => {
  const { id } = useNode();
  const isTextWidget = useNode(
    (node) => node.data.name === TextWidget.node.name
  );
  const createNode = useEditorStore((state) => state.create);
  const selectNode = useEditorStore((state) => state.select);

  const setSidebar = useEditorStore((state) => state.setSidebar);
  const editable = useEditorStore((state) => state.editable);
  const { setNode, remove, select } = useNodeActions();

  if (!editable) return null;

  return (
    <DropdownMenu>
      {/* TODO imrove tooltips */}

      {!isTextWidget && (
        <>
          <Icon
            name="Maximize2"
            className="m-1 mr-2 text-text-weakest grid-item-part"
            variant="button"
            onClick={() => {
              setNode((node) => {
                node.data.props.fullScreen = true;
                return node;
              });
            }}
          />
          <Separator orientation="vertical" className="h-[20px] " />
        </>
      )}
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger className="border-0 shadow-[0] m-1   p-0">
            <Icon
              name="MoreHorizontal"
              className="text-text-weakest"
              size="m"
              variant={"button"}
            />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Widget Options</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56 grid-item-part">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              select();
              setSidebar("node");
            }}
          >
            <Icon name="Settings2" className="mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              const nodeToDuplicate = useEditorStore.getState().nodes[id];
              const newId = nanoid();

              createNode({
                ...nodeToDuplicate,
                id: newId,
              });

              selectNode(newId);
            }}
          >
            <Icon name="Copy" className="mr-2" />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              remove();
            }}
          >
            <Icon name="Trash2" className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { WidgetMenu };
