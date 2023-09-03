"use client";

import * as React from "react";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Spinner } from "@shared/ui/src/spinner";
import { cn } from "@shared/ui/src/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type LoadingState = "google" | "github";

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { connectModalOpen, openConnectModal } = useConnectModal();

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
