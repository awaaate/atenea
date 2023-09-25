//Store of the editor
//the store has saved the state of the editor

import { EditorState } from "../interfaces/editor";
import { NodeId } from "../interfaces/nodes";

import { createJSONStorage, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { createSelectors } from "./store-selectors";

import { debouncedSave, deserialize, serialize } from "./utils";

const useEditorStoreBase = createWithEqualityFn<EditorState>()(
  persist(
    (set, get) => ({
      editable: false,
      coverImageEnabled: false,
      lastDatabaseSync: new Date().toString(),
      boardId: "",
      nodes: {},
      pageBackground: "",
      sidebar: null,
      title: "",
      coverImage: "/images/board-covers/Abstract-Gradient-1.png",
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
      setCoverImage(coverImage) {
        console.log("setCoverImage", coverImage);
        set({ coverImage });
      },

      setPageBackground: (background) => {
        set({ pageBackground: background });
      },
      setSidebar(sidebar) {
        set({ sidebar });
      },
      setTitle(title) {
        set({ title });
      },
      unSelectAll() {
        set((state) => {
          const selected = new Set<string>();
          Object.keys(state.nodes).forEach((id) => {
            const currentNode = state.nodes[id];
            currentNode.events.selected = false;
          });

          return {
            nodes: state.nodes,
            events: {
              ...state.events,
              selected,
            },
          };
        });
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
          if (!get().editable) return state;
          state.events.selected.forEach((selectedId) => {
            const currentNode = state.nodes[selectedId];

            if (currentNode) currentNode.events.selected = false;
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
          if (!get().editable) return state;
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
      merge(prev) {
        set((currentState) => {
          console.log("merge", prev, currentState);
          return deserialize(prev as EditorState, currentState as EditorState);
        });
      },
    }),
    {
      name: "editor", // unique name
      partialize: serialize,
      merge: (prev, curr) => deserialize(prev as EditorState, curr),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
      storage: createJSONStorage(() => sessionStorage),
    }
  ),
  shallow
);
export const selectors = {
  toolbar: (state: EditorState) => {
    const currentlySelectedNodeId = Array.from(state.events.selected)[0];
    return {
      active: currentlySelectedNodeId,
      currentNode:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId],
      related:
        currentlySelectedNodeId &&
        state.nodes[currentlySelectedNodeId]?.related,
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

export const saveEditorState = () => {
  const state = useEditorStore.getState();

  return serialize(state);
};

export const loadEditorState = (prevState: Partial<EditorState>) => {
  useEditorStore.setState((current) => ({
    ...deserialize(prevState as EditorState, current),
  }));
};
