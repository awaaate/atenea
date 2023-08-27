"use client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  Link,
  Icon,
} from "@shared/ui";
import { Session, dropdownItemType } from "../../types";

interface UserAccountDropdownProps {
  session: Session;
  onSignOut: () => void;
}

const dropdownItem: dropdownItemType[] = [
  {
    id: 1,
    label: "About",
    Icon: "Info",
    href: "/about",
  },
];

const UserAccountDropdown: FC<UserAccountDropdownProps> = ({
  session,
  onSignOut,
}) => {
  const { user } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none shadow-[0] border-none bg-transparent p-2 py-4 hover:bg-black/20  ">
        <Avatar className="icon-xl bg-pink-500" name={user.name || "User"} />
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
            onSignOut;
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
