import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardSidebar, DashboardTopbar } from "@/components/navbar";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { ScrollArea } from "@shared/ui";
import { WorkspaceLayout } from "@shared/templates";
import { db } from "@/lib/db";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    siteId: string;
    boardId?: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Admin Panel",
  description: "Admins are allowed to access this page and manage the site.",
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const sites = await db.site.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  console.log(params.siteId, "siteId root");
  return (
    <WorkspaceLayout siteId={params.siteId} session={session} sites={sites}>
      {children}
    </WorkspaceLayout>
  );
}
