import Link from "next/link";
import dynamic from "next/dynamic";

import { getSession } from "@/lib/auth/getSession";
import { Button, buttonVariants, cn, Icon } from "@shared/ui";
import { UserAccountDropdown } from "../user-account-dropdown";
import { navItemType } from "@/types/item-types";
import { ThemeToggle } from "../theme-toggle";
import { Session } from "@/lib/auth/getSession";
import Image from "next/image";

const DashboardTopbar = ({ session }: { session: Session }) => {
  const navItems: navItemType[] = [];

  return (
    <div className="z-40 w-full bg-background flex justify-between lg:space-around items-center py-3 border-b px-8 lg:px-16 bg-nav-surface">
      <div className="w-full flex gap-x-8 items-center">
        <div className="relative z-20 flex items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-md tracking-tighter"
            )}
          >
            <Image
              width={50}
              height={50}
              src="/logo.png"
              alt="logo"
              className="icon-l mr-2"
            />
          </Link>
        </div>
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
          <UserAccountDropdown session={session} />
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
