import type { UserComponent } from "@craftjs/core"
import { create } from "zustand"


interface Node {
    id: string
    data: {
        type: UserComponent<unknown>
        props: any
    }
}

interface DragStore {
    dragNode: Node | null
    setDragNode: (node: Node | null) => void
}

export const useDragStore = create<DragStore>((set) => ({
    dragNode: null,
    setDragNode: (node) => set({ dragNode: node }),
}))
