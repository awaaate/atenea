import { NavItem, NavItemProps, SidebarNav } from "@shared/ui";

const NAV: NavItemProps[] = [
  {
    children: "Home",
    active: false,
    href: "#",
    icon: "Home",
    id: "home",
  },
  {
    children: "Notifications",
    active: false,
    href: "#",
    icon: "Bell",
    id: "notifications",
  },
];

export type BoardsList = { id: string; name: string | null }[];

const SidebarBoardsNav = ({ siteId }: { siteId: string }) => {
  return (
    <SidebarNav className="h-full">
      {[
        ...NAV,
        {
          children: "Boards",
          icon: "Folder" as const,
          active: false,
          id: "boards",
          href: `/sites/${siteId}/boards`,
        },
      ].map((item) => (
        <NavItem {...item} key={item.id} />
      ))}
    </SidebarNav>
  );
};

export { SidebarBoardsNav };
