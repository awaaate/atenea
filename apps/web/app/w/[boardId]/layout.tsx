import { Metadata, ResolvingMetadata } from "next";

import { env } from "@/env.mjs";
import { createCaller } from "@/lib/trpc/createCaller";

interface BoardLayoutProps {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

export async function generateMetadata(
  { params }: BoardLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const caller = createCaller();

  const board = await caller.boards.get({
    id: params.boardId,
  });

  return {
    title: board.name,
    description: board.description,
    openGraph: {
      images: [
        {
          url: board.coverImage,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function BoardView({
  children,
  params,
}: BoardLayoutProps) {
  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  /*   const caller = //createCaller();
  const { boards, workspaceId } = await caller.boards.getSiblingBoards({
    id: params.boardId,
  });

  if (!workspaceId) notFound(); */

  return <div>{children}</div>;
}
