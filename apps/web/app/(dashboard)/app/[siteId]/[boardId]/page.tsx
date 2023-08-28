"use client";
import React from "react";
import { DefaultFrame, Editor, EditorTopbar } from "@shared/editor";

export default function Page() {
  return (
    <Editor>
      <div className="flex flex-col h-full">
        <EditorTopbar />
        <div className="w-full max-w-5xl m-auto  bg-background-default h-full">
          <DefaultFrame />
        </div>
      </div>
    </Editor>
  );
}
