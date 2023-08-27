import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  NavItemProps,
  SidebarHeader,
} from "@shared/ui";
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

export type SitesList = { id: string; name: string | null }[];

const SidebarSiteSwitcher = ({
  siteId,
  sites,
}: {
  siteId: string;
  sites: SitesList;
}) => {
  const currentSite = sites.find((site) => site.id === siteId)!;

  return (
    <SidebarHeader className="p-0 border-b-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full bg-nav-surface border-none p-6 py-8 hover:bg-nav-hover rounded-none">
          <span className="flex items-center gap-2">
            <Avatar size="sm" name={(currentSite && currentSite.name) || ""} />
            {currentSite && currentSite.name}
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
