"use client";
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
  Link,
  SidebarHeader,
} from "@shared/ui";
import React, { useEffect, useState } from "react";
export type SitesList = { id: string; name: string | null }[];

const SiteSwitcher = ({
  siteId,
  sites,
}: {
  siteId: string;
  sites: SitesList;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentSite = sites.find((site) => site.id === siteId)!;

  return (
    <SidebarHeader className="p-0 border-b-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full bg-accent text-text-on-accent shadow-none  border-0  hover:bg-black/20 rounded-none">
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
            <DropdownMenuItem asChild>
              <Link href={`/create`}>
                <Icon name="Plus" className="mr-2" />
                Create a Site
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
  );
};
export { SiteSwitcher };
