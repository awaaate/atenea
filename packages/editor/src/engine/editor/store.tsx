//Store of the editor
//the store has saved the state of the editor

import { EditorState } from "../interfaces/editor";
import { NodeId } from "../interfaces/nodes";

import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { createSelectors } from "./store-selectors";
import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
const useEditorStoreBase = createWithEqualityFn<EditorState>()(
  persist(
    (set, get) => ({
      nodes: {},
      events: {
        dragged: new Set<NodeId>(),
        selected: new Set<NodeId>(),
        hovered: new Set<NodeId>(),
      },
      options: {
        enabled: true,
        onRender: ({ render }) => render,
        resolver: {},
      },
      connectNode: (id, dom) => {
        set((state) => {
          const node = state.nodes[id];

          if (node) {
            const updatedNode = {
              ...node,
              dom,
            };

            const newNodes = { ...state.nodes };
            newNodes[id] = updatedNode;

            return {
              nodes: newNodes,
            };
          }
          return state;
        });
      },
      setNode: (id, cb) => {
        set((state) => {
          const node = state.nodes[id];

          if (node) {
            const updatedNode = cb(node);

            const newNodes = { ...state.nodes };
            newNodes[id] = updatedNode;

            return {
              nodes: newNodes,
            };
          }
          return state;
        });
      },
      select: (id, value: boolean = true) => {
        set((state) => {
          state.events.selected.forEach((selectedId) => {
            const currentNode = state.nodes[selectedId];
            currentNode.events.selected = false;
          });

          const currentNode = state.nodes[id];
          currentNode.events.selected = value;

          const selected = new Set<string>();
          if (!value) {
            //TODO: remove from selected, multiple selection
            //selected.delete(id);
          } else {
            selected.add(id);
          }

          return {
            nodes: {
              ...state.nodes,
              [id]: currentNode,
            },
            events: {
              ...state.events,
              selected,
            },
          };
        });
      },
      hover: (id, value: boolean = true) => {
        set((state) => {
          const currentNode = state.nodes[id];
          currentNode.events.hovered = value;

          const hovered = new Set<string>();
          if (!value) {
            hovered.delete(id);
          } else {
            hovered.add(id);
          }

          return {
            nodes: {
              ...state.nodes,
              [id]: currentNode,
            },
            events: {
              ...state.events,
              hovered,
            },
          };
        });
      },
      drag: (id) => {},
      create: (node) => {
        set((state) => {
          const newNodes = { ...state.nodes };
          newNodes[node.id] = node;

          return {
            nodes: newNodes,
          };
        });
      },
      remove: (id) => {
        set((state) => {
          const newNodes = { ...state.nodes };
          delete newNodes[id];

          return {
            nodes: newNodes,
          };
        });
      },

      setLayout: (layout: ReactGridLayout.Layout[]) => {
        //set the layout for each child
        const nodes = layout.map((layoutItem) => {
          return {
            ...get().nodes[layoutItem.i],
            data: {
              ...get().nodes[layoutItem.i].data,
              props: {
                ...get().nodes[layoutItem.i].data.props,
                layout: layoutItem,
              },
            },
          };
        });

        set((state) => {
          const newNodes = { ...state.nodes };
          nodes.forEach((node) => {
            newNodes[node.id] = node;
          });

          return {
            nodes: newNodes,
          };
        });
      },
    }),
    {
      name: "editore", // unique name
      storage: createJSONStorage(() => sessionStorage), // (}}
    }
  ),
  shallow
);
export const selectors = {
  toolbar: (state: EditorState) => {
    const currentlySelectedNodeId = state.events.selected.values().next().value;
    return {
      active: currentlySelectedNodeId,
      currentNode:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId],
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  },
  nodesIds: (state: EditorState) => {
    return Object.keys(state.nodes);
  },
  layout: (state: EditorState) => {
    const nodes = state.nodes;

    return Object.keys(nodes).map((child) => {
      return {
        ...nodes[child].data.props.layout,
        i: child,
      } as ReactGridLayout.Layout;
    });
  },
};
export const useEditorStore = createSelectors(useEditorStoreBase);
