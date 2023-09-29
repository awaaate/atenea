import { useEditorStore } from "../../engine/editor";

import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Link } from "@shared/ui/src/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/src/popover";

export const ShareButton = () => {
  const boardId = useEditorStore.use.boardId();
  return (
    <Popover>
      <PopoverTrigger className="bg-accent  text-text-on-accent hover:bg-accent/70">
        <Icon name="Share" className="mr-2" />
        Share
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-text-weak ">
          Share this board with anyone by sending them the link below.
        </p>
        <Link href={`/w/${boardId}`} target="_blank" rel="noopener noreferrer">
          <span className="flex gap-2 p-2 items-center justify-between bg-nav-surface shadow-sm mt-2 group hover:shadow-popout rounded-pill border">
            <span className="text-text-weaker text-sm">{`https://www.atenea.wtf/w/${boardId}`}</span>
            <Icon
              name="ArrowRight"
              className="group-hover:text-accent transition-colors"
            />
          </span>
        </Link>
      </PopoverContent>
    </Popover>
  );
};
