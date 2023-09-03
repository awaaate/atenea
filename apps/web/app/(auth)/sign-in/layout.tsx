import dynamic from "next/dynamic";
import React from "react";

const Web3Provider = dynamic(
  () =>
    import("@/components/providers/web3-provider").then((m) => m.Web3Provider),
  {
    ssr: false,
  }
);
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
