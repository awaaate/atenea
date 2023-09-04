import React, { Suspense } from "react";

import { NodeProvider } from "./node-context";

import { NodeId } from "../interfaces";
import { RenderNodeToElement } from "./node-render";

export type NodeElementProps = {
  id: NodeId;
  render?: React.ReactElement;
};

export const NodeElement: React.FC<
  React.PropsWithChildren<NodeElementProps>
> = ({ id, render }) => {
  return (
    <NodeProvider id={id}>
      <RenderNodeToElement render={render} />
    </NodeProvider>
  );
};
