import { create } from "zustand"
import { UserComponent } from "../engine/interfaces"


interface Node {
    id: string
    data: {
        type: UserComponent
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
