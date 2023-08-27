import { create } from "zustand";




interface GlobalStore {
    title: string;
    coverImage: string;
    background: string;
    sidebarTab: "widget" | "page" | null;
    sidebarOpen: boolean;
    setTitle: (title: string) => void;
    setSidebar: (sidebarTab: "widget" | "page" | null) => void;
    setCoverImage: (coverImage: string) => void;
    setSidebarOpen: (sidebarOpen: boolean) => void;
    toggleSidebarOpen: () => void;
    setBackground: (background: string) => void;

}

export const useGlobalStore = create<GlobalStore>()((set) => ({
    sidebarOpen: false,
    title: "https://attachments.clickup.com/gallery/gradients/Abstract-Gradient-1.png",
    coverImage: "",
    background: "",
    sidebarTab: null,
    setSidebar: (sidebarTab: "widget" | "page" | null) => set({ sidebarTab }),
    setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
    toggleSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setTitle: (title: string) => set({ title }),
    setCoverImage: (coverImage: string) => set({ coverImage }),
    setBackground: (background: string) => set({ background }),

}));


