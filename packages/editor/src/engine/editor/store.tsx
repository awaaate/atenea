//Store of the editor
//the store has saved the state of the editor

import { EditorState } from "../interfaces/editor";
<<<<<<< HEAD
import { Node, NodeId } from "../interfaces/nodes";

import { create } from "zustand";
import { createSelectors } from "./store-selectors";
import ReactGridLayout from "react-grid-layout";

const DROPPING_ELEMENT_ID = "__dropping-elem__";
=======
import { NodeId } from "../interfaces/nodes";

import { create } from "zustand";
import { createSelectors } from "./store-selectors";
>>>>>>> ebc5858 (performance)

const useEditorStoreBase = create<EditorState>((set, get) => ({
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
  actions: {
<<<<<<< HEAD
    setProp: (id, cb) => {
=======
    setProp: (id: NodeId, cb) => {
>>>>>>> ebc5858 (performance)
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
<<<<<<< HEAD
    select: (id, value: boolean = true) => {
      set((state) => {
        const currentNode = state.nodes[id];
        currentNode.events.selected = value;

        const selected = new Set(state.events.selected);
        if (!value) {
          selected.delete(id);
        } else {
          selected.add(id);
        }

        return {
          nodes: {
            ...state.nodes,
            [id]: currentNode,
          },
=======
    select: (id: NodeId) => {
      set((state) => {
        const selected = new Set(state.events.selected);
        selected.add(id);

        return {
>>>>>>> ebc5858 (performance)
          events: {
            ...state.events,
            selected,
          },
        };
      });
    },
<<<<<<< HEAD
    hover: (id, value: boolean = true) => {
      set((state) => {
        const currentNode = state.nodes[id];
        currentNode.events.hovered = value;

        const hovered = new Set(state.events.hovered);
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
=======
    hover: (id: NodeId) => {
      set((state) => {
        const hovered = new Set(state.events.hovered);
        hovered.add(id);

        return {
>>>>>>> ebc5858 (performance)
          events: {
            ...state.events,
            hovered,
          },
        };
      });
    },
<<<<<<< HEAD
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
  },

  setLayout: (layout: ReactGridLayout.Layout[]) => {
    //set the layout for each child
    const nodes = layout
      .filter((l) => l.i !== DROPPING_ELEMENT_ID)
      .map((layoutItem) => {
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
}));
export const selectors = {
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
=======
    drag: (id: NodeId) => {},
  },
}));

>>>>>>> ebc5858 (performance)
export const useEditorStore = createSelectors(useEditorStoreBase);
