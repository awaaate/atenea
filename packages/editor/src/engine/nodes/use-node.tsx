import { useMemo, useContext, useCallback } from "react";
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
        deleteNode() {
          state.actions.remove(id);
        },
        setProp(cb: (node: Node) => Node) {
          state.actions.setProp(id, cb);
        },
      },
    };
  });

  const connect = useCallback((ref: HTMLElement | null) => {
    if (!ref) return;
    ref && actions.setProp((node) => ({ ...node, dom: ref }));

    const hoverHandler = (event: MouseEvent) => {
      if (event.target === ref) {
        actions.hover(id);
      }
    };
    const hoverExitHandler = (event: MouseEvent) => {
      if (event.target === ref) {
        actions.hover(id, false);
      }
    };

    const selectHandler = (event: MouseEvent) => {
      if (event.target === ref) {
        actions.select(id);
      }
    };

    ref.addEventListener("mouseover", hoverHandler);
    ref.addEventListener("mouseleave", hoverExitHandler);
    ref.addEventListener("click", selectHandler);

    /*     return () => {
      actions.setProp((node) => ({ ...node, dom: null }));
      ref.removeEventListener("mouseover", hoverHandler);
      ref.removeEventListener("mouseleave", hoverExitHandler);
      ref.removeEventListener("click", selectHandler);
    }; */
  }, []);
  return {
    ...collected,
    id,
    related,
    connect,
    inNodeContext: !!context,
    actions,
  };
}
