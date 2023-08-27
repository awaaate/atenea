import { NavItemProps } from "@shared/ui";

export const adminSidebarNavItems: NavItemProps[] = [
    {
        id: "1",
        children: "Home",
        active: true,
        icon: "Home",
        href: "/",
    },
];

export const dialogue = [
    {
        id: 1,
        message:
            "I Don’t Want To Conquer Anything. I Just Think The Guy With The Most Freedom In The Entire Ocean Is The Pirate King.",
        character: "Monkey D. Luffy",
    },
    {
        id: 2,
        message:
            "If You Hurt Somebody… Or If Somebody Hurts You, The Blood That Flows Is Still Red.",
        character: "Monkey D. Luffy",
    },
    {
        id: 3,
        message:
            "The world isn’t perfect. But it’s there for us, doing the best it can… that’s what makes it so damn beautiful.",
        character: "Roy Mustang",
    },
];


export const mockPageData = {
    session: {
        user: {
            id: "cll7sfwmp0000fvqa83xdcnsu",
            name: "John Doe",
            walletAddress: "0x1234567890",
            avatarUrl: "https://avatars.githubusercontent.com/u/263385",
        },
    },
    siteId: "cll7sfwmp0000fvqa83xdcnsu",
    sites: [
        {
            id: "cll7sfwmp0000fvqa83xdcnsu",
            name: "Workspace from the future",
        },
        {
            id: "cll7sfwmp0000fvqa83xdcns1u",
            name: "My thoughts",
        },
        {
            id: "cll7sfwmp0000fvqa283xdcnsu",
            name: "My first board",
        },
    ],
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
};