"use client";
import { FC } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "@/lib/auth/getSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
} from "@shared/ui";
import { Avatar } from "@shared/ui";
import { dropdownItemType } from "@/types//item-types";

interface UserAccountDropdownProps {
  session: Session;
}

const dropdownItem: dropdownItemType[] = [
  {
    id: 1,
    label: "About",
    Icon: "Info",
    href: "/about",
  },
];

const UserAccountDropdown: FC<UserAccountDropdownProps> = ({ session }) => {
  const { user } = session;
  const AdminItem = dropdownItem.find((item) => item.href === "/admin/users");

  /*  if (user.role === "ADMIN" && !AdminItem) {
    dropdownItem.push({
      id: 2,
      label: "Admin Panel",
      Icon: Icons.admin,
      href: "/admin/users",
    });
  } else if (user.role !== "ADMIN" && AdminItem) {
    dropdownItem.splice(1, 1);
  } */

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none shadow-[0] border-none bg-transparent">
        <Avatar className="" name={user.name || "User"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2 text-sm">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.walletAddress && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.walletAddress}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {dropdownItem.map((item) => (
          <DropdownMenuItem key={item.id} asChild className="cursor-pointer">
            <Link href={item.href}>
              <div className="flex items-center gap-x-2">
                <Icon name={item.Icon} />
                {item.label}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <Icon name={"LogOut"} />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserAccountDropdown };
