import { Meta } from "@storybook/react";
import { SidebarBoardsNav } from "./sidebar-boards-nav";


export default {
    title: "Dashboard/Sideboard Boards Nav",
    component: SidebarBoardsNav,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"]
    
} satisfies Meta<typeof SidebarBoardsNav>;


export const Default = {
    args: {
        boards: [
            {
                id: "cll7sfwmp0000fvqa83xdcnsu",
                name: "Board 1 ",
            },
            {
                id: "cll7sfwmp0000fvqa83xdcns1u",
                name: "Board 2 ",
            },
            {
                id: "cll7sfwmp0000fvqa283xdcnsu",
                name: "Board 3",
            },
        ],
        siteId: "cll7sfwmp0000fvqa83xdcnsu",
    },
}