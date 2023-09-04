import { useMemo, useContext, useCallback } from "react";
import invariant from "tiny-invariant";

import { NodeContext } from "./node-context";

import { Node } from "../interfaces";
import { useEditorStore } from "../editor/store";

export function useNode<S = undefined>(
  collect?: (node: Node) => S
): S extends undefined ? { id: string; related?: boolean } : S {
  const context = useContext(NodeContext);
  invariant(context, "ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT");

  const { id, related } = context;

  if (!collect)
    return {
      id,
      related,
    } as any;

  const collected = useEditorStore(
    useCallback((state) => collect(state.nodes[id]), [id])
  );

  return collected as any;
}
export function useNodeActions() {
  const context = useContext(NodeContext);

  if (!context) {
    throw new Error("ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT");
  }

  const { id } = context;

  const remove = useEditorStore.use.remove();
  const selectNode = useEditorStore.use.select();
  const setNode = useEditorStore.use.setNode();

  //memoise

  const actions = useMemo(() => {
    return {
      remove: () => {
        remove(id);
      },
      select: () => {
        console.log({ id }, "select");
        selectNode(id);
      },
      //set node
      setNode: (cb: (node: Node) => Node) => {
        setNode(id, cb);
      },
    };
  }, [id]);

  return actions;
}
