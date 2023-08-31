"use client";
import { Session } from "@/lib/auth/getSession";
import { WorkspaceLayout } from "@shared/templates";
import { signOut } from "next-auth/react";

export default function WorkspaceLayoutWrapper({
  ...props
}: Omit<React.ComponentProps<typeof WorkspaceLayout>, "onSignout">) {
  return <WorkspaceLayout {...props} onSignout={signOut} />;
}
