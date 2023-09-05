import React, { useMemo } from "react";

import { useEditorStore } from "../editor/store";
import { NodeId } from "../interfaces";
import { NodeElement } from "./node-element";
import { useNode } from "./use-node";

type RenderNodeToElementType = {
  render?: React.ReactElement;
};
export const RenderNodeToElement: React.FC<
  React.PropsWithChildren<RenderNodeToElementType>
> = ({ render }) => {
  const { hidden } = useNode((node) => ({
    hidden: node.data.hidden,
  }));

  const { onRender } = useEditorStore((state) => ({
    onRender: state.options.onRender,
  }));

  // don't display the node since it's hidden
  if (hidden) {
    return null;
  }

  return React.createElement(onRender, { render: render || <DefaultRender /> });
};

export const DefaultRender = () => {
  const { type, props, nodes, hydrationTimestamp } = useNode((node) => ({
    type: node.data.type,
    props: node.data.props,
    nodes: node.data.nodes,
    hydrationTimestamp: node._hydrationTimestamp,
  }));

  return useMemo(() => {
    let children = props.children as React.ReactNode;

    if (nodes && nodes.length > 0) {
      children = (
        <React.Fragment>
          {nodes.map((id: NodeId) => (
            <NodeElement id={id} key={id} />
          ))}
        </React.Fragment>
      );
    }

    const render = React.createElement(type, props, children);

    return render;
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [type, props, hydrationTimestamp, nodes]);
};
