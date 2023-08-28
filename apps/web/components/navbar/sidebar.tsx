import { db } from "@/lib/db";
import { NavItemProps, Sidebar } from "@shared/ui";
import { notFound, useParams } from "next/navigation";
import { SidebarBoardNav } from "./sidebar-boards";
import { SidebarSiteSwitcher } from "./sidebar-site-swicther";
import { Suspense } from "react";

const NAV: NavItemProps[] = [
  {
    children: "Home",
    active: true,
    href: "#",
    icon: "Home",
  },
  {
    children: "Notifications",
    active: false,
    href: "#",
    icon: "Bell",
  },
  {
    children: "Boards",
    active: false,
    icon: "Folder",
    subnav: [
      {
        children: "main",
        active: false,
        href: "#",
        icon: "FileText",
      },
      {
        children: "nouns",
        active: false,
        href: "#",
        icon: "FileText",
      },
      {
        children: "my second board",
        active: false,
        href: "#",
        icon: "FileText",
      },
    ],
  },
];
const DashboardSidebar = ({ siteId }: { siteId: string }) => {
  return (
    <Sidebar>
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarSiteSwitcher siteId={siteId} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarBoardNav siteId={siteId} />
      </Suspense>
    </Sidebar>
  );
};

export { DashboardSidebar };
