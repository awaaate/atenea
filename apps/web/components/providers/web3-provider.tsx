"use client";
import dynamic from "next/dynamic";
import { darkTheme } from "@rainbow-me/rainbowkit";

import {
  appInfo,
  chains,
  getSiweMessageOptions,
  wagmiConfig,
} from "@/lib/auth/web3";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig as any}>
      <RainbowKitSiweNextAuthProvider
        getSiweMessageOptions={getSiweMessageOptions}
      >
        <RainbowKitProvider
          chains={chains}
          appInfo={appInfo}
          theme={darkTheme()}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </RainbowKitSiweNextAuthProvider>
    </WagmiConfig>
  );
}
