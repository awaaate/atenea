"use client";
import { trpc } from "@/lib/trpc";
import { useLayoutStore } from "@shared/templates/src/stores/layoutStore";
import { SidebarNav } from "@shared/ui/src/sidebar";

import { Icon } from "@shared/ui/src/icon";
import { NavItem, navItemClasse } from "@shared/ui/src/nav-item";
import { Spinner } from "@shared/ui/src/spinner";
import { cn } from "@shared/ui/src/utils";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/src/popover";
import { Board } from "@shared/db/src/schema";
import { Button } from "@shared/ui/src/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/src/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/src/dialog";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "@shared/ui/src/link";

export const BoardsSidebar = () => {
  const pathName = usePathname();
  const {
    isLoading,
    mutateAsync: createMutatation,
    data,
  } = trpc.boards.create.useMutation();
  const collapsedSidebar = useLayoutStore((state) => state.collapsedSidebar);
  const boards = useLayoutStore((state) => state.boards);
  const setBoards = useLayoutStore((state) => state.setBoards);

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
      .map((item, i) => (
        <button
          className={cn(navItemClasse, "justify-between group")}
          key={item.id}
        >
          <a
            className="flex  flex-1 w-full items-center justify-start "
            href={item.href}
          >
            <Icon name={item.icon} className="mr-2" variant={"button"} />
            {item.children}
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="MoreHorizontal" className="text-text-weakest" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" ">
              <DeleteButton id={item.id} />
              <BoardConfig id={item.id} />
              <DuplicateButton id={item.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
      ));
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
          const board = await createMutatation({
            name: "New Board",
            workspaceId,
          });

          router.push(`/app/${workspaceId}/${board[0].id}`);

          setBoards([...boards, board[0]]);
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
interface BoardButtonsProps {
  id: string;
}
const DeleteButton = ({ id }: BoardButtonsProps) => {
  const { mutateAsync, isLoading } = trpc.boards.delete.useMutation();
  const { workspaceId } = useParams();
  const router = useRouter();
  const setBoards = useLayoutStore((state) => state.setBoards);
  const boards = useLayoutStore((state) => state.boards);
  return (
    <DropdownMenuItem
      onSelect={async () => {
        await mutateAsync({ id });
        setBoards(boards.filter((board) => board.id !== id));
        router.push(`/app/${workspaceId}`);
      }}
    >
      <Icon name="Trash2" className="mr-2" variant={"button"} size="m" />
      <span>{isLoading ? <Spinner size="xxs" /> : "Delete"}</span>
    </DropdownMenuItem>
  );
};

const DuplicateButton = ({ id }: BoardButtonsProps) => {
  const { mutateAsync, isLoading } = trpc.boards.duplicate.useMutation();

  const router = useRouter();
  const { workspaceId } = useParams();
  const setBoards = useLayoutStore((state) => state.setBoards);
  const boards = useLayoutStore((state) => state.boards);
  return (
    <DropdownMenuItem
      onSelect={async () => {
        const newBoard = await mutateAsync({
          id,
        });

        setBoards([...boards, newBoard[0]]);
        router.push(`/app/${workspaceId}/${newBoard[0].id}`);
      }}
    >
      <Icon name="Copy" className="mr-2" variant={"button"} size="m" />
      <span>{isLoading ? <Spinner size="xxs" /> : "Duplicate"}</span>
    </DropdownMenuItem>
  );
};

const BoardConfig = ({ id }) => {
  //create portal for dialog
  const { workspaceId } = useParams();
  const router = useRouter();
  return (
    <>
      <DropdownMenuItem
        onSelect={() => router.push(`/app/${workspaceId}/${id}/config`)}
      >
        <Icon name="Settings" className="mr-2" variant={"button"} size="m" />

        <span>Config</span>
      </DropdownMenuItem>
    </>
  );
};
