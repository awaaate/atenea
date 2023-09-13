"use client";
import React from "react";
import { useEditorStore } from "../../engine/editor";
import { useToast } from "@shared/ui/src/toast";
import { cn } from "@shared/ui/src/utils";
import { Icon } from "@shared/ui/src/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui/src/tooltip";
import { Separator } from "@shared/ui/src/separator";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import { API_URL } from "../../constants";

const { useUploadThing } = generateReactHelpers();

interface EditorCoveImageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function EditorCoveImage({
  children,
  className,
  ...props
}: EditorCoveImageProps) {
  const { toast } = useToast();
  const coverImage = useEditorStore.use.coverImage();
  const setCoverImage = useEditorStore.use.setCoverImage();
  const coverImageEnabled = useEditorStore.use.coverImageEnabled();
  const editable = useEditorStore.use.editable();

  const { startUpload } = useUploadThing("boardCoverImage", {
    onClientUploadComplete: (file) => {
      if (!file || !file[0]) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setCoverImage(file[0].url);
    },
    onUploadError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    },
    onUploadBegin: () => {},
  });
  if (!coverImageEnabled) return null;

  return (
    <div
      {...props}
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
      className={cn(
        "w-full h-[200px] rounded-default overflow-hidden mb-4 bg-surface-lowered  bg-cover bg-center relative",
        className
      )}
    >
      {editable && (
        <div className="bg-surface-default px-3 py-1 absolute right-0 top-0 w-min rounded-pill flex items-center gap-2 m-2 grid-item-parts">
          <Tooltip>
            <TooltipTrigger>
              <button className="outline-none relative">
                <input
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 "
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files: File[] = [];
                      for (let i = 0; i < e.target.files.length; i++) {
                        files.push(e.target.files[i]);
                      }
                      startUpload(files);
                    }
                  }}
                />
                <Icon name="Pencil" variant={"button"} size="s" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Change cover image</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-[25px]" />
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={() => {
                  useEditorStore.setState({ coverImageEnabled: false });
                }}
              >
                <Icon name="Trash2" variant={"button"} size="s" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete cover image</TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
