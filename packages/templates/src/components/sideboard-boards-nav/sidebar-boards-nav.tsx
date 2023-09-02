import { NavItem, NavItemProps, SidebarNav } from "@shared/ui";
import { useLayoutStore } from "../../stores/layoutStore";
import { useMemo } from "react";

const NAV: NavItemProps[] = [
  {
    children: "Home",
    active: false,
    href: "#",
    icon: "Home",
    id: "home",
  },
];

export type BoardsList = { id: string; name: string | null }[];

const SidebarBoardsNav = ({ siteId }: { siteId: string }) => {
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);

  const navItems = useMemo(() => {
    return NAV.map((item) => ({
      ...item,
      active: false,
      href: `/sites/${siteId}/${item.id}`,
      children: collapsedSidebar ? "" : item.children,
    })).map((item, i) => <NavItem {...item} key={item.id} active={i === 0} />);
  }, [siteId, collapsedSidebar]);

  return <SidebarNav className="flex-1">{navItems}</SidebarNav>;
};

export { SidebarBoardsNav };
