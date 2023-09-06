"use client";
import { useEditorStore } from "@shared/editor";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import React from "react";

export const BoardPreviewButton = () => {
  return (
    <Button
      onClick={() => {
        useEditorStore.setState({
          editable: !useEditorStore.getState().editable,
        });
      }}
      className="fixed bottom-4 right-4"
    >
      Preview
      <Icon name="Eye" className="ml-2" />
    </Button>
  );
};
