import { db } from "@/lib/db";
import {
  Avatar,
  DropdownMenu,
  NavItem,
  NavItemProps,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Sidebar,
  SidebarHeader,
  SidebarNav,
} from "@shared/ui";
import { notFound, useParams } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";
import Link from "next/link";

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
const SidebarSiteSwitcher = async ({ siteId }: { siteId: string }) => {
  const session = await getSession();

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      sites: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const sites = user?.sites;

  const currentSite = sites?.find((site) => site.id === siteId);
  if (!currentSite) return null;

  return (
    <SidebarHeader className="p-0 border-b-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full bg-nav-surface border-none p-6 py-8 hover:bg-nav-hover rounded-none">
          <span className="flex items-center gap-2">
            <Avatar size="sm" name={currentSite.name} />
            {currentSite.name}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel>My Sites</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sites.map((site) => (
              <DropdownMenuItem key={site.id} asChild>
                <Link href={`/app/${site.id}`}>{site.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="Settings2" className="mr-2" />
              <Link href={`/app/${currentSite.id}`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="Plus" className="mr-2" />
              Create a Site
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
  );
};

export { SidebarSiteSwitcher };
