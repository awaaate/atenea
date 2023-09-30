import { create } from "zustand";
import { WidgetComponent } from "../engine/interfaces";

interface Node {
  id: string;
  data: {
    type: WidgetComponent;
    props: any;
  };
}

interface DragStore {
  dragNode: string | null;
  setDragNode: (node: string | null) => void;
}

export const useDragStore = create<DragStore>((set) => ({
  dragNode: null,
  setDragNode: (node) => set({ dragNode: node }),
}));
