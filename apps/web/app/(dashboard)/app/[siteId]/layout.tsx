import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardSidebar, DashboardTopbar } from "@/components/navbar";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { ScrollArea } from "@shared/ui";

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

  /*   if (session.user.role !== "ADMIN") {
    redirect("/");
  } */
  console.log(params.siteId, "siteId root");
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="fixed z-30 h-[calc(100vh)] w-full shrink-0 overflow-y-hidden border-r lg:sticky lg:block">
          <ScrollArea className="">
            <DashboardSidebar siteId={params.siteId} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden h-full">
          <DashboardTopbar session={session} />
          {children}
        </main>
      </div>
    </div>
  );
}
