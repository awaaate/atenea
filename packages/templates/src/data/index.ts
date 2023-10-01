import { NavItemProps } from "@shared/ui/src/nav-item";

export const adminSidebarNavItems: NavItemProps[] = [
  {
    id: "1",
    children: "Home",
    active: true,
    icon: "Home",
    href: "/",
  },
];
const className = "text-2xl font-semibold leading-loose";
export const dialogue = [
  {
    id: 4,
    message:
      "In 2022, the Super Bowl had over 100 million viewers, Nouns was part of this special event with Bud Light ⌐◨-◨",
    character: "Nouns",
  },
  {
    id: 5,
    message:
      'In 2022, Nouns DAO named a species of frog. Its scientific name is "Hyalinobatrachium Nouns", but we like to call it "Nouns Glass Frog" ⌐◨-◨',
    character: "Nouns",
  },
  {
    id: 6,
    message:
      "Nouns secure a slot at The International Dota 2 Championships 2023. This event is one of the biggest gaming events of the year and has over $18 million in prizes ⌐◨-◨",
    character: "Nouns",
  },
  {
    id: 7,
    message:
      "Nouns participated in the 2023 Rose Parade with Stoopid Buddy, attracting 700,000 live spectators and reaching a total of 73.5 million viewers ⌐◨-◨",
    character: "Nouns",
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
  workspaceId: "cll7sfwmp0000fvqa83xdcnsu",
  workspaces: [
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
