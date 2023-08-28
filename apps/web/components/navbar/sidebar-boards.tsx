import { db } from "@/lib/db";
import { NavItem, NavItemProps, SidebarNav, Icon, Button } from "@shared/ui";
import { notFound, useParams } from "next/navigation";
import { SidebarSiteSwitcher } from "./sidebar-site-swicther";

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
const SidebarBoardNav = async ({ siteId }: { siteId: string }) => {
  const site = await db.site.findFirst({
    where: {
      id: siteId,
    },
    select: {
      boards: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (!site) return null;

  return (
    <SidebarNav className="h-full">
      {[
        ...NAV,
        {
          children: (
            <Button variant="ghost" size="sm">
              <span className="text-sm font-semibold text-text-weaker">
                Boards
              </span>
              <Icon name="Plus" className="ml-2" />
            </Button>
          ),
          icon: "Folder",
          active: false,
          subnav: site.boards.map((board) => ({
            children: board.name,
            icon: "FileText" as const,
            active: false,
            href: `/app/${siteId}/${board.id}`,
            id: board.id,
          })),
        },
      ].map((item) => (
        <NavItem {...item} key={item.id} />
      ))}
    </SidebarNav>
  );
};

export { SidebarBoardNav };
