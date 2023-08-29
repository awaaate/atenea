import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  TooltipProvider,
} from "@shared/ui";
import { nanoid } from "nanoid";
import { useEditorStore } from "../engine/editor";
import { useNode, useNodeActions } from "../engine/nodes";

const WidgetMenu = () => {
  const isTextWidget = useNode((node) => node.data.displayName === "Text");
  const isActive = useNode((node) => node.events.selected);
  const createNode = useEditorStore((state) => state.create);

  const { setNode, remove } = useNodeActions();

  if (!isActive) return null;
  return (
    <DropdownMenu>
      {/* TODO imrove tooltips */}
      <TooltipProvider>
        <DropdownMenuTrigger className="absolute top-0 right-0 border-0 shadow-[0] z-[2] m-1  rounded-full icon-xl  p-0 ring ring-blue-300 hover:ring-blue-500"></DropdownMenuTrigger>
      </TooltipProvider>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
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
              <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={() => {}}>
            <Icon name="Settings2" className="mr-2" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
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
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { WidgetMenu };
