import React from "react";
import { useEditorStore } from "../../engine/editor";
import {
  Button,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui";

export const ShareButton = () => {
  const boardId = useEditorStore.use.boardId();
  return (
    <Popover>
      <PopoverTrigger className="px-0">
        <Button size="sm" variant={"primary"}>
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-text-weak">
          Share this board with anyone by sending them the link below.
        </p>
        <Link href={`/${boardId}`} targe="_blank">
          <div className="flex gap-2 p-2 items-center justify-between bg-nav-surface shadow-sm mt-2 group hover:shadow-popout">
            <span className="text-text-weaker text-sm">{`https://www.atenea.wtf/${boardId}`}</span>
            <Icon
              name="ArrowRight"
              className="group-hover:text-accent transition-colors"
            />
          </div>
        </Link>
      </PopoverContent>
    </Popover>
  );
};
