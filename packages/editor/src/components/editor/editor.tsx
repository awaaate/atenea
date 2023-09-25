"use client";

import React, { HTMLAttributes } from "react";
import { useEditorStore } from "../../engine/editor";
import { Grid } from "../grid";

import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { cn } from "@shared/ui/src/utils";

const Editor: React.FC<React.ComponentProps<typeof ScrollArea>> = ({
  children,
  className,
  ...props
}) => {
  const background = useEditorStore.use.pageBackground();
  const setSidebar = useEditorStore.use.setSidebar();
  const unSelectAll = useEditorStore.use.unSelectAll();

  return (
    <div
      {...props}
      className={cn(
        className,
        "h-full overflow-hidden p-6 flex-1 bg-surface-lowered"
      )}
      style={{
        background: background,
      }}
      onClick={(event) => {
        //check if click is on the editor

        //@ts-expect-error
        const isChildOfGridItem = event.target?.closest(".grid-item-part");
        if (isChildOfGridItem) return;
        unSelectAll();
        setSidebar(null);
      }}
    >
      <div className="mx-auto bg-surface-raised rounded-lg shadow-card flex-1  overflow-hidden max-w-5xl ">
        {children}
        <div className="px-6 py-4">
          <Grid />
        </div>
      </div>
    </div>
  );
};

export { Editor };
