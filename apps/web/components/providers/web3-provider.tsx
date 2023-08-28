"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { WagmiConfig } from "wagmi";

import {
  appInfo,
  chains,
  getSiweMessageOptions,
  wagmiConfig,
} from "@/lib/auth/web3";

import "@rainbow-me/rainbowkit/styles.css";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
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
