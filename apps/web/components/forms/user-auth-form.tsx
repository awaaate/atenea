"use client";

import * as React from "react";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { cn } from "@shared/ui/src/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    if (session.status === "authenticated") {
      //check if next router is available
      const next = searchParams.get("next");
      if (next) {
        router.push(next);
      } else {
        router.push("/app");
      }
    }
  }, [session]);

  return (
    <div className={cn("grid gap-y-4", className)} {...props}>
      <Button
        onClick={openConnectModal}
        type="button"
        disabled={connectModalOpen}
      >
        {connectModalOpen ? (
          <Spinner size="xs" className="mr-2" />
        ) : (
          <Icon name="Wallet2" className="mr-2 h-4 w-4" />
        )}{" "}
        Connect Wallet
      </Button>
    </div>
  );
}
