import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { nanoid } from "nanoid";
import { useEditorStore } from "../engine/editor";
import { useNode, useNodeActions } from "../engine/nodes";

const WidgetMenu = () => {
  const isTextWidget = useNode((node) => node.data.displayName === "Text");
  const createNode = useEditorStore((state) => state.create);
  const setSidebar = useEditorStore((state) => state.setSidebar);
  const editable = useEditorStore((state) => state.editable);
  const { setNode, remove, select } = useNodeActions();

  if (!editable) return null;

  return (
    <DropdownMenu>
      {/* TODO imrove tooltips */}

      <Icon
        name="Settings2"
        className="m-1 mr-2 text-text-weakest grid-item-part"
        variant="button"
        onClick={() => {
          select();
          setSidebar("node");
        }}
      />
      <Separator orientation="vertical" className="h-[20px] " />
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
          {!isTextWidget && (
            <DropdownMenuItem
              onSelect={() => {
                console.log("full screen");
                setNode((node) => {
                  node.data.props.fullScreen = true;
                  return node;
                });
              }}
            >
              <Icon name="Maximize2" className="mr-2" />
              Full Screen
            </DropdownMenuItem>
          )}
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
              const id = nanoid();
              const newNode = { ...useEditorStore.getState().nodes[id], id };
              createNode(newNode);
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
