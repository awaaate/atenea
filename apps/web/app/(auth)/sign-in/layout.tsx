import { Web3Provider } from "@/components/providers/web3-provider";
import React from "react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
