import React from "react";
import { SitesList } from "../../components/site-switcher/site-switcher";

import { DashboardTopbar } from "../../components/dashboard-topbar/dashboard-topbar";
import type { Session } from "../../types";

interface DashboardLayout {
  children: React.ReactNode;
  sites: SitesList;
  siteId: string;
  session: Session;
  onSignout: () => void;
}

const WorkspaceLayout: React.FC<DashboardLayout> = ({
  children,
  sites,
  siteId,
  session,
  onSignout,
}) => {
  return (
    <main className="flex flex-1 w-full flex-col ">
      <DashboardTopbar
        session={session}
        onSignout={onSignout}
        siteId={siteId}
        sites={sites}
      />
      {children}
    </main>
  );
};

export { WorkspaceLayout };
