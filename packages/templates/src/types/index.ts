export interface Session {
    user: {
        id: string;
        walletAddress: string;
        name?: string;
        avatarUrl?: string;
    }

}
export type theme = "light" | "dark";


import type { IconName } from "@shared/ui";

export type dropdownItemType = {
    id: number;
    label: string;
    Icon: IconName;
    href: string;
};

export type SidebarNavType = {
    id: number;
    href: string;
    label: string;
    Icon: IconName;
};

export type navItemType = {
    id: number;
    label: string;
    href: string;
};

