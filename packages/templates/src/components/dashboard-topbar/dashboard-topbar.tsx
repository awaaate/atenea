import { buttonVariants, Button } from "@shared/ui/src/button";
import { cn } from "@shared/ui/src/utils";
import { Link } from "@shared/ui/src/link";

import { UserAccountDropdown } from "../user-account-dropdown";

import React from "react";
import { navItemType, Session } from "../../types";
import { SitesList, SiteSwitcher } from "../site-switcher/site-switcher";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

interface DashboardTopbarProps {
  session: Session;
  onSignout: () => void;
  sites: SitesList;
  siteId: string;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  session,
  onSignout,
  sites,
  siteId,
}) => {
  const navItems: navItemType[] = [];

  return (
    <div className="z-40 w-full my-0  bg-accent text-text-on-accent flex justify-between lg:space-around items-center py-2 px-8  relative">
      <div className="w-full flex gap-x-8 items-center">
        <SiteSwitcher
          workspaceId={siteId}
          workspaces={sites}
          setTheme={() => {}}
          onSignout={() => {}}
          theme="dark"
        />{" "}
        <div className="flex items-center gap-x-4">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-sm font-medium"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <ThemeToggle />
        {session ? (
          <UserAccountDropdown session={session} onSignOut={onSignout} />
        ) : (
          <Link href="/sign-in" className=" tracking-tighter">
            <Button className="mx-2 w-full" size="sm">
              Sign In
              <div className="sr-only">Sign In</div>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export { DashboardTopbar };
