import { getSession } from "@/lib/auth/getSession";
import { db } from "@/lib/db";

import { SidebarSiteSwitcher } from "./sidebar-site-swicther";

const SidebarSiteSwitcherSC = async ({ siteId }: { siteId: string }) => {
  const session = await getSession();

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      sites: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const sites = user?.sites;

  const currentSite = sites?.find((site) => site.id === siteId);
  if (!currentSite) return null;

  return <SidebarSiteSwitcher sites={sites || []} siteId={siteId} />;
};

export { SidebarSiteSwitcherSC };
