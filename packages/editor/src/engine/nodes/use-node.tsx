import { useMemo, useContext } from "react";
import invariant from "tiny-invariant";

import { NodeContext } from "./node-context";

import { Node } from "../interfaces";
import { useEditorStore } from "../editor/store";

export function useNode<S = null>(collect?: (node: Node) => S) {
  const context = useContext(NodeContext);
  invariant(context, "ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT");

  const { id, related } = context;

  const { actions, ...collected } = useEditorStore((state) => {
    const currentNode = state.nodes[id];
    const nodeCollected = collect ? collect(currentNode) : ({} as S);
    return {
      ...nodeCollected,
      actions: {
        ...state.actions,
        setProp(cb: (node: Node) => Node) {
          state.actions.setProp(id, cb);
        },
        select() {
          state.actions.select(id);
        },
        hover() {
          state.actions.hover(id);
        },
      },
    };
  });

  return {
    ...collected,
    id,
    related,
    inNodeContext: !!context,
    actions,
  };
}
