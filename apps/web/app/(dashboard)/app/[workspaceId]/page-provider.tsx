"use client";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import React, { useEffect } from "react";
interface WorkspacePageProviderProps {
  title: string;
  description: string;
}

export const WorkspacePageProvider: React.FC<WorkspacePageProviderProps> = (
  props
) => {
  useEffect(() => {
    useLayoutStore.setState({
      pageTitle: props.title,
      pageSubTitle: props.description,
    });
  }, [props]);
  return null;
};
