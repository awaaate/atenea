"use client";
import { trpc } from "@/lib/trpc";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import { SidebarNav } from "@shared/ui/src/sidebar";

import { Icon } from "@shared/ui/src/icon";
import { NavItem, navItemClasse } from "@shared/ui/src/nav-item";
import { Spinner } from "@shared/ui/src/spinner";
import { cn } from "@shared/ui/src/utils";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const BoardsSidebar = () => {
  const pathName = usePathname();
  const { isLoading, mutateAsync, data } = trpc.boards.create.useMutation();
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const boards = useLayoutStore((state) => state.boards);

  const workspaceId = useLayoutStore((state) => state.workspaceId);

  const router = useRouter();

  const boardsNavs = useMemo(() => {
    return boards
      .map((board) => ({
        active: pathName === `/app/${workspaceId}/${board.id}`,
        href: `/app/${workspaceId}/${board.id}`,
        children: collapsedSidebar ? "" : board.name,
        icon: "Layout" as const,
        id: board.id,
      }))
      .map((item, i) => <NavItem {...item} key={item.id} />);
  }, [workspaceId, collapsedSidebar, pathName, boards]);

  return (
    <SidebarNav className="flex-1">
      <NavItem
        active={pathName === `/app/${workspaceId}`}
        href={`/app/${workspaceId}`}
        icon="Home"
        id="home"
      >
        {collapsedSidebar ? "" : "Home"}
      </NavItem>
      {boardsNavs}
      <button
        className={cn(navItemClasse, "justify-start inline-flex")}
        onClick={async () => {
          const board = await mutateAsync({
            name: "New Board",
            workspaceId,
          });

          router.push(`/app/${workspaceId}/${board[0].id}`);
        }}
      >
        {isLoading ? (
          <Spinner size="xxs" />
        ) : (
          <Icon name={"Plus"} className="mr-2" variant={"button"} size="s" />
        )}
        {!collapsedSidebar && "Create Board"}
      </button>
    </SidebarNav>
  );
};
