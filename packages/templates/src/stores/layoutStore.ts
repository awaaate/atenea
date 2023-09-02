import { persist, } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";


type Board = {
    id: string;
    name: string;
}
interface ILayoutStore {
    workspaceId: string;
    collapsedSidebar: boolean;
    pageTitle: string;
    pageSubTitle: string;
    boards: Board[];
    toggleSidebar: () => void;
    setPageTitle: (pageTitle: string) => void;
    setPageSubTitle: (pageSubTitle: string) => void;
    setBoards: (sidebarItems: Board[]) => void;
}


export const useLayoutStore = createWithEqualityFn<ILayoutStore>()(
    persist((set) => ({
        workspaceId: "",
        collapsedSidebar: false,
        pageTitle: "",
        pageSubTitle: "",
        boards: [{
            id: "1",
            name: "Board 1"
        }],
        toggleSidebar: () => {
            set((state) => ({ collapsedSidebar: !state.collapsedSidebar }))
        },
        setBoards: (boards) => {
            set(() => ({ boards }))
        },
        setPageTitle: (pageTitle: string) => set(() => ({ pageTitle })),
        setPageSubTitle: (pageSubTitle: string) => set(() => ({ pageSubTitle })),
    }), {
        name: "layout-store",
    }), shallow

)

