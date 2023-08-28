"use client";

import { Editor as CraftEditor } from "@craftjs/core";
import { UserComponents } from "../../user-components";

import React from "react";

const Editor = ({ ...props }: React.ComponentProps<typeof CraftEditor>) => {
  return (
    <CraftEditor
      resolver={UserComponents as any}
      indicator={{
        thickness: 2,
        success: "blue",
        error: "transparent",
        transition: "",
      }}
      {...props}
    />
  );
};

export { Editor };
